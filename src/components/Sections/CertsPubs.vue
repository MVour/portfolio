<template>

    <v-card :id="sectionId" height="auto" :color="theme.current.value.colors.primary" variant="text">
        <template v-slot:prepend>

            <v-avatar size="48">
                <v-icon size="34">{{ icon }}</v-icon>
            </v-avatar>
        </template>
        <template v-slot:title>
            {{ title }}
        </template>
        <v-card-text style="display: flex;flex-flow: column;">
            <v-row>
                <v-col cols="6" >
                    <v-card-subtitle>Publications</v-card-subtitle>
                    <v-card class="ma-3" v-for="pub in publications" :key="pub.doi" 
                        :title="pub.title"
                        :subtitle="pub.date"
                    >

                        <template v-slot:prepend>
                            <v-avatar size="48">
                                <v-icon size="34">mdi-bookmark</v-icon>
                            </v-avatar>
                        </template>
                        <v-card-text>{{ pub.doi }}</v-card-text>
                        
                        <v-card-actions>
                            <v-btn append-icon="mdi-open-in-new" :href="pub.link" target="_blank">View</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                
                <v-col cols="6" v-if="certifications.length > 0"  >
                    <v-card-subtitle>Certifications</v-card-subtitle>
                    <v-card class="ma-3" v-for="cert in certifications" :key="cert.name"
                        
                        :title="cert.name"
                        :subtitle="cert.issuedBy"
                        
                    >
                        <template v-slot:prepend>
                            <v-avatar size="48">
                                <v-icon size="34">mdi-certificate</v-icon>
                            </v-avatar>
                        </template>
                        <v-card-text>{{ cert.dateIssued }}</v-card-text>
                        
                        <v-card-actions>
                            <!-- <v-btn :href="cert.link" target="_blank">View</v-btn> -->
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

</template>

<script setup lang="ts">
import { useTheme } from 'vuetify/lib/composables/theme';
import certificationsInfo from '@/data/certifications.json'
import publicationsInfo from '@/data/publications.json'
import { computed, ref } from 'vue';

const theme = useTheme(); 

const props = defineProps<{
    title?: string,
    sectionId?: string,
    icon?: string
}>()



interface Certification {
    name: string;
    issuedBy: string;
    dateIssued: string;
    link?: string;
}

const certifications = ref<Certification[]>([...certificationsInfo])
const visibleCerts = computed(() => certifications.value.slice(0,3))
const totalCerts = computed(() => visibleCerts.value.length)

const publications = ref([...publicationsInfo])
const visiblePubs = computed(() => publications.value.slice(0,3))
const totalPubs = computed(() => visiblePubs.value.length)


</script>

<style scoped>

.v-card-title {
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    white-space: wrap;
}
</style>