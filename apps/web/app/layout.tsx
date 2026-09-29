import type { Metadata } from 'next';
import { ProductShell } from './components/product-shell';
import './globals.css';

export const metadata: Metadata = {
  title: 'Comment Growth AI',
  description: 'AI-powered comment intelligence platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><ProductShell>{children}</ProductShell></body>
    </html>
  );
}
