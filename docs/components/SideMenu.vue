<template>
  <section class="side-menu">
    <section>
      <div class="section-name">
        Get Started
      </div>
      <router-link to="/start" class="item" @click.native.stop="close">
        Quick Start
      </router-link>
    </section>
    <section>
      <div class="section-name">
        Document
      </div>
      <router-link to="/props" class="item" @click.native.stop="close">
        Props
      </router-link>
      <router-link to="/event" class="item" @click.native.stop="close">
        EventHandling
      </router-link>
    </section>
    <section>
      <div class="section-name">
        Showcase
      </div>
      <router-link to="/examples/ShareComponent" class="item" @click.native.stop="close">
        Share component
      </router-link>
      <router-link to="/examples/SideBar" class="item" @click.native.stop="close">
        SideBar
      </router-link>
      <router-link to="/examples/Playground" class="item" @click.native.stop="close">
        Playground
      </router-link>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component
export default class SideMenu extends Vue {
  close() {
    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
.side-menu {
  padding: 1rem;
}
.section-name {
  font-weight: bold;
  font-size: 1.5rem;
  color: #333;
  margin: 2rem 0 1rem 0;
}
.item {
  display: block;
  padding-left: 1rem;
  margin: 1rem 0;
}
</style>
