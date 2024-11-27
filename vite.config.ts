import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite";
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import {resolve} from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import postcss from 'postcss';
import pxToViewport from 'postcss-px-to-viewport';
// https://vitejs.dev/config/
export default defineConfig({
  // css:{
  //   postcss
  // },
  plugins: [
    vueJsx(),
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: ["vue", "vue-router"],
      dts: "auto-imports.d.ts",
      eslintrc: {
        enabled: false, // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
      },
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    {
      name: 'postcss-config',
      async transform(code, id) {
        if (id.endsWith('.css') || id.endsWith('.less')) {
          const { css } = await postcss([
            pxToViewport({
              viewportWidth: 375,   // 设计稿宽度
              viewportHeight: 1080,  // 设计稿高度
              unitPrecision: 5,
              viewportUnit: 'vw',
              selectorBlackList: [],
              minPixelValue: 1,
              mediaQuery: false,
              exclude: [/node_modules/]
            }),
          ]).process(code, { from: id });
          return {
            code: css,
            map: null,
          };
        }
      },
    }
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 路径别名
    },
    extensions: [".js", ".json", ".ts"], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  base: "/dist",
  // server: {
  //   host: '0.0.0.0',
  //   port: 5173,
  //   strictPort: true,
  //   hmr: {
  //     protocol: 'ws',
  //     host: '192.168.0.105',
  //     port: 5173
  //   }
  // },
  build: {
    outDir: "dist",
    // sourcemap:false
  },
})
