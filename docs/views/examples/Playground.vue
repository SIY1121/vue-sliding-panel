<template>
  <section class="document-root">
    <h1 class="title">Playground</h1>
    <form class="form">
      <input type="radio" id="one" value="hidden" v-model="state" />
      <label for="one">Hidden</label><br />
      <input type="radio" id="two" value="collapsed" v-model="state" />
      <label for="two">Collapsed</label><br />
      <input type="radio" id="three" value="anchored" v-model="state" />
      <label for="three">Anchored</label><br />
      <input type="radio" id="four" value="expanded" v-model="state" />
      <label for="four">Expanded</label><br />
      Offset<input type="text" v-model="offset" /><br />
      CollapsedOffset<input type="text" v-model="collapsedOffset" /><br />
      Gravity<select v-model="gravity">
        <option>bottom</option>
        <option>left</option>
        <option>right</option>
        <option>top</option>
      </select>
      <br />
      <input id="ae" type="checkbox" v-model="anchorEnabled" />
      <label for="ae">AnchorEnabled</label><br />
      <input type="range" min="0" max="1" step="0.1" v-model="anchorPosition" />AnchorPosition <br />
      DismissedState
      <select v-model="dismissedState">
        <option>hidden</option>
        <option>collapsed</option>
      </select>
      <br />
      <input id="te" type="checkbox" v-model="touchEnabled" />
      <label for="te">touchEnabled</label><br />
      <input id="scrim" type="checkbox" v-model="scrim" />
      <label for="scrim">scrim</label><br />
    </form>
    <sliding-panel
      class="play"
      :state.sync="state"
      :gravity="gravity"
      :anchorEnabled="anchorEnabled"
      :anchorPosition="anchorPosition"
      :dismissedState="dismissedState"
      :touchEnabled="touchEnabled"
      :offset="offset"
      :collapsedOffset="collapsedOffset"
      :scrim="scrim"
      :class="panelClass"
    >
      {{ state }}
    </sliding-panel>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Gravity, PanelState } from 'lib/index'

@Component
export default class Playground extends Vue {
  state: PanelState = PanelState.HIDDEN
  dismissedState: PanelState = PanelState.HIDDEN
  gravity: Gravity = Gravity.BOTTOM
  anchorPosition = 0.5
  anchorEnabled = false
  touchEnabled = true
  offset = '50%'
  collapsedOffset = '56px'
  scrim = true
  onClick() {
    this.state = PanelState.ANCHORED
  }
  get panelClass() {
    switch (this.gravity) {
      case Gravity.TOP:
      case Gravity.BOTTOM:
        return 'tb'
      case Gravity.LEFT:
      case Gravity.RIGHT:
        return 'lr'
    }
    return ''
  }
}
</script>

<style lang="scss">
.play .sliding-panel {
  background: white;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
}
.tb {
  .sliding-panel {
    left: 0;
    right: 0;
  }
}
.lr {
  .sliding-panel {
    top: 0;
    bottom: 0;
  }
}
.form {
  padding: 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background: white;
  position: fixed;
  z-index: 999;
}
</style>
