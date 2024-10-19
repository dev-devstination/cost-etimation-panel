import { getTranslations } from "next-intl/server"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateProjectForm } from "@/features/projects/components/create-project-form"
import { fetcherSSR } from "@/lib/api/fetcher"
import { Category } from "@/types"

export const CreateProjectDialog = async () => {
  const t = await getTranslations("ProjectsPage.dialog")

  const { data: categories } = await fetcherSSR<Category[]>(
    "/projects/categories"
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4 ltr:mr-2 rtl:ml-2" />
          {t("create")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <CreateProjectForm categories={categories} />
      </DialogContent>
    </Dialog>
  )
}
