import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { AccountForm } from "@/features/users/components/account-form"
import { whoAmI } from "@/features/users/api/who-am-i"

export default async function AccountPage({
  params: { locale },
}: LocalizedPageProps) {
  unstable_setRequestLocale(locale)
  const user = await whoAmI()

  const t = await getTranslations("AccountPage")
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">{t("title")}</h1>
      <AccountForm user={user} />
    </div>
  )
}
