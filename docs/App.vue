<template>
  <div id="app">
    <navbar />
    <router-view style="margin-top:5rem" />
    <sliding-panel
      class="pc-sidebar"
      :state.sync="pcState"
      :gravity="gravity"
      :scrim="false"
      collapsedOffset="1em"
      offset="350px"
    >
      <side-menu />
    </sliding-panel>
    <sliding-panel class="sp-sidebar" :state.sync="spState" :gravity="gravity" :scrim="true" collapsedOffset="1rem">
      <side-menu />
    </sliding-panel>
  </div>
</template>
<script lang="ts">
import { Route } from 'vue-router'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Gravity, PanelState } from 'lib/index'
import Navbar from '@/components/Navbar.vue'
import SideMenu from './components/SideMenu.vue'

@Component({
  components: { SideMenu, Navbar }
})
export default class App extends Vue {
  gravity: Gravity = Gravity.LEFT
  pcState: PanelState = PanelState.HIDDEN
  spState: PanelState = PanelState.HIDDEN
  @Watch('$route')
  onRouteChange(to: Route, from: Route) {
    this.pcState = to.name === 'home' ? PanelState.HIDDEN : PanelState.EXPANDED
    this.spState = to.name === 'home' ? PanelState.HIDDEN : PanelState.COLLAPSED
  }
}
</script>
<style lang="scss">
@import '@/assets/main.scss';
.page-root {
  margin-top: $navbar-height;
}
.side-menu {
  background: white;
}

.pc-sidebar .sliding-panel {
  top: $navbar-height;
}

.sp-sidebar .sliding-panel {
  top: 0;
  background: transparent;
}

.sp-sidebar .sliding-panel-slot,
.pc-sidebar .sliding-panel-slot {
  background: white;
  top: 0;
  height: 100vh;
}

.pc-sidebar .sliding-panel-slot {
  filter: drop-shadow(0 0 16px rgba(0, 0, 0, 0.1));
}

.sp-sidebar .sliding-panel-slot {
  border-right: transparent solid 1rem;
  padding-left: 1em;
  transform: translateX(-1rem);
}

.sp-sidebar {
  display: none;
}
@include tab {
  .pc-sidebar {
    display: none;
  }
  .sp-sidebar {
    display: block;
  }
}
</style>
