<template>
  <section class="document-root">
    <h1 class="title">Installation</h1>
    <highlight-code lang="shell">
      npm install vue-sliding-panel
      # or
      yarn add vue-sliding-panel
    </highlight-code>
    <h1 class="title">Usage</h1>
    <p>
      Write below code in your application entry point.
    </p>
    <highlight-code lang="js">
      import Vue from 'vue'
      import SlidingPanel from 'vue-sliding-panel'
      import 'vue-sliding-panel/vue-sliding-panel.css'
      Vue.use(SlidingPanel)
    </highlight-code>
    <p>
      Then you can use <highlight-code inline>&lt;sliding-panel&gt;</highlight-code>.
    </p>
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
    <h1 class="title">Panel state</h1>
    <div class="grid">
      <div>
        <img src="@/assets/hidden.png" alt="hidden">
        <div>
          HIDDEN
        </div>
      </div>
      <div>
        <img src="@/assets/collapsed.png" alt="hidden">
        <div>
          COLLAPSED
        </div>
      </div>
      <div>
        <img src="@/assets/anchored.png" alt="hidden">
        <div>
          ANCHORED(disabled by default)
        </div>
      </div>
      <div>
        <img src="@/assets/expanded.png" alt="hidden">
        <div>
          EXPANDED
        </div>
      </div>
    </div>
    <p>
      You can write PanelState in TypeScript like
    </p>
    <highlight-code lang="ts">
      import { PanelState } from 'vue-sliding-panel'
      PanelState.HIDDEN
      PanelState.COLLAPSED
      PanelState.ANCHORED
      PanelState.EXPANDED
    </highlight-code>

    <h1 class="title">Gravity</h1>
      <div class="grid">
        <div>
          <img src="@/assets/expanded.png" alt="hidden">
          <div>
            BOTTOM
          </div>
        </div>
        <div>
          <img src="@/assets/right.png" alt="hidden">
          <div>
            RIGHT
          </div>
        </div>
        <div>
          <img src="@/assets/left.png" alt="hidden">
          <div>
            LEFT
          </div>
        </div>
        <div>
          <img src="@/assets/top.png" alt="hidden">
          <div>
            TOP
          </div>
        </div>
    </div>
    <p>
      You can write PanelState in TypeScript like
    </p>
    <highlight-code lang="ts">
      import { Gravity } from 'vue-sliding-panel'
      Gravity.TOP
      Gravity.RIGHT
      Gravity.BOTTOM
      Gravity.LEFT
    </highlight-code>
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
