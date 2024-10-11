import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { fetcherSSR } from "@/lib/api/fetcher"
import { Member } from "@/features/users/interfaces/member"
import { DataTable } from "@/components/data-table"
import { columns } from "@/features/users/components/members-table/columns"
import { AddMemberDialog } from "@/features/users/components/add-member-dialog"

export default async function MembersPage({
  params: { locale },
}: LocalizedPageProps) {
  unstable_setRequestLocale(locale)
  const t = await getTranslations("MembersPage")
  const { data: members } = await fetcherSSR<Member[]>("/companies/members")

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("title")}</h1>

        {/* Add Member Modal */}
        <AddMemberDialog />
      </div>

      {/* Members Table */}
      <DataTable columns={columns} data={members} filterKeys={["email"]} />
    </div>
  )
}