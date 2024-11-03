import { fetcherSSR } from "@/lib/api/fetcher"

import { Resource } from "../types"

interface GetResourcesParams {
  categoryId?: string
  subcategoryId?: string
  active?: string
}

export const getResources = async (params?: GetResourcesParams) => {
  // Build query string
  const queryParams = new URLSearchParams()
  if (params?.categoryId) queryParams.set("categoryId", params.categoryId)
  if (params?.subcategoryId)
    queryParams.set("subcategoryId", params.subcategoryId)
  if (params?.active) queryParams.set("active", params.active)

  const queryString = queryParams.toString()
  const url = `/resources${queryString ? `?${queryString}` : ""}`

  const { data: resources } = await fetcherSSR<Resource[]>(url)

  const resourcesOptions = resources.map((resource) => ({
    label: resource.description,
    value: resource.id,
  }))

  return { resourcesOptions, resources }
}
