<template>
  <nav>
    <section class="container">
      <i class="mdi mdi-menu menu" @click="$emit('menu')" />
      <router-link to="/" class="brand">
        <img class="logo" src="@/assets/logo.svg" alt="logo" />
        Vue Sliding Panel
      </router-link>
      <div class="social">
        <a target="_blank" href="https://github.com/SIY1121/vue-sliding-panel"
          ><i class="mdi mdi-github-circle mdi-48px"
        /></a>
      </div>
    </section>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {
  get isTop(): boolean {
    return this.$route.name === 'home'
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';
nav {
  background: white;
  filter: drop-shadow(0 0 16px rgba(0, 0, 0, 0.1));
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  @include pc {
    z-index: 3;
  }
}
.container {
  @include container();
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: $navbar-height;
}
.light {
  color: white;
}
.brand {
  color: $text-color;
  text-decoration: none;
  font-weight: bold;
}
.logo {
  vertical-align: middle;
  height: 3rem;
}
.social {
  i {
    color: $text-color;
    line-height: 3rem;
  }
  height: 3rem;
}
.menu {
  @include pc {
    display: none;
  }
}
</style>
