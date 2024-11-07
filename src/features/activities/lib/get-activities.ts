import { fetcherSSR } from "@/lib/api/fetcher"

import { Activity } from "@/features/activities/types"

interface GetActivitiesParams {
  categoryId?: string
  subcategoryId?: string
  active?: string
}

export const getActivities = async (params?: GetActivitiesParams) => {
  // Build query string
  const queryParams = new URLSearchParams()
  if (params?.categoryId) queryParams.set("categoryId", params.categoryId)
  if (params?.subcategoryId)
    queryParams.set("subcategoryId", params.subcategoryId)
  if (params?.active) queryParams.set("active", params.active)

  const queryString = queryParams.toString()
  const url = `/activities${queryString ? `?${queryString}` : ""}`

  const { data: activities } = await fetcherSSR<Activity[]>(url)

  const activitiesOptions = activities.map((activity) => ({
    label: activity.description,
    value: activity.id,
  }))

  return { activitiesOptions, activities }
}
