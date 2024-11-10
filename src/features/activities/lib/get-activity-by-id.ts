import { fetcherSSR } from "@/lib/api/fetcher"

import { Activity } from "@/features/activities/types"

export const getActivityById = async (id: string) => {
  const { data: activity } = await fetcherSSR<Activity>(`/activities/${id}`)

  return { activity }
}
