"use client"

import { useTransition } from "react"
import { useTranslations } from "next-intl"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserIcon } from "lucide-react"

import { SubmitButton } from "@/components/submit-button"
import {
  AccountFormData,
  useAccountSchema,
} from "@/features/users/schemas/account"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField } from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/form/input"
import { SubmitMessage } from "@/components/form/submit-message"
import { User } from "@/features/users/interfaces/user"
import { accountAction } from "@/features/users/actions/account"

interface AccountFormProps {
  user: User
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const AccountForm: React.FC<AccountFormProps> = ({ user }) => {
  const t = useTranslations("AccountPage.form")

  const accountSchema = useAccountSchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(accountAction, initialState)

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      sur_name: user.sur_name,
      email: user.email,
      position: user.position,
      mobile: user.mobile,
    },
  })

  const onSubmit = (data: AccountFormData) => {
    startTransition(() => {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      )

      formAction(data)
    })
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Avatar className="size-32">
                <AvatarImage alt="" src={form.watch("image")} />
                <AvatarFallback>
                  <UserIcon className="size-16" />
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <Input
                    label={t("firstName.label")}
                    placeholder={t("firstName.placeholder")}
                    {...field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <Input
                    label={t("lastName.label")}
                    placeholder={t("lastName.placeholder")}
                    {...field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="sur_name"
                render={({ field }) => (
                  <Input
                    label={t("surName.label")}
                    placeholder={t("surName.placeholder")}
                    {...field}
                  />
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <Input
                  disabled
                  label={t("email.label")}
                  description={t("email.description")}
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <Input
                  label={t("position.label")}
                  placeholder={t("position.placeholder")}
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <Input
                  label={t("phoneNumber.label")}
                  placeholder={t("phoneNumber.placeholder")}
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <Input
                  label={t("image.label")}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        field.onChange(reader.result as string)
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  description={t("image.description")}
                />
              )}
            />

            <SubmitMessage
              status={serverState.status}
              message={serverState.message}
            />

            <SubmitButton isLoading={isPending}>{t("save")}</SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
