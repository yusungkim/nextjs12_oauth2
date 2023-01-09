import { useRouter } from "next/router"

import en from "../../i18n/en"
import ja from "../../i18n/ja"
import zh from "../../i18n/zh"
import ko from "../../i18n/ko"
import fr from "../../i18n/fr"


const i18n = (locale: string | undefined) => {
  switch (locale) {
    case "en-US":
      return { locale, i18n: en }
    case "ja-JP":
      return { locale, i18n: ja }
    case "zh-CN":
      return { locale, i18n: zh }
    case "ko-KR":
      return { locale, i18n: ko } 
    case "fr-FR":
      return { locale, i18n: fr } 
    default:
      return { locale: "en-US", i18n: en }
  }
}

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