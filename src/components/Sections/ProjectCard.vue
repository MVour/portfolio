<template> 
    
    <v-card class="project-card"  :color="theme.current.value.colors.surface" variant="flat" :key="project.title">
        <template  v-slot:prepend>

            <v-icon size="40" icon="mdi-file-code"> </v-icon>
        </template>
        <template v-slot:title>
            <div class="v-card-title">

                {{ project.title }}
            </div>
        </template>
        <template  v-slot:append >

            <v-btn size="25" :href="project.live_url ? project.live_url : project.repo_url" target="_blank" icon="mdi-open-in-new"> </v-btn>
        </template>


        <v-card-text class="project-card-text">
            <v-row>
                <v-col class="text-justify project-description-text">
                    {{ project.description_short }}
                </v-col>
            </v-row>
        </v-card-text>
        <v-col class="chip-container">
            <v-chip v-for="tag in project.tags" :key="tag" class="ma-1" style="font-size:10px" color="accent" font-size="10" text-color="white">
                {{ tag }}
            </v-chip>
        </v-col>

        <v-card-actions>
        <v-btn
            color="teal-accent-4"
            text="Learn More"
            variant="text"
            @click="reveal = true"
        ></v-btn>
        </v-card-actions>

        <v-expand-transition>
            <v-card v-if="reveal" 
                class="position-absolute w-100"
                height="100%"
                style="bottom: 0;">

                <v-card-title>{{ project.title }}</v-card-title>
                <v-card-text style="max-height:55%;overflow-y: auto;">{{ project.description }}</v-card-text>

                <v-card-actions style="flex-wrap: wrap;align-self: end;margin-top:auto;margin-bottom: 0;bottom: 0;">
                    <v-btn :href="project.repo_url" 
                    color="teal-accent-4" target="_blank">View Repository</v-btn>
                    <v-btn v-if="project.live_url" color="blue" :href="project.live_url" target="_blank">Live Demo</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red"
                        text="Close"
                        variant="text"
                        @click="reveal = false"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-expand-transition>
    </v-card>

</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useTheme } from 'vuetify/lib/composables/theme';

const theme = useTheme();

const reveal = ref(false);


const props = defineProps<{
    project?: {

        title?: string,
        description_short?: string,
        tags?: string[],
        icon?: string,
        description?: string,
        repo_url?: string,
        live_url?: string | null
        
    }
}>()

const project = props.project ?? {
    title: '',
    description_short: '',
    tags: [],
    icon: '',
    description: '',
    repo_url: '',
    live_url: ''
    
};



</script>



<style scoped>

.project-card{
    display:flex;
    flex-direction: column;  /* Added to ensure proper layout */
    min-width:150px;
    width:300px;
    margin:10px;
    height: 350px
    
}


.v-card-title {
    white-space: wrap;
    width:auto;
}


.project-card-text {
    display:flex;
    flex-flow: column;
}

.chip-container {
    font-size: smaller;  /* Reverted to original value */
    margin-top:auto;
    align-self: end;
    display: flex;
    flex-flow: row;
    flex-direction: row-reverse;
    justify-content: center;
    flex-wrap: wrap;
}

.project-description-text {
    overflow: hidden;
    max-height: 250px;
    text-justify: inter-word;
}

.project-description-text:hover {
    overflow: auto;
    height: auto;
}


</style>