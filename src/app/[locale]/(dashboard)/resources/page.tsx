import { ChevronDown, Plus } from "lucide-react"
import { unstable_setRequestLocale } from "next-intl/server"
import { useTranslations } from "next-intl"

import { Link } from "@/config/navigation"
import { Filters } from "@/features/resources/components/filters"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/data-table"
import { columns } from "@/features/resources/components/columns"
import { sampleResources } from "@/features/resources/types"

interface ResourcesPageProps {
  params: { locale: string }
}

const ResourcesPage: React.FC<ResourcesPageProps> = ({
  params: { locale },
}) => {
  unstable_setRequestLocale(locale)

  const t = useTranslations("resources")
  return (
    <>
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Button asChild>
          <Link href="/resources/new">
            <Plus className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t("actions.add")}
          </Link>
        </Button>
      </div>
      <div className="flex gap-x-2 mb-4">
        <Filters />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="ltr:ml-auto rtl:mr-auto">
              Categories <ChevronDown className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Manage Categories</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Add Category</DropdownMenuItem>
            <DropdownMenuItem>Edit Categories</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DataTable
        columns={columns}
        data={sampleResources}
        filterKeys={["description"]}
      />
    </>
  )
}

export default ResourcesPage
