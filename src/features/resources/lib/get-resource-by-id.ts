import { fetcherSSR } from "@/lib/api/fetcher"

import { Resource } from "../types"

export const getResourceById = async (id: string) => {
  const { data: resource } = await fetcherSSR<Resource>(`/resources/${id}`)

  return { resource }
}
