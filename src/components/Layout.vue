<template>
    
    <Welcome width="100%" />
    <div style="display:flex;flex-flow:column;max-width: 100%;height:auto">
        
        <v-row>
            <v-col :cols="calCols[0]">
                <div :class="{ 'floatTabs': showTabsAsFloat , 'stickyTabs': !showTabsAsFloat }"
                >  
                    <v-btn v-if="showToggleTabsBtn" 
                        @click="showTabs=!showTabs" 
                        :icon="showTabs ? 'mdi-chevron-left' : 'mdi-chevron-right'"
                        variant="elevated"
                    >
                    </v-btn>
                    <!-- tabs -->
                    <v-tabs v-model="tab" v-if="showTabs" 
                        style="width:100%"
                        :bg-color="theme.current.value.colors.background"
                        direction="vertical" 
                        key="tabs"
                        :items="tabs"
                        selected-class="gradient-bg"
                        grow
                    >
                        <v-tab v-for="(tab, index) in tabs" :key="tab.title" variant="flat" 
                            :color="theme.current.value.colors.secondary"
                            base-color="transparent"
                            @click="handleTabChange(index, tab.title)"
                        >
                            {{ tab.title }}
                        </v-tab>
                    </v-tabs> 
                </div>
            </v-col>
            <v-col :cols="calCols[1]">
                <v-sheet :color="theme.current.value.colors.background">
                    
                    <component v-for="tab in tabs" :key="tab.title" :is="tab.component"
                        ref="sections" 
                        :title="tab.title"
                        :section-id="slagify(tab.title)"
                    />
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">

import Section from './Section.vue'
import Personal from './Sections/Personal.vue'
import Contact from './Sections/Contact.vue'
import Education from './Sections/Education.vue'
import { ref, watch, onMounted, nextTick, onBeforeUnmount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme, useDisplay } from 'vuetify'

const route = useRoute()
const router = useRouter()

const theme = useTheme()
const display = useDisplay()

const tab = ref<number | null>(null)
const showTabs = ref<boolean>(true)
const showTabsAsFloat = ref<boolean>(false)
const showToggleTabsBtn = ref<boolean>(false)
const sections = ref<InstanceType<typeof Section>[]>([])
    

const tabs = [
  { text: 'Personal Info', title: 'Personal Info', component: Personal },
  { text: 'Contact', title: 'Contact', component: Contact  },
  { text: 'Education', title: 'Education', component: Education  },
  { text: 'Work History', title: 'Work History', component: Section  },
  { text: 'Projects', title: 'Projects', component: Section  },
//   { text: 'Skills', title: 'Skills', component: Section  },
//   { text: 'Certifications', title: 'Certifications', component: Section  },
//   { text: 'Publications', title: 'Publications', component: Section  },
]

watch(tab, (newTab) => {
  console.log('Tab changed to:', newTab);
});

watch(display.name, (newDisplay) => {
    if (newDisplay === 'sm' || newDisplay === 'xs') {
        showTabs.value = false;
        showToggleTabsBtn.value = true;
        showTabsAsFloat.value = true;
    } else {
        showTabs.value = true;
        showToggleTabsBtn.value = false;  
        showTabsAsFloat.value = false;
    }
})

const slagify = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-');
}

const calCols = computed( () => {
    switch (display.name.value) {
        case 'xs':
            return [3, 12];
        case 'sm':
            return [3, 12];
        case 'md':
            return [2, 10];
        case 'lg':
            return [2, 10];
        case 'xl':
            return [2, 10];
        default:
            return [2, 10];
    }
})



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

    .stickyTabs {
        display: flex; 
        height: 60vh; 
        position: sticky; 
        top: 20%; 
        width: 100%;
    }

    .floatTabs {
        position: fixed; /* Changed from fixed to absolute */
        top: 100px; /* Add this line to position the tabs at the bottom */
        left: 0; /* Add this line to align the tabs to the left */
        right: 0; /* Add this line to stretch the tabs across the width */
        z-index: 1000; /* Add this line to ensure the tabs are above other content */
        width: 25%
    }

</style>