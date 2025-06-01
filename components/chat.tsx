'use client';

import { useEffect, useRef, useState } from 'react';
import { useAIChatStream } from 'next-ai-stream/client';
import { Role } from '@prisma/client';
import type { Chat } from '@prisma/client';
import { addMessage } from '@/actions/history';

type ChatWithMessages = Chat & {
  messages: {
    role: Role;
    content: string;
  }[];
};

const Chat = ({ item }: { item?: ChatWithMessages }) => {
  const lastSavedAssistantMessageRef = useRef<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [chatId, setChatId] = useState<string | null>(item?.id || null);
  const [hasSentMessage, setHasSentMessage] = useState(false);

  const initialMessages: { role: string; content: string }[] =
    item?.messages.map((m) => ({
      role: m.role === Role.USER ? 'user' : 'assistant',
      content: m.content,
    })) || [];

  const { messages, submitNewMessage, loading } = useAIChatStream({
    apiEndpoint: '/api/chat',
    systemPrompt: `You are a helpful AI assistant. Be very succinct in your responses because I don't want drop all my cash on tokens.`,
  });

  const saveAnswer = async (message: { role: 'assistant' | 'user'; content: string }) => {
    if (message?.role === 'assistant' && lastSavedAssistantMessageRef.current !== message.content) {
      await addMessage(Role.ASSISTANT, message.content as string, chatId);
      lastSavedAssistantMessageRef.current = message.content;
    }
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    saveAnswer(lastMessage);
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText || loading) return;

    const data = await addMessage(Role.USER, inputText, chatId);

    if (!chatId) {
      setChatId(data.chatId);
    }

    setHasSentMessage(true);
    submitNewMessage(inputText);
    setInputText('');
  };

  const displayMessages = hasSentMessage ? messages : [...initialMessages, ...messages];

  return (
    <>
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        {displayMessages.map((message, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-xl max-w-[70%] ${
              message.role === 'user'
                ? 'bg-slate-300 text-black ml-auto'
                : 'bg-slate-800 text-white mr-auto'
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 w-full bg-slate-400 backdrop-blur-sm py-6">
        <form onSubmit={handleSubmit} className="flex items-center justify-center gap-4">
          <input
            className="rounded-lg px-4 py-2 bg-slate-600 text-white w-[500px]"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            className={`bg-slate-300 px-4 py-2 rounded-lg ${loading ? 'opacity-50' : ''}`}
            type="submit"
            disabled={loading}
          >
            Chat
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
