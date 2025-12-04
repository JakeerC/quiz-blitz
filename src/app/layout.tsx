import type {Metadata} from 'next';
import './globals.css';
import {AppProvider} from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'Quiz Blitz',
  description:
    'Interactive quiz application with multiple modes and achievements',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
