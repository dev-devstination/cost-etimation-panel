import { getTranslations } from "next-intl/server"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Project } from "@/features/projects/interfaces/project"
import { BuildingIcon, CalendarIcon, LayoutIcon, UserIcon } from "lucide-react"
import { formatDate } from "@/lib/utils"

import { fetcherSSR } from "@/lib/api/fetcher"
import { Category } from "@/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
interface ProjectDetailsProps {
  project?: Project
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = async ({
  project,
}) => {
  const t = await getTranslations("ProjectsPage.currentProject")

  const { data: categories } =
    await fetcherSSR<Category[]>(`/projects/categories`)

  const projectCategory = categories?.find(
    (category) => category.id === project?.category_id
  )

  if (!project) {
    return (
      <Alert className="text-center font-semibold">
        <AlertDescription>{t("noCurrentProject")}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("projectInfo")}</h3>
            <div className="space-y-2">
              <InfoItem
                icon={<UserIcon className="size-4" />}
                label={t("client_name")}
                value={project.client_name}
              />
              <InfoItem
                icon={<UserIcon className="size-4" />}
                label={t("consultant_name")}
                value={project.consultant_name}
              />
              <InfoItem
                icon={<LayoutIcon className="size-4" />}
                label={t("area")}
                value={project.area}
              />
              <InfoItem
                icon={<BuildingIcon className="size-4" />}
                label={t("category")}
                value={projectCategory?.name ?? "N/A"}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("projectDates")}</h3>
            <div className="space-y-2">
              <DateItem
                label={t("queries_dead_line_date")}
                date={formatDate(project.queries_dead_line_date)}
              />
              <DateItem
                label={t("release_date")}
                date={formatDate(project.release_date)}
              />
              <DateItem
                label={t("site_visit_date")}
                date={formatDate(project.site_visit_date)}
              />
              <DateItem
                label={t("submission_date")}
                date={formatDate(project.submission_date)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const InfoItem: React.FC<{
  icon: React.ReactNode
  label: string
  value: string
}> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 rtl:space-x-reverse">
    {icon}
    <span className="font-medium">{label}</span>
    <span>{value}</span>
  </div>
)

const DateItem: React.FC<{ label: string; date: string }> = ({
  label,
  date,
}) => (
  <div className="flex items-center space-x-2 rtl:space-x-reverse">
    <CalendarIcon className="size-4" />
    <span className="font-medium">{label}</span>
    <span>{date}</span>
  </div>
)
