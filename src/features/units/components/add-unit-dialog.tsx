import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { AddUnitForm } from "@/features/units/components/add-unit-form"

export const AddUnitDialog = () => {
  const t = useTranslations("UnitsPage.dialog")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4 ltr:mr-2 rtl:ml-2" />
          {t("add")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <AddUnitForm />
      </DialogContent>
    </Dialog>
  )
}
