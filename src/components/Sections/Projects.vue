<template>

    <v-card :id="sectionId"height="auto" style="" :color="theme.current.value.colors.primary" variant="text">

        <template v-slot:prepend>

            <v-avatar size="48">
                <v-icon size="34">{{ icon }}</v-icon>
            </v-avatar>
        </template>
        <template v-slot:title>

                {{ title }}
        </template>
        <v-card-text style="display: flex;flex-flow: column;">
            
            <template v-for="pr_grp in projectsInfo.groups">
                <template v-if="filterProjects(pr_grp).length">
                    <v-card-subtitle class="text-uppercase">{{ pr_grp }}</v-card-subtitle>
                    <v-slide-group show-arrows="desktop" >
                        <ProjectCard v-for="project in filterProjects(pr_grp)" :key="project.title" :project="project" />
                    </v-slide-group>
                </template>
            </template>
            <template v-if="remainingProjects.length">
                <v-card-subtitle class="text-uppercase">Remaining Projects</v-card-subtitle>
                <v-slide-group show-arrows="desktop" center-active>

                    
                    <ProjectCard 
                        v-for="project in remainingProjects" 
                        :key="project.title" 
                        :project="project" 
                    />
                    
                </v-slide-group>

            </template>
        </v-card-text>
    </v-card>

</template>

<script setup lang="ts">
import { useTheme } from 'vuetify/lib/composables/theme';
import projectsInfo from '@/data/projects.json';
import ProjectCard from './ProjectCard.vue';
import stack from '@/data/stack.json';
import { computed } from 'vue';

const theme = useTheme(); 

const props = defineProps<{
    title?: string,
    sectionId?: string,
    icon?: string
}>()


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


function filterProjects(pr_grp: string) {
    return projectsInfo.projects_list.filter(project => project.tags.includes(pr_grp));
}


const remainingProjects = computed(() => {
    //project tags do not include any value from projectsInfo.groups

    return projectsInfo.projects_list.filter(project => 
        !project.tags.some(tag => projectsInfo.groups.includes(tag))
    );
});

</script>

<style scoped>
/* Add your styles here */


</style>
