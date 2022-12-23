module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'google',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  globals: {
    __ENV__: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    'semi': ['error', 'always'],
    'no-unused-vars': 0,
    'max-len': ['error', {'code': 120}],
  },
};
