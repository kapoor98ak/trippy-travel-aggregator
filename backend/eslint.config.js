const globals = require('globals');

module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      ...require('eslint-config-prettier').rules,
      'prettier/prettier': 'error',
    },
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
  },
];
