import { resolve } from 'path'
import { defineConfig } from 'vite'

// plugins
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({ 
      sassVariables: 'src/assets/style/quasar-variables.sass' 
    }),
    vueI18n({
      include: resolve(__dirname, 'src/locales/**')
    }),
    Layouts({
      layoutsDirs: 'src/views/layouts',
      defaultLayout: 'app'
    }),
    Pages({
      dirs: [
        { dir: 'src/views/pages/home', baseRoute: '' },
        { dir: 'src/views/pages/app', baseRoute: '/app/' }
      ]
    })
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'src'),
    },
  },
  build: {
    esbuildOptions: {},
  }
})
