import panel from './components/SlidingPanel.vue'
import Vue from 'vue'
import { PluginObject } from 'vue'

const SlidingPanel: PluginObject<any> = {
  install(vue: typeof Vue, options: any) {
    vue.component('sliding-panel', panel)
  }
}

export default SlidingPanel
