<template>
  <section class="document-root">
    <h1 class="title">Share Component</h1>
    <button class="button" @click="onClick">SHARE</button>
    <sliding-panel
      class="share"
      :state.sync="state"
      :dismissedState="dismissedState"
      :anchorEnabled="true"
      :anchorPosition="0.3"
      offset="80vh"
    >
      <div class="panel-title">SHARE VIA</div>
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
    <h1 class="title">Code</h1>
    <highlight-code lang="vue">
      <code v-pre>
        &lt;template&gt;
          &lt;button @click="state='anchored'"&gt;
            SHARE
          &lt;/button&gt;
          &lt;sliding-panel
            class="share"
            :state.sync="state"
            :dismissedState="dismissedState"
            :anchorEnabled="true"
            :anchorPosition="0.3"
            offset="80vh"
          &gt;
            &lt;div class="panel-title"&gt;
              SHARE VIA
              &lt;/div&gt;
                &lt;div class="container"&gt;
                  &lt;i class="mdi mdi-twitter" /&gt;
                  &lt;i class="mdi mdi-facebook" /&gt;
                  &lt;i class="mdi mdi-instagram" /&gt;
              &lt;/div&gt;
            &lt;div class="notification"&gt;
              Swipe to see more options &lt;i class="mdi mdi-chevron-down" /&gt;
            &lt;/div&gt;
            &lt;div class="container"&gt;
              &lt;i class="mdi mdi-slack" /&gt;
              &lt;i class="mdi mdi-discord" /&gt;
              &lt;i class="mdi mdi-reddit" /&gt;
              &lt;i class="mdi mdi-facebook-messenger" /&gt;
              &lt;i class="mdi mdi-tumblr" /&gt;
              &lt;i class="mdi mdi-pinterest" /&gt;
              &lt;i class="mdi mdi-wechat" /&gt;
              &lt;i class="mdi mdi-email" /&gt;
            &lt;/div&gt;
          &lt;/sliding-panel&gt;
        &lt;/template&gt;
        &lt;style&gt;
        .share .sliding-panel {
          background: white;
          left: 0;
          overflow-y: scroll;
          padding: 1rem;
          width: 100%;
        }
        .panel-title {
          font-size: 1.5rem;
          margin-bottom:
          1rem;
        }
        .notification {
          margin: 0.5rem 0;
        }
        .container {
          display: flex;
          flex-wrap: wrap;
        }
        i {
          font-size: 3rem;
          margin: 1rem;
        } &lt;/style&gt;
      </code>
    </highlight-code>
  </section>
</template>

<script lang="ts">
/* eslint-disable prettier/prettier */
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
.share .sliding-panel {
  background: white;
  left: 0;
  overflow-y: scroll;
  padding: 1rem;
  width: 100%;
  .panel-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
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
