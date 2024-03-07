import { useState } from "react";

import { useRouter } from "next/navigation";

import type { SelectBook } from "@/lib/types/db";

export default function useChat() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getBook = async ({ answer }: { answer: string }) => {
    // Return early if already loading
    if (loading) return;
    setLoading(true);

    try {
      // Fetch book data from the API
      // const searchResponse = await fetch(
      //   `${publicEnv.NEXT_PUBLIC_MODEL_BASE_URL}/indexes/picbook/docs?api-version=2020-06-30&search=${answer}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "api-key": publicEnv.NEXT_PUBLIC_MODEL_API_KEY,
      //     },
      //   },
      // );
      // if (!searchResponse.ok) {
      //   throw new Error(`API responded with status: ${searchResponse.status}`);
      // }
      // const searchData = await searchResponse.json();

      // Fetch detailed book information
      // const bookResponse = await fetch(`/api/book/${searchData.value[0].id}`);
      // if (!bookResponse.ok) {
      //   throw new Error(
      //     `Book details API responded with status: ${bookResponse.status}`,
      //   );
      // }
      console.log(answer);
      const res = await fetch(
        `/api/question/${(new Date().getSeconds() % 30) + 1}`,
      );

      const bookData: SelectBook = await res.json();
      return bookData;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const postMessage = async ({
    content,
    sender,
    questionId,
    bookId,
  }: {
    content: string;
    sender: "system" | "user";
    questionId: number | null;
    bookId: number | null;
  }) => {
    if (loading) return;

    setLoading(true);

    const res = await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({ content, sender, questionId, bookId }),
    });

    if (!res.ok) {
      return;
    }

    router.refresh();
    setLoading(false);
  };

  const handlePostAnswer = async ({ answer }: { answer: string }) => {
    if (loading) return;

    setLoading(true);

    await postMessage({
      content: answer,
      sender: "user",
      questionId: null,
      bookId: null,
    });

    setLoading(false);
  };

  const handleGetQuestion = async () => {
    if (loading) return;

    setLoading(true);

    const res = await fetch(
      `/api/question/${(new Date().getSeconds() % 30) + 1}`,
    );

    if (!res.ok) {
      return;
    }

    const body: { question: string; id: number } = await res.json();

    await postMessage({
      content: body.question,
      sender: "system",
      questionId: body.id,
      bookId: null,
    });

    setLoading(false);

    return body;
  };

  const handleGreet = async () => {
    await postMessage({
      content: "Greeting!",
      sender: "system",
      questionId: null,
      bookId: null,
    });
  };

  const handleGetResult = async ({ answerList }: { answerList: string[] }) => {
    const book_ = await getBook({ answer: answerList.join(" ") });
    if (book_) {
      await postMessage({
        content: "Recommendation",
        sender: "system",
        questionId: null,
        bookId: book_.id,
      });
    }
  };

  return {
    handlePostAnswer,
    handleGetQuestion,
    handleGetResult,
    handleGreet,
    loading,
  };
}
