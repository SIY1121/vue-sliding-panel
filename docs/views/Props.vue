<template>
  <section class="document-root">
    <h1 class="title">Installation</h1>
    <highlight-code lang="shell">
      npm install vue-sliding-panel
      # or
      yarn add vue-sliding-panel
    </highlight-code>
    <h1 class="title">Usage</h1>
    <highlight-code lang="js">
      import Vue from 'vue'
      import SlidingPanel from 'vue-sliding-panel'
      Vue.use(SlidingPanel)
    </highlight-code>
    <highlight-code lang="vue">
      <code v-pre >
        &lt;template&gt;
        &lt;div&gt;
        &lt;sliding-panel :state.sync="panelState"&gt;
        {{ panelState }}
        &lt;/sliding-panel&gt;
        &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
        export default {
        data() {
        return {
        panelState: 'collapsed'
        gravity: 'bottom'
        }
        }
        }
        &lt;/script&gt;
        &lt;style&gt;
        .sliding-panel {
        background: white;
        left: 0;
        right: 0;
        }
        &lt;/style&gt;
      </code>
    </highlight-code>
    <p>
      By default, sliding panels are not styled except for
      <highlight-code inline>position: fixed;</highlight-code>
      and anchor (e.g. in bottom gravity mode, panel uses bottom property).<br>
    </p>
    <p>
      So you have to apply style for <highlight-code  inline>.sliding-panel</highlight-code>.
    </p>
    <h1>Panel state</h1>
    <p>
      Users can collapse and expand panel by swipe or mouse click.<br>
      But you may need to change state programmatically (e.g. expand hidden panel)
    </p>
  </section>
</template>

<script lang="ts">
  /* eslint prettier/prettier: 0 */
  import { Component, Prop, Vue } from 'vue-property-decorator'
  export default class QuickStart extends Vue {}
</script>

<style lang="scss">
  .hljs {
    margin: 1rem 0;
    line-height: 1.5rem;
  }
</style>
