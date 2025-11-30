import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: 'Quiz Blitz',
  description: 'Interactive quiz application with multiple modes and achievements',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppProvider>
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
