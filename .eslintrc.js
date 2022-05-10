module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
  ],
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx'] }],
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],
    'react/jsx-props-no-spreading': 'off',
    // don't see the point of this when you can ES6 defaults
    'react/require-default-props': 'off',
    // no need for this
    'linebreak-style': 'off',
    // disabled on 1st pass
    'react/function-component-definition': 'off',
    // disabled on 1st pass
    semi: 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
}
