import { z } from "zod"
import { useTranslations } from "next-intl"

export const useCurrencySchema = () => {
  const t = useTranslations("CurrenciesPage.form")

  return z.object({
    code: z
      .string({ required_error: t("code.validation.required") })
      .min(1, t("code.validation.required")),
    country: z
      .string({ required_error: t("country.validation.required") })
      .min(1, t("country.validation.required")),
    currency: z
      .string({ required_error: t("currency.validation.required") })
      .min(1, t("currency.validation.required")),
    exchange_rate: z
      .string({ required_error: t("exchange_rate.validation.required") })
      .min(1, t("exchange_rate.validation.required"))
      .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
        message: t("exchange_rate.validation.invalid"),
      })
      .transform((val) => parseFloat(parseFloat(val).toFixed(2))),
  })
}

export const useCurrencyCodeSchema = () => {
  const schema = useCurrencySchema()
  return schema.pick({ code: true })
}

export const useCurrencyCountrySchema = () => {
  const t = useTranslations("CurrenciesPage.form")

  return z.object({
    description: z
      .string({ required_error: t("country.validation.required") })
      .min(1, t("country.validation.required")),
  })
}

export const useCurrencyCurrencySchema = () => {
  const schema = useCurrencySchema()
  return schema.pick({ currency: true })
}

export const useCurrencyExchangeRateSchema = () => {
  const schema = useCurrencySchema()
  return schema.pick({ exchange_rate: true })
}

export type CurrencyCodeSchema = ReturnType<typeof useCurrencyCodeSchema>
export type CurrencyCodeFormData = z.infer<CurrencyCodeSchema>

export type CurrencyCountrySchema = ReturnType<typeof useCurrencyCountrySchema>
export type CurrencyCountryFormData = z.infer<CurrencyCountrySchema>

export type CurrencyCurrencySchema = ReturnType<
  typeof useCurrencyCurrencySchema
>
export type CurrencyCurrencyFormData = z.infer<CurrencyCurrencySchema>

export type CurrencyExchangeRateSchema = ReturnType<
  typeof useCurrencyExchangeRateSchema
>
export type CurrencyExchangeRateFormData = z.infer<CurrencyExchangeRateSchema>

export type CurrencySchema = ReturnType<typeof useCurrencySchema>
export type CurrencyInputFormData = z.input<CurrencySchema>
export type CurrencyFormData = z.infer<CurrencySchema>
