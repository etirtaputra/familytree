import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Family Tree Tracker',
  description: 'Track your family history, relationships, and locations. Share your family tree virally.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
