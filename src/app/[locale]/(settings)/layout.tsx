import { AuthenticatedLayout } from "@/components/layouts/authintecated-layout"
import { SettingsSidebar } from "@/components/sidebars/settings-sidebar"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthenticatedLayout sidebar={<SettingsSidebar />}>
      {children}
    </AuthenticatedLayout>
  )
}
