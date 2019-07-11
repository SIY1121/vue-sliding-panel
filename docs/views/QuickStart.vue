<template>
  <section class="document-root">
    <h1 class="title">Installation</h1>
    <highlight-code lang="shell">
      npm install vue-sliding-panel # or yarn add vue-sliding-panel
    </highlight-code>
    <h1 class="title">Usage</h1>
    <highlight-code lang="js">
      import Vue from 'vue' import SlidingPanel from 'vue-sliding-panel' Vue.use(SlidingPanel)
    </highlight-code>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
export default class QuickStart extends Vue {}
</script>

<style lang="scss">
.hljs {
  margin: 1rem 0;
  line-height: 1.5rem;
}
</style>
