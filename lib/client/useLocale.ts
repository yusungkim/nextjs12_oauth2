import { useRouter } from "next/router"
import i18n from "@lib/common/i18n"

export const useLocale = () => {
  const { push, pathname, asPath, query, locale, locales } = useRouter()

  const changeLocale = (nextLocale: string) => {
    // change just the locale and maintain all other route information including href's query
    push({ pathname, query }, asPath, { locale: nextLocale })
  }

  const defaultLocale = i18n(locale).locale

  const otherLocales = locales?.filter((e) => e != defaultLocale).map((e) => ({ locale: e, name: i18n(e).i18n.LANGUAGE }))

  return {
    ...i18n(locale),
    otherLocales,
    changeLocale
  }
}