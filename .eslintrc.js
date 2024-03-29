module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:cypress/recommended',
  ],
  plugins: ['@typescript-eslint'],
  globals: {},
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    typescript: {
      alwaysTryTypes: true,
      project: '**/tsconfig.json',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-use-before-define': 'off',
        'no-shadow': 'off',
        'no-useless-constructor': 'off',
      },
    },
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'avoid',
      },
    ],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.ts', '.tsx'] }],
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    // typescript for type validation
    // start prettier conflict
    'react/jsx-curly-newline': 'off',
    // end prettier conflict,
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-no-constructed-context-values': 'warn',
  },
};
