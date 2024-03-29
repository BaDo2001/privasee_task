const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use server side
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: ['@vercel/style-guide/eslint/node', '@vercel/style-guide/eslint/typescript'].map(require.resolve),
  parserOptions: {
    project,
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ['only-warn', 'simple-import-sort'],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    {
      files: ['**/__tests__/**/*'],
      env: {
        jest: true,
      },
      rules: {
        'eslint-comments/require-description': 'off',
      },
    },
  ],
  ignorePatterns: ['node_modules/', 'dist/'],
  // add rules configurations here
  rules: {
    'import/no-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^react'], ['^@?\\w'], ['^@/?\\w'], ['^\\.\\.(?!/?$)', '^\\.\\./?$'], ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/order': 'off',
  },
};
