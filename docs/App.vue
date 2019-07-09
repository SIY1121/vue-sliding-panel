<template>
  <div id="app">
    <navbar />
    <sliding-panel
      class="pc-sidebar"
      :state.sync="pcState"
      :gravity="gravity"
      :scrim="false"
      collapsedOffset="1em"
      offset="350px"
    >
      <side-menu @click.native.stop="" />
    </sliding-panel>
    <sliding-panel class="sp-sidebar" :state.sync="spState" :gravity="gravity" :scrim="true" collapsedOffset="2rem">
      <side-menu class="side-menu" @close="closesp" />
    </sliding-panel>
    <router-view style="margin-top:5rem" />
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

  closesp() {
    this.spState = PanelState.COLLAPSED
  }

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
  height: 100%;
}

.pc-sidebar .sliding-panel {
  filter: drop-shadow(0 0 16px rgba(0, 0, 0, 0.1));
  top: 0;
  bottom: 0;
  background-size: 10%;
  background: linear-gradient($primary, $secondly) no-repeat right;
  .side-menu {
    margin-top: $navbar-height;
    margin-left: 5px;
    transform: translateX(-5px);
  }
}

.sp-sidebar {
  .sliding-panel {
    top: 0;
    background: transparent;
    z-index: 10;
    .side-menu {
      height: 100vh;
      transform: translateX(-2rem);
      margin-left: 2rem;
    }
  }
  .scrim {
    z-index: 9;
  }
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
