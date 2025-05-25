import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
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
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [UnoCSSRspackPlugin()],
    },
  },
  html: {
    title: "Xemdi - Xem phim online miễn phí",
    favicon: "./public/assets/images/favicon.ico",
    appIcon: {
      name: "Xemdi",
      icons: [
        { src: "./public/assets/images/web-app-manifest-192x192.png", size: 192 },
        { src: "./public/assets/images/web-app-manifest-512x512.png", size: 512 },
        { src: "./public/assets/images/favicon-96x96.png", size: 96 },
        { src: "./public/assets/images/favicon.svg", target: "web-app-manifest", size: 96 },
        { src: "./public/assets/images/apple-touch-icon.png", size: 180, target: "apple-touch-icon" },
      ],
    },
    tags: [
        {
            tag: "meta",
            attrs: {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
            },
        },
        {
            tag: "meta",
            attrs: {
            name: "theme-color",
            content: "#ffffff",
            },
        },
        {
            tag: "meta",
            attrs: {
            name: "description",
            content: "Xemdi - Your go-to platform for movie and TV show recommendations.",
            },
        }
    ]
  },
  output: {
    legalComments: "none",

    sourceMap: false,
    filename: {
      js: `[name].${dateNow}.[contenthash:6].js`,
    },
  },
});
