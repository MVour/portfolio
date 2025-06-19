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
    primary: '#607D8B', // A blue-gray that complements your new secondary
    secondary: '#424242', // Your preferred dark gray secondary
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00'
  }
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#1E1E1E',
    primary: '#E0E0E0',   
    secondary: colors.indigo.darken1, // Updated to use Vuetify color utility
    accent: '#FF4081',
    error: '#CF6679',
    info: '#2199F3', // Corrected a typo here from original, assuming you meant standard info color
    success: '#4CAF50',
    warning: '#FB8C00'
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
