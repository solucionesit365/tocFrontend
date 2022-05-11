import { createApp } from 'vue';

import axios from 'axios';

import App from './App.vue';

import router from './router';

import store from './store';

import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css';

import 'bootstrap';

// axios.defaults.baseURL = 'http://localhost:3000'; // BUILD PARA TPV
axios.defaults.baseURL = 'http://10.137.0.201:3000'; // BUILD PARA CON IP
// axios.defaults.baseURL = 'http://54.195.159.7:3000'; // BUILD PARA SERVIDOR 
// axios.defaults.baseURL = 'http://34.78.247.153:3000'; // BUILD PARA SERVIDOR(?)

createApp(App).use(Toast, {position: 'bottom-center', timeout: 1500}).use(store).use(router).mount('#app');
