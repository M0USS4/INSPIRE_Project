module.exports = {
  'env': {
    'node': true,
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    // 'plugin:prettier/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    // 'prettier/prettier': ['error', {
    //   'useTabs': false,
    //   'tabWidth': 2,
    //   'semi': true,
    //   'singleQuote': true,
    //   'quoteProps': 'consistent',
    //   'trailingComma': 'es5',
    //   'bracketSpacing': true,
    //   'arrowParens': 'avoid',
    //   'printWidth': 120,
    //   'endOfLine': 'auto'
    // }],
    'no-console': ['warn'],
    'eqeqeq': [
      'error',
      'always'
    ],
    'max-len': [
      'error',
      { 'code': 120 }
    ],
    'no-trailing-spaces': [
      'error'
    ],
    'no-mixed-spaces-and-tabs': 0,
    'no-multiple-empty-lines': [
      'error',
      { 'max': 1 }
    ],
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
