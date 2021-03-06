module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        singleQuote: true,
        semi: false,
        printWidth: 120
      }
    ]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['lib/', './vue-sliding-panel/']]
      }
    }
  }
}
