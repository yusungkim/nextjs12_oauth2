const en = {
  LANGUAGE: "中国語",
  TITLE: "Sulife",
  NAV: {
    RECIPE: "Recipe",
    PROFILE: "Profile",
    LANGUAGE: "Language",
    DEV_SCHEDULE: "DevSchedule"
  },
  RECIPE: {
    TITLE: "Recipe",
    FAV: "Favorites",
    MINES: "MyRecipes",
    NAME: "Recipe Title",
    WRITE: "Write Recipe",
    DESCRIPTION: "Please describe your recipe.",
    INGREDIENTS: {
      NAME: "INGREDIENTS",
      COMPOUND: {
        PLACEHOLDER: "ex)Souce",
        ADD: "Add a part",
      },
      ADD: "Add an ingredient",
    },
    INSTRUCTIONS: {
      NAME: "INSTRUCTIONS",
      TITLE: "ex)preparation",
      DESCRIPTION: "ex)Whisk 1 tablespoon of ground flax seeds with 3 tablespoons of water until it forms a gel.",
      ADD: "Add an instruction",
    },
    ERROR: {
      NAME: {
        REQUIRE: "Recipe title is required"
      },
      INSTRUCTION: {
        REQUIRE: "Instructions are required.",
        LESS_THEN_30: "Instructions should be less then 30."
      },
      DESCRIPTION: {
        REQUIRE: "Please describe your recipe."
      }
    },
    ART:{
      MAIN: "Your Cuisine",
      ADD: "Add",
      INGREDIENTS: "Ingredients",
      ELSE: "Other photo",
    },
    CREATE: {
      UPLOAD: "Upload recipe",
      UPLOADING: "Uploading",
    }
  },
  AUTH: {
    SIGNIN: "Sign in",
    SIGNUP: "Sign up",
    SIGNOUT: "Sign out",
    NICKNAME: "Nickname",
    EMAIL: "Email",
    PASSWORD: "Password",
    CONFIRM_PASSWORD: "Confirm Password",
    AGREEMENT: "I agree with the",
    AGREEMENT_LINK: "terms and conditions",
    ERROR: {
      NICKNAME: {
        UNIQUE: "Nickname is already taken.",
        UNDEFINED: "Please set your nickname"
      },
      EMAIL: {
        REGEX: "Email is not valid.",
        UNIQUE: "Already registered."
      },
      PASSWORD: {
        GREATER_THEN_8: "Password should longer then 8 letters.",
        NOT_MATCH: "Passwords do not match."
      },
      AGREEMENT: "Please agree to the terms and conditions"
    }
  },
  PROFILE: {
    EDIT: "Edit Profile",
    FAV: "Favorite Recipes",
    MINES: "My Recipes",
    CHANGE: "Select photo",
    NICKNAME: "Nickname",
    EMAIL: "Email",
    UPDATE: "Update Profile",
    ERROR: {
      NAME: {
        LESSTHEN30: "Use less then 30 characters."
      }
    }
  },
}

export default en