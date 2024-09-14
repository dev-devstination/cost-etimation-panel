import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean
  children: React.ReactNode
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button
      type="submit"
      className="w-full bg-primary text-primary-foreground transition-all hover:bg-primary/90"
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
      {children}
    </Button>
  )
}
