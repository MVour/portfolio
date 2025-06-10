<template>

    <v-container fluid>
        <v-row>

            <v-col cols="3">
                <h1>Welcome to the Main Component</h1>

                <v-tabs v-model="tab" color="primary" 
                    direction="vertical" 
                    grow>
                    
                    <v-tab v-for="tab in tabs" :key="tab.title">{{ tab.title }}</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="9" style="border:2px solid red">
                <section>
                    <Section v-for="tab in tabs" :key="tab.title" :ref="`section:${tab.title}`" />
                
                    
                </section>


                <v-tabs-window v-model="tab">
                    <v-tabs-window-item
                        v-for="item in items"
                        :key="item"
                        :value="item"
                    >
                        <v-card
                        color="basil"
                        flat
                        >
                        <v-card-text>{{ text }}</v-card-text>
                        </v-card>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-col>
        </v-row>
    </v-container>
    
</template>

<script setup>

import Section from './Section.vue'
import { ref, watch } from 'vue'

const length = ref(15)
const tab = ref(null)



const tabs = [
  { title: 'Tab 1', content: 'Content for Tab 1' },
  { title: 'Tab 2', content: 'Content for Tab 2' },
  { title: 'Tab 3', content: 'Content for Tab 3' },
  { title: 'Tab 3', content: 'Content for Tab 3' },
  { title: 'Tab 3', content: 'Content for Tab 3' },
  { title: 'Tab 3', content: 'Content for Tab 3' },
  { title: 'Tab 3', content: 'Content for Tab 3' },
  { title: 'Tab 3', content: 'Content for Tab 3' },
  { title: 'Tab 3', content: 'Content for Tab 3' },
  { title: 'Tab 3', content: 'Content for Tab 3' },
  { title: 'Tab 3', content: 'Content for Tab 3' },
];

watch(tab, (newTab) => {
  console.log('Tab changed to:', newTab);
});

scroll()

</script>