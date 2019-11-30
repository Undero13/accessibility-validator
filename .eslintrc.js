module.exports = {
  extends: ["airbnb", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  env:{
    "browser": true,
    "node": true,
    "jest":true
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {}
    }
  },
  rules: {
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] }
    ],
    "import/no-extraneous-dependencies": [
      2,
      { devDependencies: ["**/test.tsx", "**/test.ts"] }
    ],
    "@typescript-eslint/indent": [2, 2],
    "import/no-extraneous-dependencies":"off",
    "import/no-unresolved":"off",
    "no-new":"off",
    "no-console":"off",
    "lines-between-class-members":"off",
    "no-extra-semi":"off",
    "semi":"off",
    "linebreak-style":"off",
    "@typescript-eslint/interface-name-prefix":"off",
    "global-require":"off",
    "@typescript-eslint/no-var-requires":"off",
    "import/no-dynamic-require":"off"
  },
  "globals":{
    "getStyleFormDom": true,
    "getAnimationElement": true,
    "enlargeFonts": true,
    "clearURL": true,
    "getPotentialModal": true
  }
};
