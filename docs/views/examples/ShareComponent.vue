<template>
  <section class="document-root">
    <button class="button" @click="onClick">SHARE</button>
    <sliding-panel
      :state.sync="state"
      :dismissedState="dismissedState"
      :anchorEnabled="true"
      :anchorPosition="0.3"
      offset="80vh"
    >
      <div class="title">SHARE VIA</div>
      <div class="container">
        <i class="mdi mdi-twitter" />
        <i class="mdi mdi-facebook" />
        <i class="mdi mdi-instagram" />
      </div>
      <div class="notification">
        Swipe to see more options
        <i class="mdi mdi-chevron-down" />
      </div>
      <div class="container">
        <i class="mdi mdi-slack" />
        <i class="mdi mdi-discord" />
        <i class="mdi mdi-reddit" />
        <i class="mdi mdi-facebook-messenger" />
        <i class="mdi mdi-tumblr" />
        <i class="mdi mdi-pinterest" />
        <i class="mdi mdi-wechat" />
        <i class="mdi mdi-email" />
      </div>
    </sliding-panel>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PanelState } from 'lib/index'

@Component
export default class ShareComponent extends Vue {
  state: PanelState = PanelState.HIDDEN
  dismissedState: PanelState = PanelState.HIDDEN
  onClick() {
    this.state = PanelState.ANCHORED
  }
}
</script>

<style lang="scss">
.sliding-panel {
  background: white;
  width: 100%;
  left: 0;
  padding: 1rem;
  .title {
    font-size: 1.5rem;
  }
  .notification {
    margin: 0.5rem 0;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    i {
      font-size: 3rem;
      margin: 1rem;
    }
  }
}
</style>
