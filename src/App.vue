<template>
  <v-app>
    <v-layout>
      <!-- <v-app-bar flat> -->
        <div
        style="position:absolute;z-index: 1000;  top:0;right:0;margin-top:1%;margin-right:5%;"
        >

          <v-hover >

            <template v-slot:default="{ isHovering, props}">  
              <v-btn v-bind="props" size="x-large" :elevation=" isHovering ? 10 : 0" icon="mdi-theme-light-dark" @click="toggleTheme()" :variant=" 'text'" style="position: absolute;"></v-btn>
            </template>
          </v-hover>
        </div>
      <!-- </v-app-bar> -->
      
      
      <v-main class="" style="border:2px solid yellow">
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
  };


</script>
