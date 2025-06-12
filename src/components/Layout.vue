<template>
        
        <v-app-bar  app  elevation="0"  hide-on-scroll height="300"  :color="theme.current.value.colors.background">
            <Welcome width="100%" />
        </v-app-bar>
        
        <v-navigation-drawer app permanent border="0" :color="theme.current.value.colors.background">
            <!-- :bg-color="theme.current.value.colors.surface"  -->
            <!-- :bg-color="theme.current.value.colors.surface"  -->
            <v-tabs v-model="tab"
                    bg-color="transparent"
                    direction="vertical" 
                    grow
                    key="tabs"
                    :items="tabs"
                    selected-class="gradient-bg"
                >
                    
                <!-- :base-color="theme.current.value.colors.primary"  -->
                <!-- :active-color="theme.current.value.colors.secondary" -->
                <!-- :base-color="theme.current.value.colors." -->
                <v-tab v-for="(tab, index) in tabs" :key="tab.title" variant="flat" 
                :color="theme.current.value.colors.secondary"
                    base-color="transparent"
                    @click="handleTabChange(index, tab.title)"
                    >
                    <!-- selected-class="gradient-bg" -->
                    {{ tab.title }}
                    </v-tab>
            </v-tabs> 
        </v-navigation-drawer>
    
    
        <v-main id="main-scroll" style="overflow-y:auto">
            <v-sheet :color="theme.current.value.colors.background">

                <Section v-for="tab in tabs" :key="tab.title" 
                ref="sections" 
                :title="tab.title"
                :section-id="slagify(tab.title)"
                />
            </v-sheet>
        </v-main>
    
</template>

<script setup lang="ts">

import Section from './Section.vue'
import { ref, watch, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const route = useRoute()
const router = useRouter()

const theme = useTheme()

const tab = ref<number | null>(null)
const sections = ref<InstanceType<typeof Section>[]>([])
    

const tabs = [
  { text: 'Tab 1', title: 'Tab 1', content: 'Content for Tab 1' },
  { text: 'Tab 2', title: 'Tab 2', content: 'Content for Tab 2' },
  { text: 'Tab 3', title: 'Tab 3', content: 'Content for Tab 3' },
  { text: 'Tab 4', title: 'Tab 4', content: 'Content for Tab 4' },
  { text: 'Tab 5', title: 'Tab 5', content: 'Content for Tab 5' } , 
  { text: 'Tab 6', title: 'Tab 6', content: 'Content for Tab 6' },
  { text: 'Tab 7', title: 'Tab 7', content: 'Content for Tab 7' },
  { text: 'Tab 8', title: 'Tab 8', content: 'Content for Tab 8' },
  { text: 'Tab 9', title: 'Tab 9', content: 'Content for Tab 9' }  
]

watch(tab, (newTab) => {
  console.log('Tab changed to:', newTab);
});

const slagify = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-');
}


function scrollToSection(index: number) {
    console.log("scrolling to: " + index)
    if (sections.value && sections.value[index]) {
        const section = sections.value[index].$el as HTMLElement;
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }    
    }    
}    


let observer: IntersectionObserver | null = null;
let lastIntersectingSectionId: string | null = null;
let ignoreNextHashChange = ref(false);
const suspendObserver = ref(false)


function handleTabChange(index: number, title: string) {
    const sectionId = slagify(tabs[index].title);
    tab.value = index; // Update active tab directly
    scrollToSection(index); // Perform the scroll


    suspendObserver.value = true; // Suspend observer to prevent conflicts during hash change

    if (route.hash !== `#${sectionId}`) {
        ignoreNextHashChange.value = true; // Set the flag
        router.push({ hash: `#${sectionId}` })
            .catch((err) => {
                // Catch navigation errors, e.g., if trying to push same hash repeatedly quickly
                if (err.name !== 'NavigationDuplicated') {
                    console.error("Router push error:", err);
                }
            })
            .finally(() => {
                // Reset the flag after the router operation is complete
                // Use a slight delay to ensure the watcher's next tick has passed
                setTimeout(() => {
                    ignoreNextHashChange.value = false; // Reset the flag
                }, 50);
            });
    }
    setTimeout(() => {
        suspendObserver.value = false
    }, 500);
}

