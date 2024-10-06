import { AuthenticatedLayout } from "@/components/layouts/authintecated-layout"
import { AccountSidebar } from "@/components/sidebars/account-sidebar"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthenticatedLayout sidebar={<AccountSidebar />}>
      {children}
    </AuthenticatedLayout>
  )
}
