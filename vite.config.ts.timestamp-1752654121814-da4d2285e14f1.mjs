// vite.config.ts
import { defineConfig } from "file:///D:/project/vue/lubancat/.yarn/__virtual__/vite-virtual-f0146a28b6/4/Local/Yarn/Berry/cache/vite-npm-5.2.10-08834d3974-10c0.zip/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/project/vue/lubancat/.yarn/__virtual__/@vitejs-plugin-vue-virtual-6594d61ad5/4/Local/Yarn/Berry/cache/@vitejs-plugin-vue-npm-5.0.4-e08dc8c74a-10c0.zip/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/project/vue/lubancat/.yarn/__virtual__/unplugin-auto-import-virtual-5635a9e863/4/Local/Yarn/Berry/cache/unplugin-auto-import-npm-0.17.5-8844f3b42b-10c0.zip/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/project/vue/lubancat/.yarn/__virtual__/unplugin-vue-components-virtual-637e231ad5/4/Local/Yarn/Berry/cache/unplugin-vue-components-npm-0.26.0-67896adc06-10c0.zip/node_modules/unplugin-vue-components/dist/vite.js";
import { VantResolver } from "file:///D:/Local/Yarn/Berry/cache/@vant-auto-import-resolver-npm-1.1.0-83f80f1e22-10c0.zip/node_modules/@vant/auto-import-resolver/dist/index.esm.mjs";
import { resolve } from "path";
import vueJsx from "file:///D:/project/vue/lubancat/.yarn/__virtual__/@vitejs-plugin-vue-jsx-virtual-044384c054/4/Local/Yarn/Berry/cache/@vitejs-plugin-vue-jsx-npm-4.0.0-554519b57e-10c0.zip/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import postcss from "file:///D:/Local/Yarn/Berry/cache/postcss-npm-8.4.39-f77f32a87d-10c0.zip/node_modules/postcss/lib/postcss.mjs";
import pxToViewport from "file:///D:/Local/Yarn/Berry/cache/postcss-px-to-viewport-npm-1.1.1-346abaecba-10c0.zip/node_modules/postcss-px-to-viewport/index.js";
var __vite_injected_original_dirname = "D:\\project\\vue\\lubancat";
var vite_config_default = defineConfig({
  // css:{
  //   postcss
  // },
  plugins: [
    vueJsx(),
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/
        // .vue
      ],
      imports: ["vue", "vue-router"],
      dts: "auto-imports.d.ts",
      eslintrc: {
        enabled: false
        // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
      }
    }),
    Components({
      resolvers: [VantResolver()]
    }),
    {
      name: "postcss-config",
      async transform(code, id) {
        if (id.endsWith(".css") || id.endsWith(".less")) {
          const { css } = await postcss([
            pxToViewport({
              viewportWidth: 375,
              // 设计稿宽度
              viewportHeight: 1080,
              // 设计稿高度
              unitPrecision: 5,
              viewportUnit: "vw",
              selectorBlackList: [],
              minPixelValue: 1,
              mediaQuery: false,
              exclude: [/node_modules/]
            })
          ]).process(code, { from: id });
          return {
            code: css,
            map: null
          };
        }
      }
    }
  ],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
      // 路径别名
    },
    extensions: [".js", ".json", ".ts"]
    // 使用路径别名时想要省略的后缀名，可以自己 增减
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
    outDir: "dist"
    // sourcemap:false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHZ1ZVxcXFxsdWJhbmNhdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHJvamVjdFxcXFx2dWVcXFxcbHViYW5jYXRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Byb2plY3QvdnVlL2x1YmFuY2F0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHsgVmFudFJlc29sdmVyIH0gZnJvbSAnQHZhbnQvYXV0by1pbXBvcnQtcmVzb2x2ZXInO1xuaW1wb3J0IHtyZXNvbHZlfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHBvc3Rjc3MgZnJvbSAncG9zdGNzcyc7XG5pbXBvcnQgcHhUb1ZpZXdwb3J0IGZyb20gJ3Bvc3Rjc3MtcHgtdG8tdmlld3BvcnQnO1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIC8vIGNzczp7XG4gIC8vICAgcG9zdGNzc1xuICAvLyB9LFxuICBwbHVnaW5zOiBbXG4gICAgdnVlSnN4KCksXG4gICAgdnVlKCksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBpbmNsdWRlOiBbXG4gICAgICAgIC9cXC5bdGpdc3g/JC8sIC8vIC50cywgLnRzeCwgLmpzLCAuanN4XG4gICAgICAgIC9cXC52dWUkLyxcbiAgICAgICAgL1xcLnZ1ZVxcP3Z1ZS8sIC8vIC52dWVcbiAgICAgIF0sXG4gICAgICBpbXBvcnRzOiBbXCJ2dWVcIiwgXCJ2dWUtcm91dGVyXCJdLFxuICAgICAgZHRzOiBcImF1dG8taW1wb3J0cy5kLnRzXCIsXG4gICAgICBlc2xpbnRyYzoge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSwgLy8gMVx1MzAwMVx1NjUzOVx1NEUzQXRydWVcdTc1MjhcdTRFOEVcdTc1MUZcdTYyMTBlc2xpbnRcdTkxNERcdTdGNkVcdTMwMDIyXHUzMDAxXHU3NTFGXHU2MjEwXHU1NDBFXHU2NTM5XHU1NkRFZmFsc2VcdUZGMENcdTkwN0ZcdTUxNERcdTkxQ0RcdTU5MERcdTc1MUZcdTYyMTBcdTZEODhcdTgwMTdcbiAgICAgIH0sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtWYW50UmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gICAge1xuICAgICAgbmFtZTogJ3Bvc3Rjc3MtY29uZmlnJyxcbiAgICAgIGFzeW5jIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuICAgICAgICBpZiAoaWQuZW5kc1dpdGgoJy5jc3MnKSB8fCBpZC5lbmRzV2l0aCgnLmxlc3MnKSkge1xuICAgICAgICAgIGNvbnN0IHsgY3NzIH0gPSBhd2FpdCBwb3N0Y3NzKFtcbiAgICAgICAgICAgIHB4VG9WaWV3cG9ydCh7XG4gICAgICAgICAgICAgIHZpZXdwb3J0V2lkdGg6IDM3NSwgICAvLyBcdThCQkVcdThCQTFcdTdBM0ZcdTVCQkRcdTVFQTZcbiAgICAgICAgICAgICAgdmlld3BvcnRIZWlnaHQ6IDEwODAsICAvLyBcdThCQkVcdThCQTFcdTdBM0ZcdTlBRDhcdTVFQTZcbiAgICAgICAgICAgICAgdW5pdFByZWNpc2lvbjogNSxcbiAgICAgICAgICAgICAgdmlld3BvcnRVbml0OiAndncnLFxuICAgICAgICAgICAgICBzZWxlY3RvckJsYWNrTGlzdDogW10sXG4gICAgICAgICAgICAgIG1pblBpeGVsVmFsdWU6IDEsXG4gICAgICAgICAgICAgIG1lZGlhUXVlcnk6IGZhbHNlLFxuICAgICAgICAgICAgICBleGNsdWRlOiBbL25vZGVfbW9kdWxlcy9dXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICBdKS5wcm9jZXNzKGNvZGUsIHsgZnJvbTogaWQgfSk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvZGU6IGNzcyxcbiAgICAgICAgICAgIG1hcDogbnVsbCxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH1cbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpLCAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICB9LFxuICAgIGV4dGVuc2lvbnM6IFtcIi5qc1wiLCBcIi5qc29uXCIsIFwiLnRzXCJdLCAvLyBcdTRGN0ZcdTc1MjhcdThERUZcdTVGODRcdTUyMkJcdTU0MERcdTY1RjZcdTYwRjNcdTg5ODFcdTc3MDFcdTc1NjVcdTc2ODRcdTU0MEVcdTdGMDBcdTU0MERcdUZGMENcdTUzRUZcdTRFRTVcdTgxRUFcdTVERjEgXHU1ODlFXHU1MUNGXG4gIH0sXG4gIGJhc2U6IFwiL2Rpc3RcIixcbiAgLy8gc2VydmVyOiB7XG4gIC8vICAgaG9zdDogJzAuMC4wLjAnLFxuICAvLyAgIHBvcnQ6IDUxNzMsXG4gIC8vICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgLy8gICBobXI6IHtcbiAgLy8gICAgIHByb3RvY29sOiAnd3MnLFxuICAvLyAgICAgaG9zdDogJzE5Mi4xNjguMC4xMDUnLFxuICAvLyAgICAgcG9ydDogNTE3M1xuICAvLyAgIH1cbiAgLy8gfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IFwiZGlzdFwiLFxuICAgIC8vIHNvdXJjZW1hcDpmYWxzZVxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1AsU0FBUyxvQkFBb0I7QUFDNVIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVEsZUFBYztBQUN0QixPQUFPLFlBQVk7QUFDbkIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sa0JBQWtCO0FBUnpCLElBQU0sbUNBQW1DO0FBVXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBSTFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFdBQVc7QUFBQSxNQUNULFNBQVM7QUFBQSxRQUNQO0FBQUE7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBUyxDQUFDLE9BQU8sWUFBWTtBQUFBLE1BQzdCLEtBQUs7QUFBQSxNQUNMLFVBQVU7QUFBQSxRQUNSLFNBQVM7QUFBQTtBQUFBLE1BQ1g7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxhQUFhLENBQUM7QUFBQSxJQUM1QixDQUFDO0FBQUEsSUFDRDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTSxVQUFVLE1BQU0sSUFBSTtBQUN4QixZQUFJLEdBQUcsU0FBUyxNQUFNLEtBQUssR0FBRyxTQUFTLE9BQU8sR0FBRztBQUMvQyxnQkFBTSxFQUFFLElBQUksSUFBSSxNQUFNLFFBQVE7QUFBQSxZQUM1QixhQUFhO0FBQUEsY0FDWCxlQUFlO0FBQUE7QUFBQSxjQUNmLGdCQUFnQjtBQUFBO0FBQUEsY0FDaEIsZUFBZTtBQUFBLGNBQ2YsY0FBYztBQUFBLGNBQ2QsbUJBQW1CLENBQUM7QUFBQSxjQUNwQixlQUFlO0FBQUEsY0FDZixZQUFZO0FBQUEsY0FDWixTQUFTLENBQUMsY0FBYztBQUFBLFlBQzFCLENBQUM7QUFBQSxVQUNILENBQUMsRUFBRSxRQUFRLE1BQU0sRUFBRSxNQUFNLEdBQUcsQ0FBQztBQUM3QixpQkFBTztBQUFBLFlBQ0wsTUFBTTtBQUFBLFlBQ04sS0FBSztBQUFBLFVBQ1A7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBO0FBQUEsSUFDL0I7QUFBQSxJQUNBLFlBQVksQ0FBQyxPQUFPLFNBQVMsS0FBSztBQUFBO0FBQUEsRUFDcEM7QUFBQSxFQUNBLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBV04sT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBO0FBQUEsRUFFVjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
