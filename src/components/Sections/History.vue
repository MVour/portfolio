<template>

    <v-card :id="sectionId" style=""
        height="auto" 
        variant="text"
        :color="theme.current.value.colors.primary" 
    >
        <template v-slot:prepend>

                <v-avatar size="48">
                    <v-icon size="34">{{ icon }}</v-icon>
                </v-avatar>
        </template>
        <template v-slot:title>
                {{ title }}
        </template>
        <v-card-subtitle> Education History</v-card-subtitle>
        <v-card-text style="display: flex;flex-flow:column;">
                <!-- <v-col  > -->
                    <v-chip-group class="mb-4" column v-model="toggleTimeline" multiple mandatory>
                            <v-chip  v-for="item in ['Education', 'Work']" :key="item" :value="item" variant="elevated"
                            :color="theme.current.value.colors.accent"
                            text-color="white"
                            @click=""
                            >
                            {{ item }}
                        </v-chip>
                    </v-chip-group>
                    <v-divider :thickness="3" ></v-divider>                        
                    <v-timeline class="" :side="timelineSide" style="width: 100%;"> 
                        <v-timeline-item v-for="(edu, index) in timelineItems" :key="index">
                            <template v-slot:opposite>
                                <div class="text-sm-b2  ma-0 pa-0 font-weigh-medium" style="width:auto;display:flex;flex-flow:column;flex-wrap:wrap;align-items: center;justify-content:center;">
                                    <span>
                                        {{ edu.year_start }}
                                    </span>
                                    <span>
                                        -
                                    </span>
                                    <span>
                                        {{ edu.year_end }} 
                                    </span>
                                </div>
                            </template>
                            <template v-slot:icon>
                                <v-avatar :size="iconSizeMedia">
                                    <v-img :src="getImage(edu.institution.img_path)" />
                                </v-avatar>
                            </template>
                            <v-card :width="cardWidthMedia" style="overflow:visible;" variant="elevated" class=" pa-4 elevation-5">
                                <v-icon size="40"  style="position:absolute; top:-20px;left:5%;" 
                                    :icon="edu.degree ? 'mdi-school' : 'mdi-domain'">
                                </v-icon>
                                
                                <v-card-title>{{ edu.degree || edu.role }}</v-card-title>
                                <v-card-subtitle>{{ edu.institution.name }} {{ edu.institution.additional_info?.dpt?.name ? ' || ' + edu.institution.additional_info.dpt.name : '' }}</v-card-subtitle>
                                <v-card-text>
                                    {{ edu.institution.info }}, {{ edu.institution.location }}

                                    <v-row class="" v-if="['xl', 'lg', 'xxl'].includes(display.name.value) && edu.achievements?.length">
                                        <v-col cols="12">
                                            <v-divider class="ma-2"></v-divider>
                                            <h4 :style="{color: theme.current.value.colors.accent}"> Personal achievements:<br><br></h4>
                                            <p > 
                                            </p>
                                                <ul>
                                                    <li v-for="ach in edu?.achievements" :key="ach">{{ ach }}
                                                    <br><br>
                                                </li>
                                                </ul> 
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn @click="selectEducation(edu)" color="primary">View More</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-timeline-item>
                    </v-timeline>
                <!-- </v-col> -->
            <v-divider v-if="edu_selected" vertical></v-divider>
            <v-dialog v-model="showDetails" max-width="600px">

                <v-card max-height="70vh" >

                    <v-card-title>{{ edu_selected?.degree || edu_selected?.role }}</v-card-title>
                    <v-card-subtitle>{{ edu_selected?.institution.name || '' }}</v-card-subtitle>
                    <v-card-text style="overflow-y: auto;" >
                            <!-- <p>{{ edu_selected?.institution.location }}</p>  -->
                            
                        <p v-if="edu_selected?.institution.additional_info?.info">{{ edu_selected?.institution.additional_info.info }}</p> 
                        <v-row class="" v-if="['xs', 'sm', 'md'].includes(display.name.value)">
                            <v-col cols="12">
                                <v-divider class="ma-2"></v-divider>
                                <h5> Personal achievements:<br><br></h5>
                                <p v-for="ach in edu_selected?.achievements" :key="ach"> 
                                    ~ {{ ach }} <br><br></p>
                            </v-col>
                        </v-row>


                    </v-card-text>
                            
                        
                    <v-card-actions>
                        <v-btn style="align-self: flex-start;justify-self: flex-start;" v-if="edu_selected?.institution.additional_info?.dpt?.link"
                            :href="edu_selected?.institution.additional_info.dpt.link"
                            target="_blank"
                        >
                            {{ edu_selected.institution.additional_info.dpt.name }}
                        </v-btn>

                        <v-btn color="accent" v-if="edu_selected?.institution.additional_info?.inst_link"
                            :href="edu_selected?.institution.additional_info.inst_link"
                            target="_blank"
                        >
                            Visit website
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn @click="clearSelection" :color="theme.current.value.colors.error">Close</v-btn> 
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- <v-drawer>
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
                        
                        
                        
                        <v-btn @click="clearSelection" color="secondary">Close</v-btn>
                    </v-card-text>
                </v-card>
            </v-drawer> -->
            
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


const cardWidthMedia = computed(() => {
    return display.name.value === 'xs' ? '200px' : 
           display.name.value === 'sm' ? '200px' : 
           display.name.value === 'md' ? '400px' : 
           display.name.value === 'lg' ? '400px' : 
           display.name.value === 'xl' ? '500px' : 
           display.name.value === 'xxl' ? '100%' : '200px';
});

const iconSizeMedia = computed(() => {
    return display.name.value === 'xs' ? 40 : 
           display.name.value === 'sm' ? 60 : 
           display.name.value === 'md' ? 60 : 
           display.name.value === 'lg' ? 70 : 
           display.name.value === 'xl' ? 70 : 30;
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
    sectionId?: string,
    icon?: string
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
    achievements?: string[]; // Optional for both, used in EducationEntry
    description?: string; // Optional for both, used in WorkEntry
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
    toggleDetails();
}

// Function to clear the selection
function clearSelection() {
    edu_selected.value = null;
    showDetails.value = false;
}




function getImage(imgPath: string): string {
    try {
        return new URL(`../../assets/${imgPath}`, import.meta.url).href
    } catch (error) {
        console.error('Error loading image:', error);
        return '';
    }
}



const showDetails = ref(false);
const toggleDetails = () => {
    showDetails.value = !showDetails.value;
};
</script>


<style scoped>

.stickyCard{
    position:sticky;
    height:auto;
    top:25%;
    white-space: wrap;
    /* min-width:300px; */
    width: auto;
    justify-self: center;  overflow: visible !important;
}

.v-card-title {
    white-space: wrap;
    width:auto;
}

</style>