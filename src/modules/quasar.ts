import { Quasar } from 'quasar'

import 'quasar/src/css/index.sass'

import '@quasar/extras/material-icons/material-icons.css'

const config = {
  lang: 'en',
  cssAddon: true,
  plugins: {}, // Quasar plugins
  config: {
    brand: {
      primary: 'rgb(0,150,136)',
      secondary: '#26A69A',
      accent: '#9C27B0',

      dark: '#1d1d1d',

      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037'
    }
  }
}

export const install = (app: any) => {
  app.use(Quasar, config)
}
