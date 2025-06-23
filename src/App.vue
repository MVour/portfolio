<template>
  <v-app  height="100vh">
      <div style="position:absolute;z-index: 2000;  top:0;right:0;margin-top:1%;margin-right:5%;"
      >
      <v-hover >
        <template v-slot:default="{ isHovering, props}">  
          <v-btn v-bind="props" size="x-large" :elevation=" isHovering ? 10 : 0" icon="mdi-theme-light-dark" @click="toggleTheme()" :variant=" 'text'" style="position: absolute;"></v-btn>
        </template>
      </v-hover>
    </div>
    
    
    <Layout />
  </v-app>

</template>

<script setup lang="ts">
  //import { useTheme } from 'vuetify'
  import { onMounted, ref } from 'vue'
  import Welcome from './components/Welcome.vue' 
  import Layout from './components/Layout.vue'
  import { useTheme } from 'vuetify'
  const theme = useTheme()
  
  
  const toggleTheme = () => {
    const next = theme.global.name.value === 'dark' ? 'light' : 'dark';
    theme.global.name.value = next;
  };


  const offSetTop = ref(0);
  // function onScroll(event: Event) {
  function onScroll(event: Event) {

    console.log('Scroll event:', event);
    offSetTop.value = (event.target as HTMLElement)?.scrollTop || 0;
  }

</script>

<style lang="scss">

.v-card-subtitle{
  /* Alternatively, use Vue style binding for dynamic color */
}

*{
  /* outline: 10px solid red !important; */
}

</style>
