import { createApp } from 'vue';
import VueFinalModal from 'vue-final-modal';
import Toast, { PluginOptions, POSITION } from 'vue-toastification';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vue-toastification/dist/index.css';

const toastOptions: PluginOptions = {
  position: POSITION.TOP_CENTER,
};

createApp(App)
  .use(store)
  .use(router)
  .use(VueFinalModal())
  .use(Toast, toastOptions)
  .mount('#app');
