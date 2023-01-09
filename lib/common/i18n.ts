import en from "../../i18n/en"
import ja from "../../i18n/ja"
import zh from "../../i18n/zh"
import ko from "../../i18n/ko"
import fr from "../../i18n/fr"


export const i18n = (locale: string | undefined) => {
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

export default i18n