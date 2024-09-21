"use client"

// import * as Sentry from '@sentry/nextjs';
import React from "react"
import { useTranslations } from "next-intl"
import {
  AlertTriangle,
  FileQuestion,
  Home,
  RefreshCcw,
  ServerCrash,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import logger from "@/lib/logger"

const ErrorLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
    <Card className="w-full max-w-md">
      <CardContent className="space-y-8 pt-6">{children}</CardContent>
    </Card>
  </div>
)

const ErrorTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-center text-3xl font-bold">{children}</h1>
)

const ErrorDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-muted-foreground">{children}</p>
)

const ErrorIcon = ({ Icon }: { Icon: React.ElementType }) => (
  <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-secondary">
    <Icon className="size-10 text-secondary-foreground" />
  </div>
)

const ActionButtons = ({ reset }: { reset?: () => void }) => {
  const t = useTranslations("common.action")

  return (
    <div className="flex flex-col space-y-4">
      {reset && (
        <Button onClick={reset} className="w-full">
          <RefreshCcw className="mr-2 size-4" />
          {t("tryAgain")}
        </Button>
      )}
      <Button
        onClick={() => (window.location.href = "/")}
        variant="outline"
        className="w-full"
      >
        <Home className="mr-2 size-4" />
        {t("goHome")}
      </Button>
    </div>
  )
}

const ErrorBoundary = ({
  error,
  reset,
  statusCode,
}: {
  error: Error & { digest?: string }
  reset?: () => void
  statusCode?: number
}) => {
  const t = useTranslations("common.error")

  React.useEffect(() => {
    // Log the error using our custom logger
    logger.error("Error caught by ErrorBoundary", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      statusCode,
    })

    // Uncomment when Sentry is set up
    // import('@sentry/nextjs').then(Sentry => {
    //   Sentry.captureException(error);
    // });
  }, [error, statusCode])

  let Icon = AlertTriangle
  let title = t("defaultTitle")
  let description = t("defaultDescription")

  if (statusCode === 404) {
    Icon = FileQuestion
    title = t("notFound.title")
    description = t("notFound.description")
  } else if (statusCode === 500) {
    Icon = ServerCrash
    title = t("server.title")
    description = t("server.description")
  }

  return (
    <ErrorLayout>
      <ErrorIcon Icon={Icon} />
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorDescription>{description}</ErrorDescription>
      {error.digest && (
        <p className="text-center text-sm text-muted-foreground">
          {t("id", { id: error.digest })}
        </p>
      )}
      <ActionButtons reset={reset} />
    </ErrorLayout>
  )
}

export const NotFound = () => (
  <ErrorBoundary error={new Error("Not Found")} statusCode={404} />
)

export const InternalServerError = () => (
  <ErrorBoundary error={new Error("Internal Server Error")} statusCode={500} />
)

export default ErrorBoundary
