module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "linebreak-style": "off",
    "max-len": "off",
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    "react/jsx-props-no-spreading": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "import/first": "off",
    "dot-notation": "off",
    "jsx-a11y/no-autofocus": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true },
    ],
    "react/require-default-props": "off",
    "@typescript-eslint/ban-ts-comment": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
