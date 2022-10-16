module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    "eslint:recommended",
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "curly": "error",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": 'off',
    "@typescript-eslint/explicit-module-boundary-types": 'off',
    "@typescript-eslint/no-explicit-any": 'off',
    "no-unused-vars":"warn",
    // "@typescript-eslint/no-unused-vars": "warn",
    "indent": [
      "off",
      4
  ],
  "linebreak-style": [
      "off",
      "windows"
  ],
  "quotes": [
      "error",
      "single"
  ],
  "semi": [
      "error",
      "always"
  ]
  },
};
