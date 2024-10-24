import { fetcherSSR } from "@/lib/api/fetcher"

import { Currency } from "../interfaces/currency"

export const getCurrencies = async () => {
  const { data: currencies } = await fetcherSSR<Currency[]>(
    "/setting/currencies"
  )

  const currenciesOptions = currencies.map((currency) => ({
    label: currency.currency,
    value: currency.id,
  }))

  return { currenciesOptions, currencies }
}
