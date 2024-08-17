export const defaultLocale = 'en';
export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const getLocaleDirection = (locale: Locale) => {
  return locale === 'ar' ? 'rtl' : 'ltr';
};

export const isValidLocale = (tested: string): tested is Locale => {
  return locales.includes(tested as Locale);
};
