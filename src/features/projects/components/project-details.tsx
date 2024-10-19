import { useTranslations } from "next-intl"

import { Project } from "@/features/projects/interfaces/project"

interface ProjectDetailsProps {
  project: Project
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const t = useTranslations("ProjectsPage.form")

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{project.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>
            <strong>{t("client_name.label")}</strong> {project.client_name}
          </p>
          <p>
            <strong>{t("consultant_name.label")}</strong>{" "}
            {project.consultant_name}
          </p>
          <p>
            <strong>{t("area.label")}</strong> {project.area}
          </p>
          <p>
            <strong>{t("category_id.label")}</strong> {project.category_id}
          </p>
        </div>
        <div>
          <p>
            <strong>{t("queries_dead_line_date.label")}</strong>{" "}
            {new Date(project.queries_dead_line_date).toLocaleDateString()}
          </p>
          <p>
            <strong>{t("release_date.label")}</strong>{" "}
            {new Date(project.release_date).toLocaleDateString()}
          </p>
          <p>
            <strong>{t("site_visit_date.label")}</strong>{" "}
            {new Date(project.site_visit_date).toLocaleDateString()}
          </p>
          <p>
            <strong>{t("submission_date.label")}</strong>{" "}
            {new Date(project.submission_date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}
