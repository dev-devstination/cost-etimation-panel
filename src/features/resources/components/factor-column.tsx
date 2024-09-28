import { Edit } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Input } from "@/components/ui/input"

export const FactorColumn = () => {
  const t = useTranslations("common.factorDialog")
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          {t("title")} <Edit className="size-4 ltr:ml-2 rtl:mr-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <div>
          <Input />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t("cancel")}</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button>{t("actionButton")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
