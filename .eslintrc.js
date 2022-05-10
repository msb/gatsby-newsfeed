module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
  ],
  rules: {
    'semi': 'off',
    'linebreak-style': 'off',
    'react/jsx-filename-extension': [2, { 'extensions': ['.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'import/extensions': ['error', 'ignorePackages', { 'ts': 'never', 'tsx': 'never' }],
    // TODO this might be a good idea
    'react/function-component-definition': 'off',
    // don't see the point of this when you can ES6 defaults
    'react/require-default-props': 'off',
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
