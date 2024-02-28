import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// set up vuetify with theme and icons
// Vuetify

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { fa } from "vuetify/iconsets/fa";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
//import { aliases } from "vuetify/lib/iconsets/mdi";

// make sure to also import the coresponding css
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import 'vuetify/dist/vuetify.min.css'


const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        //
    },
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi,
            fa,
        },
    },
});



window.app = createApp(App).use(router);
app.use(vuetify);
//app.use(EventBus);
app.mount('#app');

app.config.globalProperties.$filters = {
    formatDate(value) {
        if (!value) return '';
        const date = new Date(value);
        return date.toLocaleString(); // Oder eine andere Formatierungsmethode
    },
    getDuration(timestamp) {
        if (!timestamp) return '--';

        const date = new Date(timestamp);

        const seconds = Math.floor((Date.now() - date) / 1000);
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        let duration = '';
        if (days > 0) duration += days + 'd ';
        if (hours > 0) duration += hours + 'h ';
        if (minutes > 0) duration += minutes + 'm ';
        if (remainingSeconds > 0) duration += remainingSeconds + 's';

        return duration.trim();
    },
    calcDuration(seconds) {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        let durationString = '';
        if (days > 0) {
            durationString += `${days}d `;
        }
        if (hours > 0) {
            durationString += `${hours}h `;
        }
        if (minutes > 0) {
            durationString += `${minutes}m `;
        }
        durationString += `${remainingSeconds}s`;

        return durationString.trim();
    }
};
