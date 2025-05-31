import Link from 'next/link';

function HomePage() {
  return (
    <Link href="/chat/new">
      <button className={`bg-slate-300 px-4 py-2 rounded-lg`} type="button">
        New Chat
      </button>
    </Link>
  );
}

export default HomePage;
