import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/css/tailwind.css'

import App from './App.vue'
import router from './router'

import { Menu as AppMenu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Registra componentes globales si es necesario
app.component('AppMenu', AppMenu);
app.component('MenuButton', MenuButton);
app.component('MenuItems', MenuItems);
app.component('MenuItem', MenuItem);

app.mount('#app');
