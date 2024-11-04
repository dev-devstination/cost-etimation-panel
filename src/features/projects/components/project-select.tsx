"use client"

import { useTransition } from "react"
import { useTranslations } from "next-intl"
import { X } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Project } from "@/features/projects/interfaces/project"
import { changeCurrentProjectAction } from "@/features/projects/actions/project"

interface ProjectSelectProps {
  projects: Project[]
  currentProject?: Project
}

export const ProjectSelect = ({
  projects,
  currentProject,
}: ProjectSelectProps) => {
  const t = useTranslations("layout.projectSelector")
  const [isPending, startTransition] = useTransition()

  const handleProjectChange = (projectId: string) => {
    startTransition(() => {
      changeCurrentProjectAction(projectId)
    })
  }

  const handleRemoveProject = () => {
    startTransition(() => {
      changeCurrentProjectAction("")
    })
  }

  return (
    <div className="space-y-2 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 p-4 shadow-sm">
      <div className="flex items-center gap-x-2">
        <Select
          value={currentProject?.id}
          onValueChange={handleProjectChange}
          disabled={isPending}
        >
          <SelectTrigger id="project-select">
            <SelectValue placeholder={t("noCurrentProject")} />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentProject && (
        <div className="group flex items-center justify-between gap-x-2">
          <p className="text-xs text-gray-600 dark:text-gray-300">
            {t("currentProject")}
            <span className="font-medium text-primary">
              {currentProject.name}
            </span>
          </p>

          <X
            className="size-4 opacity-0 transition-opacity duration-300 hover:cursor-pointer hover:text-destructive group-hover:opacity-100 ltr:right-0 rtl:left-0"
            onClick={handleRemoveProject}
          />
        </div>
      )}
    </div>
  )
}
