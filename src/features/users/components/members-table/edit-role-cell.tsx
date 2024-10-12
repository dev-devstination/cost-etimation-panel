"use client"

import { useEffect, useTransition } from "react"
import { useFormState } from "react-dom"
import { useTranslations } from "next-intl"

import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { MemberRow } from "@/features/users/components/members-table/columns"
import { updateMemberAction } from "@/features/users/actions/member"

interface EditRoleCellProps {
  member: MemberRow
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const EditRoleCell: React.FC<EditRoleCellProps> = ({ member }) => {
  const { toast } = useToast()
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")
  const tRole = useTranslations("MembersPage.memberRole")

  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(
    updateMemberAction,
    initialState
  )

  useEffect(() => {
    const { status, message } = serverState

    if (message) {
      toast({
        variant: status,
        description:
          status === "success"
            ? tSuccess(message as keyof IntlMessages["apiSuccess"])
            : tError(message as keyof IntlMessages["apiErrors"]),
      })
    }
  }, [serverState, tError, tSuccess, toast])

  const onChange = (role: "admin" | "writer" | "reader") => {
    startTransition(() => {
      formAction({ role, id: member.id })
    })
  }

  return (
    <Select
      disabled={isPending}
      onValueChange={onChange}
      defaultValue={member.role}
    >
      <SelectTrigger className="max-w-[100px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {member.roles.map(({ Name }) => (
          <SelectItem key={Name} value={Name}>
            {tRole(Name)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
