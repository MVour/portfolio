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
            <v-row  class="pa-5" style="justify-content: space-between;">
                <v-col >
                <v-chip-group style="justify-self: right;" class="mb-4" column v-model="toggleTimeline" multiple mandatory>
                        <v-chip  v-for="item in ['Education', 'Work']" :key="item" :value="item" variant="elevated"
                        :color="theme.current.value.colors.primary"
                        text-color="white"
                        @click=""
                        >
                        {{ item }}
                    </v-chip>
                </v-chip-group>
                <v-divider class="mb-4"></v-divider>
                    
                <v-timeline class="overflow-y-auto" :side="timelineSide" style="width:auto;"> 
                    <v-timeline-item  v-for="(edu, index) in timelineItems" :key="index">
                        <template v-slot:opposite>
                            {{ edu.year_start }} - {{ edu.year_end }} 
                        </template>
                        <template v-slot:icon>
                            <v-avatar size="70">
                                <v-img :src="getImage(edu.institution.img_path)" />
                            </v-avatar>
                        </template>
                        <v-card style="min-width:300px;width:auto;max-width: 100%;" variant="elevated" class=" pa-4 elevation-5">
                            <v-card-title>{{ edu.degree || edu.role }}</v-card-title>
                            <v-card-subtitle>{{ edu.institution.name }}</v-card-subtitle>
                            <v-card-text>{{ edu.institution.info }}, {{ edu.institution.location }} </v-card-text>
                            <v-card-actions>
                                <v-btn @click="selectEducation(edu)" color="primary">View More</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </v-col>
            <v-divider v-if="edu_selected" vertical></v-divider>
            <v-col>
                <v-card v-if="edu_selected" class="stickyCard" 
                    :title="edu_selected.degree || edu_selected.role"
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
import workHistory from '@/data/work.json'
import { useTheme } from 'vuetify/lib/composables/theme';
import { computed, onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify'
import { watch } from 'vue'

const display = useDisplay();

const timelineSide = computed(() => {
    return display.name.value === 'xs' ? 'end' : 
            display.name.value === 'sm' ? 'end' : undefined;
});

const toggleTimeline = ref<string[]>(['Education', 'Work', ]);

watch(() => toggleTimeline.value, (newValue) => {
    refreshTimelineItems(toggleTimeline.value.includes('Education'), toggleTimeline.value.includes('Work'));
});

const refreshTimelineItems = (useEdu: boolean, useWork: boolean) => {
    
    const combinedItems: TimelineEntry[] = [
        ...(useWork ? workHistory : [] as TimelineEntry[]),
        ...(useEdu ? educationInfo : [] as TimelineEntry[])
    ];

    populateFromAndSortTimelineItems(combinedItems);
};

const populateFromAndSortTimelineItems = (list: TimelineEntry[]) => {

    timelineItems.value = list;

    timelineItems.value.sort((a, b) => {const endDateA = parseMonthYear(a.year_end, true);
        const endDateB = parseMonthYear(b.year_end, true);

        // Primary sort: by year_end in descending order (most recent first)
        const endComparison = endDateB.getTime() - endDateA.getTime();

        if (endComparison !== 0) {
            return endComparison;
        }

        // Secondary sort: if end dates are the same (or both empty/future for ongoing)
        // sort by year_start in descending order
        const startDateA = parseMonthYear(a.year_start, false);
        const startDateB = parseMonthYear(b.year_start, false);
        return startDateB.getTime() - startDateA.getTime();
    });


}


const theme = useTheme(); 

const props = defineProps<{
    title?: string,
    sectionId?: string
}>()


interface TimelineEntry {
    year_start: string; // Now always a string (Mon YYYY or empty)
    year_end: string;   // Now always a string (Mon YYYY or empty)
    institution: {
        name: string;
        full_name: string;
        location: string;
        info: string;
        img_path: string;
        additional_info?: {
            inst_link?: string;
            dpt?: { name: string; link: string; };
            info?: string;
        };
    };
    // Use a union type for properties that differ between Education and Work
    degree?: string; // Optional for WorkEntry
    grade?: string;  // Optional for WorkEntry
    role?: string;   // Optional for EducationEntry
    info?: string;   // Optional for EducationEntry (used in WorkEntry)
}



const timelineItems = ref<TimelineEntry[]>([]);



onMounted(() => {
    refreshTimelineItems(true, true);
});

const parseMonthYear = (dateString: string, isEnd: boolean): Date => {
    if (!dateString) {
        return isEnd ? new Date(9999, 0, 1) : new Date(1, 0, 1); // Future for end, past for start
    }
    // Convert "Mon YYYY" to "YYYY-MM-01" format for Date parsing
    const [monthStr, yearStr] = dateString.split(' ');
    const monthMap: { [key: string]: number } = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const month = monthMap[monthStr];
    const year = parseInt(yearStr);

    if (isNaN(month) || isNaN(year)) {
        // Fallback for invalid dates, place them at the end or beginning
        return isEnd ? new Date(1, 0, 1) : new Date(9999, 0, 1); // Adjust as per desired fallback order
    }
    return new Date(year, month, 1);
};



// Initialize edu_selected as a Ref that can hold an EducationEntry or null
const edu_selected = ref<TimelineEntry | null>(null);


// Function to set the selected education item
function selectEducation(edu: TimelineEntry) {
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

.stickyCard{
    position:sticky;
    height:auto;
    top:25%;
    white-space: wrap;
    min-width:300px;
    width: auto;
    justify-self: center;  overflow: visible !important;
}

.v-card-title {
    white-space: wrap;
    width:auto;
}

</style>