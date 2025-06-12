<template>
  <v-card
    height="30vh"
    width="100%"
    class="d-flex justify-center align-center"
    style="position: relative; overflow: hidden;"
    flat
    :color="theme.current.value.colors.background" 
  >
    <div class="cube-container">
      <div
        v-for="cube in cubes"
        :key="cube.id"
        @mouseenter="cube.isHovered=true"
        @mouseleave="cube.isHovered=false"
        class="cube"
        :style="getCubeStyle(cube)"
        @click="() => handleCubeClick(cube)"
      />
    </div>

    <v-card-text 
      class="text-h3 d-flex flex-row align-center justify-center"
      style="z-index: 0; position: relative; text-align: center;"
    >
      <v-avatar size="200" icon="mdi-account" />
      <div class="ml-6 text-left">
        <div class="display-1">BLAH</div>
        <div class="display-1">BLAH</div>
    </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTheme } from 'vuetify'

interface CubeData {
  id: number
  size: number
  top: number
  duration: number
  delay: number
  isHovered: boolean
}

const theme = useTheme()

// Generate 20 cubes with random parameters once on mount
const cubes = ref<CubeData[]>([])

onMounted(() => {
  const list: CubeData[] = []
  for (let i = 0; i < 20; i++) {
    list.push({
      id: i,
      size: 20 + Math.random() * 30,    // 10px–30px
      top: Math.random() * 100,         // 0%–100% from top
      duration: 8 + Math.random() * 6,  // 8s–14s
      delay: Math.random() * 3,         // 0s–3s
      isHovered: false
    })
  }
  cubes.value = list
})

function getCubeStyle(cube: CubeData) {
  return {
    width: cube.isHovered ? `${2*cube.size}px` : `${cube.size}px` ,
    height: cube.isHovered ? `${2*cube.size}px` : `${cube.size}px`,
    top: `${cube.top}%`,
    right:  '-30px',
    position: 'absolute' as const,
    backgroundColor: theme.current.value.colors.secondary,
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
  z-index: 1;           /* behind the card content */
  pointer-events: auto; /* allow hover & click on cubes */
}

.cube {
  z-index: 1;
}

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
    transform: translateX(-110vw) rotate(720deg);
  }
}
</style>
