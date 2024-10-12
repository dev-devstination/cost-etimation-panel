import { Plus } from "lucide-react"
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
import { AddSubcategoryForm } from "@/features/activities/components/subcategories/add-subcategory-form"
import { fetcherSSR } from "@/lib/api/fetcher"
import { Category } from "@/features/activities/interfaces/category"

export const AddSubcategoryDialog = async () => {
  const t = await getTranslations("ActivitiesSubcategoriesPage.dialog")
  const { data: categories } = await fetcherSSR<Category[]>(
    "/activities/categories"
  )

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
        <AddSubcategoryForm categories={categories} />
      </DialogContent>
    </Dialog>
  )
}
