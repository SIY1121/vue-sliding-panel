<template>
  <section class="side-menu">
    <section>
      <div class="section-name">
        Get Started
      </div>
      <div class="item">
        Quick Start
      </div>
      <div class="item">
        Contributing
      </div>
    </section>
    <section>
      <div class="section-name">
        Document
      </div>
      <div class="item">
        Props
      </div>
      <div class="item">
        Styling
      </div>
    </section>
    <section>
      <div class="section-name">
        Showcase
      </div>
      <router-link to="/examples/ShareComponent" class="item">
        Share component
      </router-link>
      <router-link to="/examples/SideBar" class="item">
        SideBar
      </router-link>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component
export default class SideMenu extends Vue {}
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
