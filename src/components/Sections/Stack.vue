<template>

    <v-card :id="sectionId" style="margin:50px auto  50px auto;padding:20px" height="auto" :color="theme.current.value.colors.primary" variant="text">

        <v-card-title>{{ title }} </v-card-title>
        <v-card-text style="display: flex;flex-flow: column;">
            <v-row>
                <v-col cols="12" md="6">
                    <template v-for="techCategory of leftColumnCategories" :key="techCategory">
                        <h3 class="text-h6 mt-6 mb-3 text-primary">{{ techCategory }}</h3> 
                        <v-row dense>
                            <v-col
                                v-for="(item, index) in stackInfo[techCategory as keyof typeof stackInfo]"
                                :key="index"
                                cols="12"    sm="6"       lg="4"       xl="3"
                            >
                                <v-card class="mx-auto pt-3" flat border>  
                                    <v-img
                                        :src="item.img"
                                        :alt="`Image for ${item.name}`"
                                        width="50%"
                                        contain
                                        class="align-self-center"
                                    ></v-img>
                                    
                                    <v-card-title  class="text-subtitle-1 text-center py-1">
                                        {{ item.name }}
                                    </v-card-title>

                                    <v-card-text class="text-center pb-2">
                                        <v-rating
                                            :model-value="item.rate"
                                            readonly
                                            density="compact"
                                            size="small"
                                            class="justify-center"
                                        ></v-rating>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12" md="6" class="">
                    <template v-for="techCategory of rightColumnCategories" :key="techCategory">
                        <h3 class="text-h6 mt-6 mb-3 text-primary">{{ techCategory }}</h3> 
                        <v-row dense>
                            <v-col
                                v-for="(item, index) in stackInfo[techCategory as keyof typeof stackInfo]"
                                :key="index"
                                cols="12" sm="6" lg="4" xl="3"
                            >
                                <v-card class="mx-auto" flat border>
                                    <v-img
                                        :src="item.img"
                                        :alt="`Image for ${item.name}`"
                                        
                                        class="align-self-center"
                                        width="50%"
                                        ></v-img>

                                    <v-card-title class="text-subtitle-1 text-center py-1">
                                        {{ item.name }}
                                    </v-card-title>

                                    <v-card-text class="text-center pb-2">
                                        <v-rating
                                            :model-value="item.rate"
                                            readonly
                                            density="compact"
                                            size="small"
                                            class="justify-center"
                                        ></v-rating>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify/lib/composables/theme';
import stackInfo from '@/data/stack.json'

// Define the type for stackInfo
type StackInfoInterface = {
  [key: string]: {
    name: string;
    img: string;
    description: string;
    comments: string;
    rate: number;
  }[];
};

// Explicitly type stackInfo
// const stackInfo: StackInfoInterface = stackInfo;
import { computed } from 'vue';

const theme = useTheme(); 

const props = defineProps<{
    title?: string,
    sectionId?: string
}>()



// Get all category names from stackInfo
const allCategories = computed(() => Object.keys(stackInfo));

// Computed properties to split categories for the two main columns
const leftColumnCategories = computed(() => {
  const half = Math.ceil(allCategories.value.length / 2); // Calculate roughly half
  return allCategories.value.slice(0, half); // First half of categories
});

const rightColumnCategories = computed(() => {
  const half = Math.ceil(allCategories.value.length / 2); // Calculate roughly half
  return allCategories.value.slice(half); // Second half of categories
});



</script>



<style scoped>
/* Scoped styles remain similar, affecting the individual cards and titles */
.v-card-title {
    word-break: normal;
}

.v-card {
  min-height: 220px; /* Ensure a consistent minimum height for individual tech cards */
  display: flex;
  /* max-width: 350px; */
  flex-direction: column;
}

.v-card .v-card-text {
  flex-grow: 1; /* Allow the text area to expand */
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Push rating/icon to bottom if desired */
}

</style>