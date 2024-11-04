import { useTranslations } from "next-intl"

import { Alert, AlertDescription } from "@/components/ui/alert"

interface SubmitMessageProps {
  status?: "destructive" | "success"
  message?: keyof IntlMessages["apiErrors"] | keyof IntlMessages["apiSuccess"]
}

export const SubmitMessage = ({ status, message }: SubmitMessageProps) => {
  const tError = useTranslations("apiErrors")
  const tSuccess = useTranslations("apiSuccess")

  if (!message) return null

  return (
    <Alert variant={status} className="text-center">
      <AlertDescription>
        {status === "destructive"
          ? tError(message as keyof IntlMessages["apiErrors"])
          : tSuccess(message as keyof IntlMessages["apiSuccess"])}
      </AlertDescription>
    </Alert>
  )
}
