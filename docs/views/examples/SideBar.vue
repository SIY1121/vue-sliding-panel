<template>
  <section>
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
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Gravity, PanelState } from 'lib/index'

@Component
export default class SideMenu extends Vue {
  state: PanelState = PanelState.HIDDEN
  dismissedState: PanelState = PanelState.HIDDEN
  gravity: Gravity = Gravity.RIGHT
  onClick() {
    this.state = PanelState.ANCHORED
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
