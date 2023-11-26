module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    'plugin:@typescript-eslint/recommended-type-checked',
    "next/core-web-vitals",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    warnOnUnsupportedTypeScriptVersion: false,
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "react/prop-types": "off",
  }
};