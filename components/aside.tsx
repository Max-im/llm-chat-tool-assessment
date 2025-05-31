'use client';

import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { CiViewList } from 'react-icons/ci';
import Link from 'next/link';

export default function Aside({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggleHistory = (val: boolean) => () => {
    setOpen(val);
  };

  return (
    <>
      <Drawer open={open} onClose={toggleHistory(false)}>
        <div className="py-4 px-8">
          <h2 className="text-2xl font-bold mb-4">Chat History</h2>
          {children}
          <Link href="/chat/new">
            <button className={`bg-slate-300 px-4 py-2 rounded-lg`} type="button">
              New Chat
            </button>
          </Link>
        </div>
      </Drawer>
      <button
        className={`bg-slate-300 px-4 py-2 rounded-lg mr-auto`}
        type="button"
        onClick={toggleHistory(true)}
      >
        <CiViewList />
      </button>
    </>
  );
}
