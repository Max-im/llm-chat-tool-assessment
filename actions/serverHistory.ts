'use server';

import { db } from "@/lib/db";

export async function getHistory() {
  return await db.chat.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });
}
