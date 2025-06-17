<template>

    <v-card :id="sectionId" style="margin:50px auto  50px auto;padding:20px" height="auto" :color="theme.current.value.colors.primary" variant="text">

        <v-card-title>{{ title }} </v-card-title>
        <v-card-subtitle>{{ content.desc }}</v-card-subtitle>
        <v-card-text style="display: flex;flex-flow: column;">
            <template v-for="pr_grp in projectsInfo.groups">

                <v-card-title class="text-uppercase">{{ pr_grp }}</v-card-title>
                <v-slide-group show-arrows="always">
                    <v-card width="200" height="250" :color="theme.current.value.colors.surface" variant="flat" v-for="project in filterProjects(pr_grp)" :key="project.title" style="min-width:250px;margin:10px;min-height: 300px;">
                        
                        <v-card-title>{{ project.title }}</v-card-title>
                        <v-card-subtitle>{{ project.description }}</v-card-subtitle>
                        <v-card-text>
                            <v-chip v-for="tag in project.tags" :key="tag" class="ma-1" color="primary" text-color="white">
                                {{ tag }}
                            </v-chip>
                        </v-card-text>
                    </v-card>
                </v-slide-group>
            </template>
            <template v-if="remainingProjects.length">
                <v-card-title class="text-uppercase">Remaining Projects</v-card-title>
                <v-slide-group show-arrows="always">
                    
                    <v-card width="230"  :color="theme.current.value.colors.surface" variant="flat" v-for="project in remainingProjects" :key="project.title" style="min-width:250px;margin:10px;min-height: 300px;">
                        <v-card-title>{{ project.title }}</v-card-title>
                        <v-card-subtitle>{{ project.description }}</v-card-subtitle>
                        <v-card-text>
                            <v-chip v-for="tag in project.tags" :key="tag" class="ma-1" color="primary" text-color="white">
                                {{ tag }}
                            </v-chip>
                        </v-card-text>
                    </v-card>
                </v-slide-group>

            </template>
        </v-card-text>
    </v-card>

</template>

<script setup lang="ts">
import { useTheme } from 'vuetify/lib/composables/theme';
import projectsInfo from '@/data/projects.json';
import stack from '@/data/stack.json';
import { computed } from 'vue';

const theme = useTheme(); 

const props = defineProps<{
    title?: string,
    sectionId?: string
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