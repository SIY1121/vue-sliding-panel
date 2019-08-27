<template>
  <section class="document-root">
    <h1 class="title">Sidebar</h1>
    <button class="button" @click="onClick">OPEN</button>
    <sliding-panel
      class="sidebar"
      :state.sync="state"
      :gravity="gravity"
      :dismissedState="dismissedState"
      offset="70vw"
    >
      <div>
        SideBar
      </div>
    </sliding-panel>
    <h1 class="title">Code</h1>
    <highlight-code lang="vue">
      <code v-pre>
        &lt;template&gt; &lt;button @click="state = 'expanded'"&gt;OPEN&lt;/button&gt; &lt;sliding-panel class="sidebar"
        :state.sync="state" :gravity="gravity" :dismissedState="dismissedState" offset="70vw" &gt; &lt;div&gt; SideBar
        &lt;/div&gt; &lt;/sliding-panel&gt; &lt;/template&gt; &lt;style&gt; .sidebar .sliding-panel { height: 100vh;
        top: 0; background: white; } .sliding-panel-slot { padding: 1rem; } &lt;/style&gt;
      </code>
    </highlight-code>
  </section>
</template>

<script lang="ts">
/* eslint-disable prettier/prettier */
import { Component, Vue } from 'vue-property-decorator'
import { Gravity, PanelState } from 'lib/index'

@Component
export default class SideMenu extends Vue {
  state: PanelState = PanelState.HIDDEN
  dismissedState: PanelState = PanelState.HIDDEN
  gravity: Gravity = Gravity.RIGHT
  onClick() {
    this.state = PanelState.EXPANDED
  }
}
</script>

<style lang="scss">
.sidebar .sliding-panel {
  height: 100vh;
  top: 0;
  background: white;
  .sliding-panel-slot {
    padding: 1rem;
  }
}
</style>