const updateHashFromScroll = (sectionId: string) => {
    if (lastIntersectingSectionId === sectionId) {
        return; // Avoid redundant updates from Intersection Observer
    }

    const index = tabs.findIndex(t => slagify(t.title) === sectionId);
    if (index !== -1) {
        if (tab.value !== index) {
            tab.value = index; // Update active tab
        }

        // Set flag to tell the route.hash watcher to ignore this specific change.
        ignoreNextHashChange.value = true; // Set the flag
        // Update URL hash, using router.replace to avoid cluttering history
        router.replace({ hash: `#${sectionId}` })
            .catch((err) => {
                // Catch navigation errors
                if (err.name !== 'NavigationDuplicated') {
                    console.error("Router replace error:", err);
                }
            })
            .finally(() => {
                // Reset the flag after the router operation is complete
                setTimeout(() => {
                    ignoreNextHashChange.value = false; // Reset the flag
                }, 500);
            });

        lastIntersectingSectionId = sectionId; // Update last known intersecting section
    }
};


const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    // console.log('IntersectionObserver callback fired!');
    // console.log('Entries:', entries); // See what entries are reported

    if(suspendObserver.value)
        return

    let mostVisibleSectionId: string | null = null;
    let maxRatio = 0;

    entries.forEach(entry =>{    
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            mostVisibleSectionId = entry.target.id;
            maxRatio = entry.intersectionRatio;
        }
    });

    if (mostVisibleSectionId && maxRatio > 0.5) {
        updateHashFromScroll(mostVisibleSectionId);
    }
}

onMounted(() => {
    nextTick(() => {
        // Use `sections.value` as the ref for the Section components
        const sectionElements = sections.value.map(comp => comp.$el as HTMLElement)

        if (sectionElements.length > 0) {
            // Corrected root element selector for Intersection Observer
            // const contentAreaElement = document.querySelector('.content-area') as HTMLElement;
            // if (contentAreaElement) {
                observer = new IntersectionObserver(handleIntersection, {
                    root: null, // Observe within the scrollable content area
                    rootMargin: '0px 0px -50% 0px', // When section crosses mid-point of viewport
                    threshold: [0.1, 0.5, 0.9] // Observe at different visibility levels
                });

                sectionElements.forEach(el => observer?.observe(el));
            // } else {
            //     console.warn("Could not find '.content-area' element for IntersectionObserver root.");
            // }


            // Handle initial route hash (e.g., user directly navigated to /#tab-2)
            if (route.hash) {
                const targetId = route.hash.substring(1);
                const index = tabs.findIndex(t => slagify(t.title) === targetId)
                if (index !== -1) {
                    tab.value = index;
                    // The route.hash watcher (with immediate: true) will handle the scroll here.
                    // No need for an additional setTimeout here.
                }
            } else {
                // If no hash, default to the first tab/section and scroll to top
                tab.value = 0;
                const contentArea = document.querySelector('.content-area');
                if (contentArea) {
                    contentArea.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        }
    })
})


onBeforeUnmount(() => {
    observer?.disconnect();
})



watch(() => route.hash, (newHash, oldHash) => {
    // IMPORTANT: This is the crucial check!
    // If ignoreNextHashChange is true, it means we programmatically changed the hash.
    // In this case, we prevent the watcher from reacting to avoid conflicts or redundant actions.
    if (ignoreNextHashChange.value) {
        console.log('Hash changed from', oldHash, 'to', newHash, ' (IGNORED - programmatic change)');
        // The flag will be reset after a short delay by the initiating function (handleTabChange or updateHashFromScroll).
        return;
    }
    console.log('Hash changed from', oldHash, 'to', newHash, ' (NOT ignored)');

    if (newHash && newHash !== oldHash) {
        const targetId = newHash.substring(1);
        const index = tabs.findIndex(t => slagify(t.title) === targetId);
        if (index !== -1) {
            if (tab.value !== index) {
                tab.value = index;
            }
            setTimeout(() => {
                // Use sections.value as the ref for the Section components
                const el = sections.value[index]?.$el as HTMLElement;
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 50);
        }
    }
    else if (!newHash && oldHash) {
        // If hash is cleared (e.g., user navigated to root path)
        tab.value = 0;
        const contentArea = document.querySelector('.content-area');
        if (contentArea) {
            contentArea.scrollTo({ top: 0, behavior: 'smooth' });
        }

    }
}, { immediate: true }) // immediate: true will run the watcher on initial component load




</script> 

<style scoped>
    .gradient-bg {
        background-image: linear-gradient(
            to right,
            rgb(var(--v-theme-secondary)) 0%,
            rgb(var(--v-theme-secondary), 0.1) 30%,
            rgb(var(--v-theme-background)) 100%
        ) !important;
        /* color: rgb(var(--v-theme-secondary)) !important */
        color:beige
    }

</style>