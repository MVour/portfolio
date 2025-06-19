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
      class="text-h3 d-flex flex-row align-center justify-center "
      style="position: relative; text-align: center;flex-wrap: wrap;"
    >
      <div class="logo-container">
        <v-avatar  class="page-logo" style="z-index:3"  size="300">
          <v-img  :src="selfImg" alt="selfImg"></v-img>
        </v-avatar>
        <div  class="ml-6 text-left page-logo" style="z-index:3; display:flex; flex-direction: column;justify-content: end;">
          <div class="display-1 ">{{ name_first }}</div>
          <div class="display-1 ">{{ name_last }}</div>
          <div class="text-h6 font-weight-thin font-italic job">{{ job_title }}</div>
        </div>
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
const job_title = personalInfo.job_title;


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




.logo-container {
  position: relative;
  display:flex;
  flex-flow: row wrap;
  &:before {
    content:  "";
    position: absolute;
    top:      calc( 100% - 2px );
    width:    100%;
    height:   4px;
    background-color: #3949AB;
    transform-origin: center center;
    transform: scaleX( 0 );
    
    animation: line-animation 5s ease 1;
  }
  
  .page-logo {
    font: bold 6rem 'Arial', sans-serif;
    
    animation: clip-path-reveal-1 5s ease 1;
    /* animation: cubic-bezier(1, 0, 0, 1) 5s infinite;   */
  }
}

@keyframes line-animation {
  0% { transform: scaleX( 0 ); }
  15% { transform: scaleX( 0 ); }
  20%, 25% { transform: scaleX( 1 ); top: calc( 100% - 2px ); }
  50% { transform: scaleX( 1 ); top: 0px; }
  70% { transform: scaleX( 0.2 ); top: 0px; }
  80%, 100% { transform: scaleX( 0.2 ); top: 0px; }
}

@keyframes clip-path-reveal-1 {
  0%, 25% { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%); }
  50% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
}


.job {
  animation: glitch 3s infinite; /* Added duration and iteration count */
  color: white; /* Added color property for better visibility */
}

