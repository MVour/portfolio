<template>

    <v-card :id="sectionId"
        height="auto" 
        :color="theme.current.value.colors.primary" 
        variant="text"
    >
        <template v-slot:prepend>

                <v-avatar size="48">
                    <v-icon size="34">{{ icon }}</v-icon>
                </v-avatar>
        </template>
        <template v-slot:title>
                {{ title }}
        </template>
        <v-card-subtitle> Contact me</v-card-subtitle>
        <v-card-text class="text-justify text-h6 font-weight-light" style="display: flex;flex-flow: row;">

        <!-- <v-img style="position:absolute;left:50%;" cover :src="contact_img" width="50%" height="auto" alt="Contact Illustration" /> -->
            <v-list density="comfortable" width="50%" min-width="300px">
                <v-list-item >
                    <template v-slot:prepend>
                        <v-icon color="" icon="mdi-linkedin" width="40" height="40"/>
                    </template>
                    <v-list-item-title  v-text="personalInfo.linkedin.username"></v-list-item-title>
                    <template v-slot:append>
                        <v-btn variant="flat" icon :href="personalInfo.linkedin.link" target="_blank">
                            <v-icon>mdi-open-in-new</v-icon>
                        </v-btn>
                    </template>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item >
                    <template v-slot:prepend>
                        <v-icon icon="mdi-gmail" width="40" height="40"/>
                    </template>
                    <v-list-item-title v-text="personalInfo.contact.email"></v-list-item-title>
                    <template v-slot:append>
                        <v-btn variant="flat" icon :href="'mailto:' + personalInfo.contact.email" target="_blank">
                            <v-icon>mdi-pen</v-icon>
                        </v-btn>
                    </template>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item >
                    <template v-slot:prepend>
                        <v-icon icon="mdi-whatsapp" width="40" height="40"/>
                    </template>
                    <v-list-item-title  v-text="personalInfo.contact.phone"></v-list-item-title>
                    <template v-slot:append>
                        <v-btn variant="flat" icon :href="'tel:' + personalInfo.contact.phone" target="_blank">
                            <v-icon>mdi-phone</v-icon>
                        </v-btn>
                    </template>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item >
                    <template v-slot:prepend>
                        <v-icon  icon="mdi-file-account" size="large"/>
                    </template>
                    <v-list-item-title  v-text="'CV'"></v-list-item-title>
                    <template v-slot:append>
                        <v-btn variant="flat" icon @click="downloadCV()" >
                            <v-icon>mdi-open-in-new</v-icon>
                        </v-btn>
                    </template>
                </v-list-item>
                
            </v-list>
        </v-card-text>
    </v-card>

</template>

<script setup lang="ts">
import { useTheme } from 'vuetify/lib/composables/theme';
import personalInfo from '@/data/personal.json'
import linkedin_svg from '@/assets/fa_icons/linkedin.svg';
import email_svg from '@/assets/fa_icons/email.svg';
import whatsapp_svg from '@/assets/fa_icons/whatsapp.svg';
import contact_img from '@/assets/illustrations/contact.svg';

// const cv_path = '/CV.pdf'
const cv_path = `${import.meta.env.BASE_URL}CV.pdf`;

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

function downloadCV() {
      // For button click, you can programmatically create an anchor element
      // and click it, which is useful if you want to perform other logic
      // before triggering the download.
    const link = document.createElement('a');
    link.href = cv_path;

    window.open(cv_path, '_blank')

    // link.download = 'CV' + '.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

</script>