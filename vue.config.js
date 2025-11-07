/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require('@vue/cli-service')
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
            extensions: [".js", ".ts", ".vue", ".json"],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: "ts-loader",
                    options: { appendTsSuffixTo: [/\.vue$/] },
                    exclude: /node_modules/,
                },
            ],
        },
    },
})
