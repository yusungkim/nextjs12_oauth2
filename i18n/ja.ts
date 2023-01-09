const ja = {
  LANGUAGE: "日本語",
  TITLE: "素Life",
  NAV: {
    RECIPE: "レシピ",
    PROFILE: "プロフィール",
    LANGUAGE: "言語",
    DEV_SCHEDULE: "開発スケジュール"
  },
  RECIPE: {
    TITLE: "レシピ",
    FAV: "人気レシピ",
    MINES: "自分のレシピ",
    NAME: "料理名",
    WRITE: "レシピ作成",
    DESCRIPTION: "お料理に関する簡単な説明を入れてください。",
    INGREDIENTS: {
      NAME: "材料",
      COMPOUND: {
        PLACEHOLDER: "ex)生地",
        ADD: "パーツを追加",
      },
      ADD: "材料を追加",
    },
    INSTRUCTIONS: {
      NAME: "作り方",
      TITLE: "ex)準備",
      DESCRIPTION: "ex)豆腐を水切りする、オーブンを180度に予熱する。",
      ADD: "手順を追加",
    },
    ERROR: {
      NAME: {
        REQUIRE: "料理のお名前を入れてください。"
      },
      INSTRUCTION: {
        REQUIRE: "手順の説明を入れてください。",
        LESS_THEN_30: "手順は30項目までです"
      },
      DESCRIPTION: {
        REQUIRE: "料理の説明があると嬉しいです。"
      }
    },
    ART:{
      MAIN: "作品写真",
      ADD: "追加",
      INGREDIENTS: "材料",
      ELSE: "その他",
    },
    CREATE: {
      UPLOAD: "レシピを登録",
      UPLOADING: "登録中",
    }
  },
  AUTH: {
    SIGNIN: "ログイン",
    SIGNUP: "会員登録",
    SIGNOUT: "ログアウト",
    NICKNAME: "ニックネーム",
    EMAIL: "Eメール",
    PASSWORD: "パスワード",
    CONFIRM_PASSWORD: "パスワード（確認）",
    AGREEMENT: "に準拠したCookieの使用に同意します",
    AGREEMENT_LINK: "本プライバシーポリシーの内容",
    ERROR: {
      NICKNAME: {
        UNIQUE: "指定したニックネームは既に使われています。",
        UNDEFINED: "ニックネームが未設定"
      },
      EMAIL: {
        REGEX: "正しいemailではありません。",
        UNIQUE: "既に登録されています。"
      },
      PASSWORD: {
        GREATER_THEN_8: "8文字以上入れてください",
        NOT_MATCH: "パスワードが一致しません。"
      },
      AGREEMENT: "プライバシーポリシーに同意してください。"
    }
  },
  PROFILE: {
    EDIT: "プロフィール更新",
    FAV: "人気レシピ",
    MINES: "自分のレシピ",
    CHANGE: "写真選択",
    NICKNAME: "ニックネーム",
    EMAIL: "Eメール",
    UPDATE: "プロフィール更新",
    ERROR: {
      NAME: {
        LESSTHEN30: "30文字以下にしてください"
      }
    }
  },
}

export default ja