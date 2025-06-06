import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginBabel } from '@rsbuild/plugin-babel';
import { UnoCSSRspackPlugin } from "@unocss/webpack/rspack";
const date = new Date();
const dateNow = date
  .toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .replace(/\//g, "");
export default defineConfig({
  plugins: [
    pluginReact(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      babelLoaderOptions(opts) {
        opts.plugins?.unshift('babel-plugin-react-compiler');
      },
    }),
  ],
  tools: {
    rspack: {
      plugins: [UnoCSSRspackPlugin()],
    },
  },
  html: {
    template: "./index.html"
  },
  server: {
    port: 3000,
    open: false
  },
  output: {
    legalComments: "none",

    sourceMap: false,
    filename: {
      js: `[name].${dateNow}.[contenthash:6].js`,
    },
  },
});
