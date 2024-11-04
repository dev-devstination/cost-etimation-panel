import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { fetcherSSR } from "@/lib/api/fetcher"
import { RoleResponse } from "@/features/users/interfaces/role"
import { AddMemberForm } from "@/features/users/components/add-member-form"

export const AddMemberDialog = async () => {
  const t = await getTranslations("MembersPage.dialog")

  const { data } = await fetcherSSR<RoleResponse[]>("/setting/roles/company")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4 ltr:mr-2 rtl:ml-2" />
          {t("add")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <AddMemberForm roles={data} />
      </DialogContent>
    </Dialog>
  )
}
