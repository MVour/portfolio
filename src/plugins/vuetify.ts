/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

import colors from 'vuetify/util/colors'



const lightTheme = {
  dark: false,
  colors: {
    background: '#ECEFF1', // A light, cool gray from Material Design (Blue Gray 50)
    surface: '#ffffff',
    primary: '#4d599c', // A blue-gray that complements your new secondary
    secondary: '#424242', // Your preferred dark gray secondary
    // accent: '#82B1FF',
    error: '#851d22',
    info: '#3267b5',
    success: '#167533',
    warning: '#FB8C00',
    accent: '#bb61c1'
  }
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#1E1E1E',
    // "on-background": "#bb61c1",
    // "on-surface": "#bb61c1",
    primary: colors.indigo.lighten1,
    secondary: '#424242', 
    error: '#b41c2b',
    info: '#388cfa',
    success: '#009f42',
    warning: '#FB8C00',
    accent: '#E574ED'
  }
}


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    themes: {
      light: lightTheme,
      dark: darkTheme
    }
  },
})
