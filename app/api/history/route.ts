import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { role, content, chatId } = body as { role: Role; content: string; chatId?: string };
  let currentChatId = chatId;

  if (!currentChatId) {
    const newChat = await db.chat.create({
      data: {},
    });
    currentChatId = newChat.id;
    revalidatePath('/');
    revalidatePath('/chat/:chatId');
    revalidatePath('/chat/new');
  }

  await db.message.create({
    data: {
      role,
      content,
      chatId: currentChatId,
    },
  });

  return NextResponse.json({ success: true, chatId: currentChatId });
}

export const GET = async () => {
  const chatlist = await db.chat.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });

  return NextResponse.json(chatlist);
};
