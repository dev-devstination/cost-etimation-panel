import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { useRef } from "react"
import { Edit } from "lucide-react"

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

import { UpdateResourcesSchema } from "../schemas/resource"

export const FactorColumn = () => {
  const t = useTranslations("common.factorDialog")
  const inputRef = useRef<HTMLInputElement>(null)

  const form = useFormContext<UpdateResourcesSchema>()

  const handleFactorAll = () => {
    const newValue = inputRef.current?.value
    if (!newValue) return

    const resources = form.getValues("resources")
    resources.forEach((_, index) => {
      form.setValue(`resources.${index}.factor`, newValue, {
        shouldDirty: true,
        shouldValidate: true,
      })
    })
  }

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
          <Input ref={inputRef} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              {t("cancel")}
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button type="button" onClick={handleFactorAll}>
              {t("actionButton")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
