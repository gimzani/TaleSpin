import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import TaleSpinDb from 'src/code/db/TaleSpinDb.js'
import AppIcons from 'src/code/AppIcons.js'

import App from './App.vue'

import './styles/main.scss'

const pinia = createPinia();
pinia.use(({store}) => {
  store.db = markRaw(TaleSpinDb.getInstance());
});

const app=createApp(App);
app.use(AppIcons);
app.use(pinia);
app.mount('#app');
