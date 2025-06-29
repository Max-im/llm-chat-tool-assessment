import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Aside from '@/components/aside';
import ChatList from '@/components/chatList';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LLM Chat Tool',
  description: 'This is a minimal full-stack chat application built with **Next.js App Router**, **TailwindCSS**. It supports streaming LLM responses.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col items-center p-8 pb-36">
          <Aside>
            <ChatList />
          </Aside>
          {children}
        </div>
      </body>
    </html>
  );
}
