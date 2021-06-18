module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: ['react', 'react-hooks'],
  rules: {
    'no-unused-vars': [2, { vars: 'all', args: 'none', ignoreRestSiblings: true }],
    'comma-dangle': [2, 'always-multiline'],
    'object-curly-spacing': [2, 'always'],
    'spaced-comment': ['error', 'always'],
    'max-len': ['error', { code: 100 }],
    'react/jsx-closing-bracket-location': [1, 'line-aligned'],
    // React-Hooks Plugin
    // The following rules are made available via `eslint-plugin-react-hooks`
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    // React Plugin
    // The following rules are made available via `eslint-plugin-react`.
    'react/display-name': 0,
    'react/jsx-boolean-value': 0,
    'react/jsx-no-comment-textnodes': 1,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-sort-props': 0,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/no-multi-comp': 0,
    'react/no-string-refs': 1,
    'react/no-unknown-property': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 1,
    'react/self-closing-comp': 1,
    'react/wrap-multilines': 0,
  },
};
