import { useParams } from "next/navigation";
import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { messageTable } from "@/db/schema";

export async function GET() {
  const { userId } = useParams();

  if (!userId) {
    return NextResponse.json(
      { error: "user id cannot be null" },
      { status: 404 },
    );
  }

  try {
    const messages = await db
      .select()
      .from(messageTable)
      .where(eq(messageTable.userId, parseInt(userId as string)));
    return NextResponse.json(messages);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}