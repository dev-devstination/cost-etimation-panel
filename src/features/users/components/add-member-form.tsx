"use client"

import { useEffect, useRef, useTransition } from "react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { UserPlus2 } from "lucide-react"

import {
  MemberFormData,
  useMemberSchema,
} from "@/features/users/schemas/member"
import { addMemberAction } from "@/features/users/actions/member"
import { SubmitButton } from "@/components/submit-button"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/form/input"
import { Select } from "@/components/form/select"
import { RoleResponse } from "@/features/users/interfaces/role"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SubmitMessage } from "@/components/form/submit-message"

const initialState = {
  message: undefined,
  status: undefined,
}

interface AddMemberFormProps {
  roles: RoleResponse[]
}

export const AddMemberForm: React.FC<AddMemberFormProps> = ({ roles }) => {
  const t = useTranslations("MembersPage.form")
  const tRole = useTranslations("MembersPage.memberRole")

  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const memberSchema = useMemberSchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(addMemberAction, initialState)

  const form = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  })

  useEffect(() => {
    const { status } = serverState

    if (status === "success") {
      closeButtonRef.current?.click()
    }
  }, [serverState])

  const onSubmit = (data: MemberFormData) => {
    startTransition(() => {
      formAction(data)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-12 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div className="col-span-8">
                <Input
                  label={t("email.label")}
                  placeholder={t("email.placeholder")}
                  {...field}
                />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <div className="col-span-4">
                <Select
                  label={t("role.label")}
                  options={roles.map((role) => ({
                    label: tRole(role.Name),
                    value: role.Name,
                  }))}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder={t("role.placeholder")}
                />
              </div>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <Input
              type="password"
              label={t("password.label")}
              placeholder={t("password.placeholder")}
              {...field}
            />
          )}
        />

        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <Input
              type="password"
              label={t("password_confirmation.label")}
              placeholder={t("password_confirmation.placeholder")}
              {...field}
            />
          )}
        />

        <SubmitMessage
          status={serverState.status}
          message={serverState.message}
        />

        <DialogFooter>
          <DialogClose asChild ref={closeButtonRef}>
            <Button variant="outline">{t("cancel")}</Button>
          </DialogClose>

          <SubmitButton className="w-auto" isLoading={isPending}>
            <UserPlus2 className="size-4 ltr:mr-2 rtl:ml-2" />
            {t("save")}
          </SubmitButton>
        </DialogFooter>
      </form>
    </Form>
  )
}
