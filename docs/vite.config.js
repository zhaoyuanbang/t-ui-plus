import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // 设置neme属性
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'; // svg-icon
const { resolve } = require('path');

// const { resolve } = require('path');
export default defineConfig({
  // resolve: {
  //   alias: {
  //     '@': resolve(__dirname, '.vitepress')
  //   }
  // },
  plugins: [vueJsx(), vueSetupExtend(),
  createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [resolve(process.cwd(), 'src/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
  }),
  ],
  server: {
    host: '0.0.0.0',
    port: 2222,
    open: true,
    https: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "../docs/.vitepress/assets/style/variables.scss"; @import "../docs/.vitepress/vitepress/style/mixins.scss"; @import "../docs/.vitepress/vitepress/style/vars.scss";',
      },
    },
  }
})
