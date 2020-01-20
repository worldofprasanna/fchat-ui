module.exports = {
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/recommended'
  ],
  rules: {
    // override/add rules settings here, such as:
    "vue/no-unused-vars": 'error',
    'import/no-extraneous-dependencies': 'off',
    "semi": [1, 'never'],
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'vue/prop-name-casing': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off'
  }
}
