import { db } from '@/db';
import { bookTable, questionTable } from '@/db/schema';
import { NextResponse, type NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  try {
    const questions = await db.select().from(questionTable);
    const randomIndex = Math.floor(Math.random() * questions.length);
    const item = questions[randomIndex];
    return NextResponse.json(item);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}