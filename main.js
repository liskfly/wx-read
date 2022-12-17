import App from './App'
import $ from 'data/bookBrowse.js'
// #ifndef VUE3
import Vue from 'vue'
import store from './store/index.js'
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$ = $
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif