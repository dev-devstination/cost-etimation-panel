import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { CreateResourceForm } from "@/features/resources/components/create-resource-form"

const CreateNewResourcePage: React.FC<LocalizedPageProps> = async ({
  params: { locale },
}) => {
  unstable_setRequestLocale(locale)
  const t = await getTranslations("CreateResourcePage")

  return (
    <>
      <div className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <CreateResourceForm />
        </div>
      </div>
    </>
  )
}

export default CreateNewResourcePage
