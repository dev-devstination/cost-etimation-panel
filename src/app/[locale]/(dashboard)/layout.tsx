import { AuthenticatedLayout } from "@/components/layouts/authintecated-layout"
import { MainSidebar } from "@/components/sidebars/main-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthenticatedLayout sidebar={<MainSidebar />}>
      {children}
    </AuthenticatedLayout>
  )
}
