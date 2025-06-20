<template>
    
    <Welcome width="100%" />
    <v-row style="margin:0"  >
        <v-col :cols="calCols[0]" >
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
                    style="width:auto"
                    :bg-color="theme.current.value.colors.background"
                    direction="vertical" 
                    key="text"
                    :items="tabs"
                    selected-class="gradient-bg"
                    grow
                >
                    <v-tab v-for="(tab, index) in tabs" :key="tab.text" variant="flat" style="white-space: normal;word-break: break-word ;"
                        :value="tab.text"
                        :color="theme.current.value.colors.primary"
                        base-color="transparent"
                        :prepend-icon="tab.icon"
                        @click="handleTabChange(index, tab.title)"
                >
                        <!-- {{ tab.title }} -->
                    </v-tab>
                </v-tabs> 
            </div>
        </v-col>


        <v-col :cols="calCols[1]" class="main-col" style="padding: 0;">
            <component v-for="tab in tabs" :key="tab.text" :is="tab.component"  
            ref="sections" 
            :style="mediaSectionStyle"
            :value="tab.title"
            :title="tab.title"
            :section-id="slagify(tab.title)" style="overflow:visible;"
            :icon="tab.icon"
            />
        </v-col>
    </v-row>
    
    <v-footer height="20vh" class="mt-10 text-center d-flex flex-column ga-2 py-4" :color="theme.current.value.colors.secondary">

        <v-spacer></v-spacer>
        <v-divider class="my-2" thickness="2" width="50"></v-divider>



        <div>
            {{ new Date().getFullYear() }} — <strong> {{ personalInfo.name }} </strong>
        </div>
    </v-footer>
</template>

<script setup lang="ts">

import Section from './Section.vue'
import Personal from './Sections/Personal.vue'
import Contact from './Sections/Contact.vue'
import History from './Sections/History.vue'
import Projects from './Sections/Projects.vue'
import Stack from './Sections/Stack.vue' 
import CertsPubs from './Sections/CertsPubs.vue'
import { ref, watch, onMounted, nextTick, onBeforeUnmount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTheme, useDisplay } from 'vuetify'

import personalInfo from '@/data/personal.json'

const route = useRoute()
const router = useRouter()

const theme = useTheme()
const display = useDisplay()

const tab = ref<number | null>(null)
const showTabs = ref<boolean>(true)
const showTabsAsFloat = ref<boolean>(false)
const showToggleTabsBtn = ref<boolean>(false)

const sections = ref<InstanceType<typeof Section | typeof Personal | typeof Contact | typeof History>[]>()
    

const tabs = [
    { icon: "mdi-tooltip-account", text: 'Personal Info', title: 'Personal Info', component: Personal },
    // { icon: "mdi-phone", text: 'Contact', title: 'Contact', component: Contact  },
    // { icon: "mdi-book-open", text: 'History', title: 'Education & Work History', component: History  },
    { icon: "mdi-folder", text: 'Projects', title: 'Projects', component: Projects  },
    { icon: "mdi-briefcase", text: 'Skills', title: 'Skills', component: Stack  },
    { icon: "mdi-file-document", text: 'Publications & Certifications', title: 'Publications & Certifications', component: CertsPubs  },
]


watch(display.name, (newDisplay) => {
    setDisplayChanges();
})



const setDisplayChanges = () => {
    if (display.name.value === 'sm' || display.name.value === 'xs') {
        showTabs.value = false;
        showToggleTabsBtn.value = true;
        showTabsAsFloat.value = true;
    } else {
        showTabs.value = true;
        showToggleTabsBtn.value = false;  
        showTabsAsFloat.value = false;
    }
}

const slagify = (text: string) => {
    return text.toLowerCase()
               .replace(/&\s+/g, '-')
               .replace(/\s+/g, '-') 
               .replace(/[^a-z0-9-]/g, '') 
               .replace(/^-+|-+$/g, '');  
}

const calCols = computed( () => {
    switch (display.name.value) {
        case 'xs':
            return [1, 12];
        case 'sm':
            return [1, 12];
        case 'md':
            return [1, 11];
        case 'lg':
            return [1, 11];
        case 'xl':
            return [1, 11];
        default:
            return [1, 11];
    }
})

const mediaSectionStyle = computed(() => {
    switch (display.name.value) {
        case 'xs':
            return {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            };
    
        case 'sm':
            return {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            };

        case 'md':
            return {
                width: '100%',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                margin: '50px 22.5vw 50px auto',
            };

        case 'lg':
            return {
                width: '55vw',
                margin: '50px 22.5vw 50px auto',
            };

        case 'xl':
            return {
                width: '55vw',
                margin: '50px 22.5vw 50px auto',
            };
        default:
            return {};
    }
});


