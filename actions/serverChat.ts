'use server';
import { db } from '@/lib/db';

export const getChat = async (id: string) => {
  const chat = await db.chat.findUnique({
    where: { id },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
        select: { role: true, content: true },
      },
    },
  });

  return chat;
};
