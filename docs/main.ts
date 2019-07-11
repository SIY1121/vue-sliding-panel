import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/main.scss'
import '@mdi/font/scss/materialdesignicons.scss'

import SlidingPanel from 'lib/index'
Vue.use(SlidingPanel)

import VueHighlightJS from 'vue-highlight.js'

const css = require('highlight.js/lib/languages/css')
const javascript = require('highlight.js/lib/languages/javascript')
const vue = require('vue-highlight.js/lib/languages/vue')
const ts = require('highlight.js/lib/languages/typescript')
const shell = require('highlight.js/lib/languages/shell')
import 'highlight.js/styles/default.css'

Vue.use(VueHighlightJS, {
  // Register only languages that you want
  languages: {
    css,
    javascript,
    vue,
    ts,
    shell
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
