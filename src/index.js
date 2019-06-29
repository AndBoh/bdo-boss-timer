function requireAll(r) { r.keys().forEach(r); }

import Vue from 'vue';

import {store} from './store';

import App from './components/App.vue';

import 'normalize.css';

requireAll(require.context('./assets/', true, /\.*$/));

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})