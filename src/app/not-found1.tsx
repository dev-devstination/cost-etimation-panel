'use client';

import { NotFound } from '@/components/ErrorBoundary';

import { inter } from '@/fonts/inter';
import { cn } from '@/lib/utils';

export default function NotFoundPage() {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <NotFound />
      </body>
    </html>
  );
}
