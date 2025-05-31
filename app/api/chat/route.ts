import { createAIChatStreamRouteHandlers } from 'next-ai-stream/server';
import client from '@/ai';

export const dynamic = "force-dynamic";

export const { GET, POST } = createAIChatStreamRouteHandlers({
  client,
  model: 'gpt-3.5-turbo',
});