module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    // 'comma-dangle': [2, 'always-multiline'],
    'react/prop-types': 0,
    'linebreak-style': 0,
    'max-len': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-cycle': 'off',
  },
};