@keyframes glitch { 
  0% { text-shadow: 3px 0 0 red, -3px 0 0 #0c33f5; filter: blur(0);}
  1% { text-shadow: 3px 0 0 red, -3px 0 0 #0c33f5; filter: blur(0);}
  2% { text-shadow: 3px 0 0 red, -3px 0 0 #0c33f5; filter: blur(0);}
  3% { text-shadow: 3px 0 0 red, -3px 0 0 #0c33f5; filter: blur(0);}
  4% { text-shadow: 3px 0 0 red, -3px 0 0 #0c33f5; filter: blur(0);}
  5% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  6% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  7% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  8% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  9% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  10% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  11% { text-shadow: 1px 0 0 red, -1px 0 0 lime; filter: blur(0.5px);}
  12% { text-shadow: 1px 0 0 red, -1px 0 0 lime; filter: blur(0.5px);}
  13% { text-shadow: 1px 0 0 red, -1px 0 0 lime; filter: blur(0.5px);}
  14% { text-shadow: 1px 0 0 red, -1px 0 0 lime; filter: blur(0);}
  15% { text-shadow: 1px 0 0 red, -1px 0 0 lime; filter: blur(0);}
  16% { text-shadow: -3px 0 0 red, 3px 0 0 lime; filter: blur(0);}
  17% { text-shadow: -3px 0 0 red, 3px 0 0 lime; filter: blur(0);}
  18% { text-shadow: -3px 0 0 red, 3px 0 0 lime; filter: blur(0);}
  19% { text-shadow: -3px 0 0 red, 3px 0 0 lime; filter: blur(0);}
  20% { text-shadow: -3px 0 0 red, 3px 0 0 lime; filter: blur(0);}
  21% { text-shadow: 0.8px 0 0 #0c33f5, -0.8px 0 0 lime; filter: blur(0);}
  22% { text-shadow: 0.8px 0 0 #0c33f5, -0.8px 0 0 lime; filter: blur(0);}
  23% { text-shadow: 0.8px 0 0 #0c33f5, -0.8px 0 0 lime; filter: blur(0);}
  24% { text-shadow: 0.8px 0 0 #0c33f5, -0.8px 0 0 lime; filter: blur(0);}
  25% { text-shadow: 0.8px 0 0 #0c33f5, -0.8px 0 0 lime; filter: blur(0);}
  26% { text-shadow: 0.8px 0 0 #0c33f5, -0.8px 0 0 lime; filter: blur(0.5px);}
  27% { text-shadow: 0.8px 0 0 #0c33f5, -0.8px 0 0 lime; filter: blur(0.5px);}
  28% { text-shadow: 0.8px 0 0 #0c33f5, -0.8px 0 0 lime; filter: blur(0);}
  29% { text-shadow: 0.8px 0 0 #0c33f5, -0.8px 0 0 lime; filter: blur(0);}
  30% { text-shadow: 0.8px 0 0 #0c33f5, -0.8px 0 0 lime; filter: blur(0);}
  31% { text-shadow: -3px 0 0 #0c33f5, 3px 0 0 lime; filter: blur(0);}
  32% { text-shadow: -3px 0 0 #0c33f5, 3px 0 0 lime; filter: blur(0);}
  33% { text-shadow: -3px 0 0 #0c33f5, 3px 0 0 lime; filter: blur(0);}
  34% { text-shadow: -3px 0 0 #0c33f5, 3px 0 0 lime; filter: blur(0);}
  35% { text-shadow: -3px 0 0 #0c33f5, 3px 0 0 lime; filter: blur(0.5px);}
  36% { text-shadow: -3px 0 0 #0c33f5, 3px 0 0 lime; filter: blur(0.5px);}
  37% { text-shadow: -3px 0 0 #0c33f5, 3px 0 0 lime; filter: blur(0.5px);}
  38% { text-shadow: -3px 0 0 #0c33f5, 3px 0 0 lime; filter: blur(0);}
  39% { text-shadow: -3px 0 0 #0c33f5, 3px 0 0 lime; filter: blur(0);}
  40% { text-shadow: -3px 0 0 #0c33f5, 3px 0 0 lime; filter: blur(0);}
  41% { text-shadow: 45px 0 0 #0c33f5, -45px 0 0 lime; filter: blur(0);}
  42% { text-shadow: 0 0 0 #0c33f5, 0 0 0 lime; filter: blur(0);}
  43% { text-shadow: 1px 0 0 red, -1px 0 0 lime; filter: blur(0);}
  44% { text-shadow: 1px 0 0 red, -1px 0 0 lime; filter: blur(0);}
  45% { text-shadow: 1px 0 0 red, -1px 0 0 lime; filter: blur(0);}
  46% { text-shadow: 1px 0 0 red, -1px 0 0 lime; filter: blur(0.5px);}
  47% { text-shadow: -3px 0 0 red, 3px 0 0 lime; filter: blur(0.5px);}
  48% { text-shadow: -3px 0 0 red, 3px 0 0 lime; filter: blur(0);}
  49% { text-shadow: -3px 0 0 red, 3px 0 0 lime; filter: blur(0);}
  50% { text-shadow: -3px 0 0 red, 3px 0 0 lime; filter: blur(0);}
  51% { text-shadow: 3px 0 0 red, -3px 0 0 #0c33f5; filter: blur(0);}
  52% { text-shadow: 3px 0 0 red, -3px 0 0 #0c33f5; filter: blur(0);}
  53% { text-shadow: 3px 0 0 red, -3px 0 0 #0c33f5; filter: blur(0);}
  54% { text-shadow: 3px 0 0 red, -3px 0 0 #0c33f5; filter: blur(0);}
  55% { text-shadow: 3px 0 0 red, -3px 0 0 #0c33f5; filter: blur(0.5px);}
  56% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0.5px);}
  57% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0.5px);}
  58% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  59% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  60% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  61% { text-shadow: 30px 0 0 red, -30px 0 0 lime; filter: blur(0);}
  62% { text-shadow: 0 0 0 red, 0 0 0 lime; filter: blur(0);}
  63% { text-shadow: 1px 0 0 red, -1px 0 0 #0c33f5; filter: blur(0);}
  64% { text-shadow: 1px 0 0 red, -1px 0 0 #0c33f5; filter: blur(0);}
  65% { text-shadow: 1px 0 0 red, -1px 0 0 #0c33f5; filter: blur(0);}
  66% { text-shadow: 1px 0 0 red, -1px 0 0 #0c33f5; filter: blur(0.5px);}
  67% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0.5px);}
  68% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  69% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  70% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  71% { text-shadow: 50px 0 0 red, -50px 0 0 #0c33f5; filter: blur(0);}
  72% { text-shadow: 0 0 0 red, 0 0 0 #0c33f5; filter: blur(0);}
  73% { text-shadow: 3px 0 0 red, -3px 0 0 #0c33f5; filter: blur(0);}
  74% { text-shadow: 3px 0 0 red, -3px 0 0 #0c33f5; filter: blur(0);}
  75% { text-shadow: 3px 0 0 red, -3px 0 0 #0c33f5; filter: blur(0);}
  76% { text-shadow: 3px 0 0 red, -3px 0 0 #0c33f5; filter: blur(0);}
  77% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  78% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  79% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  80% { text-shadow: -3px 0 0 red, 3px 0 0 #0c33f5; filter: blur(0);}
  81% { text-shadow: 1px 0 0 red, -1px 0 0 lime; filter: blur(0);}
  82% { text-shadow: 1px 0 0 red, -1px 0 0 lime; filter: blur(0);}
  83% { text-shadow: 1px 0 0 red, -1px 0 0 lime; filter: blur(0.5px);}
  84% { text-shadow: 1px 0 0 red, -1px 0 0 lime; filter: blur(0.5px);}
  85% { text-shadow: 1px 0 0 red, -1px 0 0 lime; filter: blur(0.5px);}
  86% { text-shadow: -3px 0 0 red, 3px 0 0 lime; filter: blur(0.5px);}
  87% { text-shadow: -3px 0 0 red, 3px 0 0 lime; filter: blur(0.5px);}
  88% { text-shadow: -3px 0 0 red, 3px 0 0 lime; filter: blur(0);}
  89% { text-shadow: -3px 0 0 red, 3px 0 0 lime; filter: blur(0);}
  90% { text-shadow: -3px 0 0 red, 3px 0 0 lime; filter: blur(0);}
  91% { text-shadow: 60px 0 0 lime, -60px 0 0 #0c33f5; filter: blur(0);}
  92% { text-shadow: 0 0 0 lime, 0 0 0 #0c33f5; filter: blur(0);}
  92% { text-shadow: 0.8px 0 0 #0c33f5, -0.8px 0 0 lime; filter: blur(0);}
  93% { text-shadow: 0.8px 0 0 #0c33f5, -0.8px 0 0 lime; filter: blur(0);}
  94% { text-shadow: 0.8px 0 0 #0c33f5, -0.8px 0 0 lime; filter: blur(0);}
  95% { text-shadow: 0.8px 0 0 #0c33f5, -0.8px 0 0 lime; filter: blur(0);}
  96% { text-shadow: -3px 0 0 #0c33f5, 3px 0 0 lime; filter: blur(0);}
  97% { text-shadow: -3px 0 0 #0c33f5, 3px 0 0 lime; filter: blur(0);}
  98% { text-shadow: -3px 0 0 #0c33f5, 3px 0 0 lime; filter: blur(0);}
  99% { text-shadow: -3px 0 0 #0c33f5, 3px 0 0 lime; filter: blur(0);}
  100% { text-shadow: -3px 0 0 #0c33f5, 3px 0 0 lime; filter: blur(0);} 
}

</style>
