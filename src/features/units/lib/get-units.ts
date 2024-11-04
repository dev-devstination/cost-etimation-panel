import { fetcherSSR } from "@/lib/api/fetcher"

import { Unit } from "../interfaces/unit"

export const getUnits = async () => {
  const { data: units } = await fetcherSSR<Unit[]>("/setting/units")

  const unitsOptions = units.map((unit) => ({
    label: unit.name,
    value: unit.id,
  }))

  return { unitsOptions, units }
}
