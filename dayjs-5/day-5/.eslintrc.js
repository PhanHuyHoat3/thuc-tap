module.exports = {
  env: {
    browser: false,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 'off',
  },
};