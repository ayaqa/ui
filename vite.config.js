import { resolve } from 'path'
import { defineConfig } from 'vite'

// plugins
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

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
