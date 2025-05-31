import { Role } from '@prisma/client';

export const addMessage = async (role: Role, content: string, chatId: string | null) => {
  const response = await fetch('/api/history', {
    method: 'POST',
    body: JSON.stringify({
      role,
      content,
      chatId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
};
