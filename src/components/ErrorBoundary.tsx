'use client';

// import * as Sentry from '@sentry/nextjs';

import {
  AlertTriangle,
  FileQuestion,
  Home,
  RefreshCcw,
  ServerCrash,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ErrorLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
    <Card className="w-full max-w-md">
      <CardContent className="pt-6 space-y-8">{children}</CardContent>
    </Card>
  </div>
);

const ErrorTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-3xl font-bold text-center">{children}</h1>
);

const ErrorDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-muted-foreground">{children}</p>
);

const ErrorIcon = ({ Icon }: { Icon: React.ElementType }) => (
  <div className="mx-auto w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
    <Icon className="h-10 w-10 text-secondary-foreground" />
  </div>
);

const ActionButtons = ({ reset }: { reset?: () => void }) => (
  <div className="flex flex-col space-y-4">
    {reset && (
      <Button onClick={reset} className="w-full">
        <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
      </Button>
    )}
    <Button
      onClick={() => (window.location.href = '/')}
      variant="outline"
      className="w-full"
    >
      <Home className="mr-2 h-4 w-4" /> Go Home
    </Button>
  </div>
);

const ErrorBoundary = ({
  error,
  reset,
  statusCode,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
  statusCode?: number;
}) => {
  // React.useEffect(() => {
  //   Sentry.captureException(error);
  // }, [error]);

  let Icon = AlertTriangle;
  let title = 'Oops! Something went wrong';
  let description =
    "We've encountered an unexpected error. Our team has been notified.";

  if (statusCode === 404) {
    Icon = FileQuestion;
    title = 'Page Not Found';
    description =
      "The page you're looking for doesn't exist or has been moved.";
  } else if (statusCode === 500) {
    Icon = ServerCrash;
    title = 'Server Error';
    description =
      "We're experiencing some server issues. Please try again later.";
  }

  return (
    <ErrorLayout>
      <ErrorIcon Icon={Icon} />
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorDescription>{description}</ErrorDescription>
      {error.digest && (
        <p className="text-center text-sm text-muted-foreground">
          Error ID: {error.digest}
        </p>
      )}
      <ActionButtons reset={reset} />
    </ErrorLayout>
  );
};

export const RootError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => <ErrorBoundary error={error} reset={reset} />;

export const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <html>
    <body>
      <ErrorBoundary error={error} reset={reset} />
    </body>
  </html>
);

export const NotFound = () => (
  <ErrorBoundary error={{} as Error} statusCode={404} />
);

export const InternalServerError = () => (
  <ErrorBoundary error={{} as Error} statusCode={500} />
);

export default ErrorBoundary;
