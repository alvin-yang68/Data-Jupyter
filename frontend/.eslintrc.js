module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'linebreak-style': 'off',
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': ['error', { props: false }],
    'react/jsx-props-no-spreading': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'import/first': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
