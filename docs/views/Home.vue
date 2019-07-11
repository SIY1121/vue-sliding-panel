<template>
  <section class="home">
    <div class="hero">
      <div class="content">
        <img class="logo" src="@/assets/logo.svg" alt="logo" />
        <div class="title">
          Most Native Feeling Sliding Panel
        </div>
        <div class="name">
          Vue Sliding Panel
        </div>
        <div class="links">
          <router-link class="button primary" to="./start">
            <i class="mdi mdi-arrow-right-thick" />
            Get Started
          </router-link>
          <router-link class="button secondly" to="./about">
            <i class="mdi mdi-cube-outline" />
            See Showcase
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
@import '@/assets/main.scss';
.hero {
  height: 70vh;
  width: 100%;
  // background-image: url('../assets/wave.svg'), linear-gradient(90deg, #5433ff, #20bdff, #a5fecd);
  background-repeat: no-repeat, repeat;
  background-size: 120%, cover;
  background-position: 5% 101%, center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    .logo {
      filter: drop-shadow(0 0 16px rgba(0, 0, 0, 0.1));
      width: 150px;
    }
    .title {
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
    }
    .name {
      margin: 1rem 0;
    }
    .links {
      height: 4rem;
    }
  }
  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
