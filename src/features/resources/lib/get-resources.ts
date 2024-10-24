import { fetcherSSR } from "@/lib/api/fetcher"

import { Resource } from "../types"

export const getResources = async () => {
  const { data: resources } = await fetcherSSR<Resource[]>("/resources")

  const resourcesOptions = resources.map((resource) => ({
    label: resource.description,
    value: resource.id,
  }))

  return { resourcesOptions, resources }
}
