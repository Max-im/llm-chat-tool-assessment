import { getHistory } from '@/actions/serverHistory';
import Link from 'next/link';

export default async function ChatList() {
  const chats = await getHistory();
  
  return (
    <ul className="space-y-2">
      {chats.map((chat) => (
        <Link key={chat.id} href={`/chat/${chat.id}`}>
          <li className="cursor-pointer hover:bg-slate-200 px-4 py-2 rounded-lg">
            {new Date(chat.createdAt).toLocaleString()}
          </li>
        </Link>
      ))}
    </ul>
  );
}
