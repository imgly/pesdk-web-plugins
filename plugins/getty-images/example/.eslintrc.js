module.exports = {
  extends: ['../.eslintrc.js'],
  rules: {
    'no-console': 'off',
    'no-alert': 'off',
    'import/no-extraneous-dependencies': ['error', { packageDir: [__dirname] }],
  },
};
