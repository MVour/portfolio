<template>
  <v-card
    height="70vh"
    width="100%"
    class="d-flex justify-center align-center"
    style="position: relative; overflow: hidden;"
    flat
    :color="theme.current.value.colors.background" 
  >

    <div class="cube-container">
      <v-tooltip text="Click to view project details" location="top" v-for="cube in cubes" :key="cube.id">
        <template v-slot:activator="{props}">
          <v-sheet elevation="8" :color="theme.current.value.colors.secondary" v-bind="props"
            :key="cube.id"
            @mouseenter="cube.isHovered=true"
            @mouseleave="cube.isHovered=false"
            class="cube mySHeet"
            :style="getCubeStyle(cube)"
            @click="() => handleCubeClick(cube)"
          >

              <v-icon :color="theme.current.value.colors.background" :size="cube.isHovered ? '70' : '34'" :icon="cube.project.icon">

              </v-icon>
            </v-sheet>
        </template>
      </v-tooltip>
    </div>

    <v-card-text 
      class="text-h3 d-flex flex-row align-center justify-center"
      style="position: relative; text-align: center;flex-wrap: wrap;"
    >
      <v-avatar  style="z-index:3"  size="300">
          <v-img  :src="selfImg" alt="selfImg"></v-img>
      </v-avatar>
      <div  class="ml-6 text-left" style="z-index:3; display:flex; flex-direction: column;">
        <div class="display-1">{{ name_first }}</div>
        <div class="display-1">{{ name_last }}</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import  selfImg  from '@/assets/self.jpg' 
import projectsInfo from '@/data/projects.json'

import personalInfo from '@/data/personal.json'  

const name = personalInfo.name
const name_first = name.split(' ')[0]; 
const name_last = name.split(' ')[1];
const city = personalInfo.city
const country = personalInfo.country
const linkedin = personalInfo.linkedin
const github = personalInfo.github


interface CubeData {
  id: number
  size: number
  top: number
  duration: number
  delay: number
  start_left: number
  isHovered: boolean
  project?: any;
}

const theme = useTheme()

// Generate 20 cubes with random parameters once on mount
const cubes = ref<CubeData[]>([])
const maxCubes = 20

onMounted(() => {
  const list: CubeData[] = []
  const totalProjects = projectsInfo.projects_list.length;
  const totalCubes = totalProjects > maxCubes ? totalProjects : maxCubes;
  for (let i = 0; i < totalCubes; i++) {
    list.push({
      id: i,
      size: 30 + Math.random() * 20,    // 10px–30px
      top: Math.random() * 100,         // 0%–100% from top
      start_left: Math.random() * 100,        // 0%–100% from left
      duration: 8 + Math.random() * 6,  // 8s–14s
      delay: Math.random() * 3,         // 0s–3s
      isHovered: false,
      project: totalProjects > maxCubes ? projectsInfo.projects_list[i] : projectsInfo.projects_list[i % totalProjects]
    })
  }
  cubes.value = list

  console.log('Cubes generated:', cubes.value);
})

function getCubeStyle(cube: CubeData) {
  return {
    width: cube.isHovered ? `${2*cube.size}px` : `${cube.size}px` ,
    height: cube.isHovered ? `${2*cube.size}px` : `${cube.size}px`,
    top: `${cube.top}%`,
    right:  '-30px',
    // right: `${cube.start_left}%`,
    position: 'absolute' as const,
    // backgroundColor: theme.current.value.colors.secondary,
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    animationName: 'spinMove',
    animationDuration: `${cube.duration}s`,
    animationDelay: `${cube.delay}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationPlayState: cube.isHovered ? "paused" : "running"
  }
}

function handleCubeClick(cube: CubeData) {
  console.log('Cube clicked:', cube.id)
}





</script>







<style scoped>
.cube-container {
  position: absolute;
  inset: 0;
  z-index:1;           /* behind the card content */
  pointer-events: auto; /* allow hover & click on cubes */
}

.cube {
  display:flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  z-index: 1;}



.cube:hover {
  transform: scale(1.6);
  z-index: 10; /* bring hovered cube above the card */
}
</style>

<!-- Keyframes must be global (unscoped) so inline animationName: 'spinMove' works -->
<style>
@keyframes spinMove {
  0% {
    transform: translateX(0) rotate(0deg);
  }
  100% {
    transform: translateX(-110vw ) rotate(720deg);
  }
}
</style>
