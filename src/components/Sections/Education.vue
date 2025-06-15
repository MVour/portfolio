<template>

    <v-card :id="sectionId"  
        style="margin:50px auto  50px auto;padding:20px;" 
        height="auto" 
        variant="text"
        :color="theme.current.value.colors.primary" 
    >
        <v-card-title>{{ title }} </v-card-title>
        <v-card-subtitle> Education History</v-card-subtitle>
        <v-card-text>
            <v-row class="pa-5" style="justify-content: space-between;">
                <v-col>
                    
                <v-timeline :side="timelineSide" style="width:auto;"> 
                    <v-timeline-item  v-for="(edu, index) in educationInfo" :key="index">
                        <template v-slot:opposite>
                            {{ edu.year_start }} - {{ edu.year_end }}
                        </template>
                        <template v-slot:icon>
                            <v-avatar size="70">
                                <v-img :src="getImage(edu.institution.img_path)" />
                            </v-avatar>
                        </template>
                        <v-card style="min-width:300px;width:auto;max-width: 100%;" variant="elevated" class="pa-4 elevation-5">
                            <v-card-title>{{ edu.degree }}</v-card-title>
                            <v-card-subtitle>{{ edu.institution.name }}</v-card-subtitle>
                            <v-card-text>{{ edu.institution.info }}, {{ edu.institution.location }} </v-card-text>
                            <v-card-actions>
                                <v-btn @click="selectEducation(edu)" color="primary">View More</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </v-col>
            <v-col>
                
                <v-card v-if="edu_selected" style="white-space: wrap;min-width:300px;width: auto;"
                    :title="edu_selected.degree"
                    :subtitle="edu_selected.institution.name || ''"
                >
                    <template v-slot:append>
                        <v-avatar size=74>
                            <v-img :src="getImage(edu_selected.institution.img_path)" />
                        </v-avatar>
                    </template>
                    <v-card-text>
                        <p>{{ edu_selected.institution.info }}</p> 
                        <p>{{ edu_selected.institution.location }}</p> 
                        <p>{{ edu_selected.degree }}</p>
                        <p>{{ edu_selected.grade }}</p> 
                        <p v-if="edu_selected.institution.additional_info?.info">{{ edu_selected.institution.additional_info.info }}</p> 
                        
                        <p v-if="edu_selected.institution.additional_info?.inst_link">
                            <a :href="edu_selected.institution.additional_info.inst_link" target="_blank">Institution Link</a>
                        </p> 
                        
                        <p v-if="edu_selected.institution.additional_info?.dpt?.link">
                            <a :href="edu_selected.institution.additional_info.dpt.link" target="_blank">{{ edu_selected.institution.additional_info.dpt.name }}</a>
                        </p> 
                        
                        <v-btn @click="clearSelection" color="secondary">Close</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
            </v-row>
        </v-card-text>
    </v-card>

</template>

<script setup lang="ts">

import educationInfo from '@/data/education.json'
import { useTheme } from 'vuetify/lib/composables/theme';
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify'


const display = useDisplay();

const timelineSide = computed(() => {
    return display.name.value === 'xs' ? 'end' : 
            display.name.value === 'sm' ? 'end' : undefined;
});


const theme = useTheme(); 

const props = defineProps<{
    title?: string,
    sectionId?: string
}>()


// Define the type for a single education entry
interface EducationEntry {
    year_start: number;
    year_end: number;
    institution: {
        name: string;
        full_name: string;
        location: string;
        info: string;
        img_path: string;
        additional_info?: { // Make optional as it might not always be present
            inst_link?: string;
            dpt?: { name: string; link: string; };
            info?: string;
        };
    };
    degree: string;
    grade: string;
}

// Initialize edu_selected as a Ref that can hold an EducationEntry or null
const edu_selected = ref<EducationEntry | null>(null);


// Function to set the selected education item
function selectEducation(edu: EducationEntry) {
    edu_selected.value = edu;
}

// Function to clear the selection
function clearSelection() {
    edu_selected.value = null;
}


const tabs = [
  { title: 'Tab 1', content: 'Content for Tab 1' },
  { title: 'Tab 2', content: 'Content for Tab 2' },
  { title: 'Tab 3', content: 'Content for Tab 3' },
  { title: 'Tab 4', content: 'Content for Tab 4' },
  { title: 'Tab 5', content: 'Content for Tab 5' },
  { title: 'Tab 6', content: 'Content for Tab 6' },
  { title: 'Tab 7', content: 'Content for Tab 7' },
  { title: 'Tab 8', content: 'Content for Tab 8' },
  { title: 'Tab 9', content: 'Content for Tab 9' },
  { title: 'Tab 10', content: 'Content for Tab 10' },
  { title: 'Tab 11', content: 'Content for Tab 11' },
];


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

function getContent() {
    const tab = tabs.find(t => t.title === props.title);
    return tab ? tab.content : 'NOPE';
}

function getImage(imgPath: string): string {
    try {
        return new URL(`../../assets/${imgPath}`, import.meta.url).href
    } catch (error) {
        console.error('Error loading image:', error);
        return '';
    }
}



</script>

<style scoped>

.v-card-title {
    white-space: wrap;
    width:auto;
}

</style>