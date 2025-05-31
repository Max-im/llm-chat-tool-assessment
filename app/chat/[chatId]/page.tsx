import { getChat } from '@/actions/serverChat';
import Chat from '@/components/chat';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{
    chatId: string;
  }>;
}

async function ChatPage({ params }: Props) {
  const { chatId } = await params;
  const chatItem = await getChat(chatId);

  if (!chatItem) {
    redirect('/chat/new');
  }
  return <Chat item={chatItem} />;
}

export default ChatPage;
