<template>

    <v-card style="margin:50px auto  50px auto;padding:20px" :id="sectionId"  height="auto" :color="theme.current.value.colors.primary" variant="text">

        <v-card-title>{{ title }} </v-card-title>
        <v-card-subtitle>{{ content.desc }}</v-card-subtitle>
        <v-card-text style="display: flex;flex-flow: column;">
            <v-slide-group>

                <v-card :color="theme.current.value.colors.secondary" variant="outlined" v-for="project in content.projects" :key="project.name" style="min-width:250px;margin:10px;min-height: 300px;">
                    
                    <v-card-title>{{ project.name }}</v-card-title>
                    <v-card-subtitle>{{ project.descr }}</v-card-subtitle>
                    <v-card-text>
                        <v-chip v-for="tag in project.tags" :key="tag" class="ma-1" color="primary" text-color="white">
                            {{ tag }}
                        </v-chip>
                    </v-card-text>
                </v-card>
            </v-slide-group>

            <v-timeline>

                <v-timeline-item v-for="(item, index) in content.projects" :key="index">
                    <v-card>
                        <v-card-title>{{ item.name }}</v-card-title>
                        <v-card-subtitle>{{ item.descr }}</v-card-subtitle>
                    </v-card>
                </v-timeline-item>
            </v-timeline>
        </v-card-text>
    </v-card>

</template>

<script setup lang="ts">
import { useTheme } from 'vuetify/lib/composables/theme';

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



</script>