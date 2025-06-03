<template>
  <v-app>
    <v-layout>
      <v-btn @click="toggleTheme()" vriant="elevated" style="position: absolute; top:0;right:0;margin: 2%;">theme</v-btn>
      <!-- <v-app-bar app 
      color="transparent"
      class="white--text">ha
      >

        
      </v-app-bar> -->
    <!-- </v-app-bar> -->
    
    <!-- <HelloWorld /> -->
      <!-- <v-navigation-drawer ></v-navigation-drawer> -->

      <v-main>
        <router-view />
      </v-main>
      
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
  //import { useTheme } from 'vuetify'
  import { onMounted } from 'vue'
  import { useTheme } from 'vuetify'
  const theme = useTheme()
  
  
  const toggleTheme = () => {
    const next = theme.global.name.value === 'dark' ? 'light' : 'dark';
    theme.global.name.value = next;
    // localStorage.setItem('theme', next);
  };


</script>
