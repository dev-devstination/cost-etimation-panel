"use client"

import { useTransition } from "react"
import { useTranslations } from "next-intl"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserIcon } from "lucide-react"

import { SubmitButton } from "@/components/submit-button"
import {
  CompanyFormData,
  useCompanySchema,
} from "@/features/users/schemas/company"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField } from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/form/input"
import { SubmitMessage } from "@/components/form/submit-message"
import { Company } from "@/features/users/interfaces/company"
import { companyAction } from "@/features/users/actions/company"

interface CompanyFormProps {
  company: Company
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ company }) => {
  const t = useTranslations("CompanyPage.form")

  const companySchema = useCompanySchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(companyAction, initialState)

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: company.name,
      location: company.location,
    },
  })

  const onSubmit = (data: CompanyFormData) => {
    startTransition(() => {
      formAction(data)
    })
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-12">
              <Avatar className="col-span-3 size-32">
                <AvatarImage alt="" src={form.watch("logo")} />
                <AvatarFallback>
                  <UserIcon className="size-16" />
                </AvatarFallback>
              </Avatar>
              <div className="sm:col-span-9">
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <Input
                      label={t("logo.label")}
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
                      description={t("logo.description")}
                    />
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <Input
                  label={t("name.label")}
                  placeholder={t("name.placeholder")}
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <Input
                  label={t("location.label")}
                  placeholder={t("location.placeholder")}
                  {...field}
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
