import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import AppIcons from 'src/code/AppIcons.js'

import './styles/main.scss'

const pinia = createPinia();

const app=createApp(App);
app.use(AppIcons);
app.use(pinia);
app.mount('#app');
