module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2021,
        sourceType: "module",
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-recommended",
    ],
    plugins: ["vue", "@typescript-eslint"],
    rules: {},
};