module.exports = {
  extends: ["airbnb", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: [
    "@typescript-eslint",
    "prettier",
    "react-hooks",
    "class-prefer-methods",
    "simple-import-sort",
    "react-native"
  ],
  env: {
    "react-native/react-native": true
  },
  rules: {
    "react/jsx-no-literals": ["error", {ignoreProps: true}],
    "react-native/no-unused-styles": "error",
    "react-native/no-color-literals": "error",
    "global-require": "off",
    "jsx-a11y/label-has-associated-control": [2, {}],
    "prettier/prettier": ["error"],
    "import/no-unresolved": "off",
    "react/forbid-prop-types": ["error"],
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".tsx"] }],
    "react/static-property-placement": ["error", "static public field"],
    "react/jsx-no-bind": ["error", {}],
    "class-prefer-methods/prefer-methods": "error",
    "import/no-extraneous-dependencies": "off",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Side effect imports.
          ["^\\u0000"],
          [
            "^react", // Ensure that import from "react" is at the top
            "^next",
            "^(?!(api|components|hooks|screens|services|styles|types|[.]+)(/|$))",
          ],
          ["^(~\)(/|$)"],
          // Everything else
          ["^(api|hooks|services|types|utils)(/|$)"],
          // UI modules
          ["^(screens|components|styles)(/|$)"],
          // Relative imports
          ["^[.]"],
        ],
      },
    ],
    "camelcase": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-fragments": ["error", "syntax"],
    "no-plusplus": ["off"],
    "react/no-danger": ["off"],
    "react/require-default-props": ["off"],
    "import/prefer-default-export": ["off"],
    "react/jsx-props-no-spreading": ["off"],
    "react/react-in-jsx-scope": ["off"], // nextjs provide global react
    "no-unused-vars": ["off"], // works badly with typescript
    "import/extensions": ["off"], // works badly with typescript
    "react/prop-types": ["off"],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"]
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    react: {
      version: "detect",
    },
  },
};