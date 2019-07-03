import panel from './components/SlidingPanel.vue'
import Vue from 'vue'
import { PluginObject } from 'vue'

const plugin: PluginObject<any> = {
  install(vue: typeof Vue, options: any) {
    vue.component('sliding-panel', panel)
  }
}

export default plugin

export const SlidingPanel = panel
