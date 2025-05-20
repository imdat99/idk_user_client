import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { UnoCSSRspackPlugin } from '@unocss/webpack/rspack'
const date = new Date()
const dateNow = date
    .toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
    .replace(/\//g, '')
export default defineConfig({
    plugins: [pluginReact()],
    tools: {
        rspack: {
            plugins: [UnoCSSRspackPlugin()],
        },
    },
    output: {
        legalComments: 'none',

        sourceMap: false,
        filename: {
            js: `[name].${dateNow}.[contenthash:6].js`,
        },
    },
})
