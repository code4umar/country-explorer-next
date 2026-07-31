import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Country Explorer',
  description: 'Week 5 — Next.js App Router edition',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        <header className="border-b border-neutral-800 px-4 py-4">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <Link href="/" className="text-sm font-semibold text-teal-400">
              Country Explorer
            </Link>
            <nav className="text-xs text-neutral-400">
              <Link href="/" className="hover:text-neutral-100">
                All Countries
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}