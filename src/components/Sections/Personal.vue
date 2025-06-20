<template>

    <v-card :id="sectionId"  
        height="auto" 
        variant="text"
        >
        <template v-slot:prepend>

                <v-avatar size="48">
                    <v-icon size="34">{{ icon }}</v-icon>
                </v-avatar>
        </template>
        <template v-slot:title >
            <div :style="{
                    color: theme.current.value.colors.primary,
                }">
                
                {{ title }}
            </div>
        </template>
        <v-divider></v-divider>
        <v-card-text class="text-justify text-h6 font-weight-light centered-card-text" >
            {{ personalInfo.info }}
            <v-divider style="border: 1px solid yellow;" class="ma-2"></v-divider>
            <div>{{ personalInfo.job_title }}</div>
            <v-divider class="ma-2"></v-divider>
            <div>{{ personalInfo.city }}, {{ personalInfo.country }}</div>
        </v-card-text>
    </v-card>

</template>

<script setup lang="ts">
import { useTheme } from 'vuetify/lib/composables/theme';
import personalInfo from '@/data/personal.json'




const theme = useTheme(); 

const props = defineProps<{
    title?: string,
    sectionId?: string,
    icon?: string
}>()


const content = {
    desc: 'This is a description for the section.',
    projects: [
        {name: "Some name", descr: "some descr", icon: "some icon", tags: ["tag1", "tag2"]},
        {name: "Another name", descr: "another descr", icon: "another icon", tags: ["tag3", "tag4"]},
        {name: "Third name", descr: "third descr", icon: "third icon", tags: ["tag5", "tag6"]},
        {name: "Fourth name", descr: "fourth descr", icon: "fourth icon", tags: ["tag7", "tag8"]},
        {name: "Fifth name", descr: "fifth descr", icon: "fifth icon", tags: ["tag9", "tag10"]},
        {name: "Sixth name", descr: "sixth descr", icon: "sixth icon", tags: ["tag11", "tag12"]},
        {name: "Seventh name", descr: "seventh descr", icon: "seventh icon", tags: ["tag13", "tag14"]},
        {name: "Eighth name", descr: "eighth descr", icon: "eighth icon", tags: ["tag15", "tag16"]},
        {name: "Ninth name", descr: "ninth descr", icon: "ninth icon", tags: ["tag17", "tag18"]},
        {name: "Tenth name", descr: "tenth descr", icon: "tenth icon", tags: ["tag19", "tag20"]},

    ]
}



</script>



<style scoped>
    .centered-card-text {
        text-align: center;
        
        margin-left: auto;
        display: flex;
        flex-flow: column;
        /* justify-items: center; */
        /* align-items: center; */
    }

</style>