function scrollToSection(index: number) {
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
    tab.value = index;
    if (!ignoreNextHashChange.value)
        scrollToSection(index); 


    suspendObserver.value = true;

    if (route.hash !== `#${sectionId}`) {
        ignoreNextHashChange.value = true; 
        router.push({ hash: `#${sectionId}` })
            .catch((err) => {
                if (err.name !== 'NavigationDuplicated') {
                    console.error("Router push error:", err);
                }
            })
            .finally(() => {
                setTimeout(() => {
                    ignoreNextHashChange.value = false;
                }, 50);
            });
    }
    setTimeout(() => {
        suspendObserver.value = false
    }, 500);
}

const updateHashFromScroll = (sectionId: string) => {
    // console.log(sectionId);
    if (lastIntersectingSectionId === sectionId) {
        return; 
    }

    const index = tabs.findIndex(t => slagify(t.title) === sectionId);
    if (index !== -1) {
        if (tab.value !== index) {
            tab.value = index;
        }

        ignoreNextHashChange.value = true; 
        router.replace({ hash: `#${sectionId}` })
            .catch((err) => {
                if (err.name !== 'NavigationDuplicated') {
                    console.error("Router replace error:", err);
                }
            })
            .finally(() => {
                setTimeout(() => {
                    ignoreNextHashChange.value = false;
                }, 500);
            });

        lastIntersectingSectionId = sectionId;
    }
};


const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    // console.log('IntersectionObserver callback fired!');
    if(suspendObserver.value) {
        // console.groupEnd();
        return;
    }

    let mostRelevantSectionId: string | null = null;
    let minTop = Infinity; // To find the section whose top is highest in the viewport

    entries.forEach(entry => {
        // console.log(`  Entry: ID=${entry.target.id}, isIntersecting=${entry.isIntersecting}, intersectionRatio=${entry.intersectionRatio.toFixed(2)}`);

        if (entry.isIntersecting) {
            const rect = entry.boundingClientRect;
            if (rect.top < minTop) {
                minTop = rect.top;
                mostRelevantSectionId = entry.target.id;
            }
        }
    });

    // console.log(`  Decided section for this cycle: ${mostRelevantSectionId}`);

    if (mostRelevantSectionId) {
        // Check if the current hash is already this section, to avoid unnecessary updates
        const currentHashId = window.location.hash.substring(1);
        if (currentHashId !== mostRelevantSectionId) {
            // console.log(`  Calling updateHashFromScroll with: ${mostRelevantSectionId}`);
            updateHashFromScroll(mostRelevantSectionId);
        } else {
            // console.log(`  Hash already matches ${mostRelevantSectionId}.`);
        }
    } else {
        // console.log(`  No section currently intersecting the central line.`);
    }
}

onMounted(() => {
    setDisplayChanges(); // Set initial display state based on current screen size,
    nextTick(() => {
        const sectionElements = sections.value ? sections.value.map(comp => comp.$el as HTMLElement) : []
        if (sectionElements.length > 0) {
            
                observer = new IntersectionObserver(handleIntersection, {
                    root: null, 
                    rootMargin: '-49% 0px -49% 0px',
                });

                sectionElements.forEach(el => {
                    observer?.observe(el);
                });

            if (route.hash) {
                const targetId = route.hash.substring(1);
                const index = tabs.findIndex(t => slagify(t.title) === targetId)
                if (index !== -1) {
                    tab.value = index;
                }
            } else {
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
    if (ignoreNextHashChange.value) {
        return;
    }

    if (newHash && newHash !== oldHash) {
        const targetId = newHash.substring(1);
        const index = tabs.findIndex(t => slagify(t.title) === targetId);
        if (index !== -1) {
            if (tab.value !== index) {
                tab.value = index;
            }
            setTimeout(() => {
                const el = sections.value && sections.value[index]?.$el as HTMLElement;
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 50);
        }
    }
    else if (!newHash && oldHash) {
        tab.value = 0;
        const contentArea = document.querySelector('.content-area');
        if (contentArea) {
            contentArea.scrollTo({ top: 0, behavior: 'smooth' });
        }

    }
}, { immediate: true }) 




</script> 

<style scoped>

    .gradient-bg {
        /* background-image: linear-gradient(
            to right,
            rgb(var(--v-theme-secondary)) 0%,
            rgb(var(--v-theme-secondary), 0.1) 30%,
            rgb(var(--v-theme-background)) 100%
        ) !important;
        color: rgb(var(--v-theme-secondary)) !important
        color:beige */
    }

    .main-col{
        /* max-width: 55vw; */
        /* border:2px solid red; */
        /* display:inline-flex;
        flex-direction: column;
        padding: 20px; */
        /* align-items: flex-start; */
        /* justify-self: center; */
        /* align-self: center; */
    }
    /* justify-content: left; */

    .stickyTabs {
        display: flex; 
        height: 60vh; 
        position: sticky; 
        top: 20%; 
        width: 100%;
    }

    .floatTabs {
        position: fixed; 
        top: 100px; 
        left: 0; 
        right: 0;
        z-index: 1000;
        width: 25%
    }

</style>