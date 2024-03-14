/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@privasee_task/eslint-config/server.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};
