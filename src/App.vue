<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <SlidingPanel :state.sync="state" :gravity="gravity">
      <template v-slot:handle="state">
        <div style="position:relative;top:-2rem">Handle</div>
      </template>
      <template v-slot:default="state">
        {{ state }}
      </template>
    </SlidingPanel>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SlidingPanel from '@/components/SlidingPanel.vue'
import { Gravity, PanelState } from '@/types'

@Component({
  components: {
    SlidingPanel
  }
})
export default class App extends Vue {
  state: PanelState = PanelState.COLLAPSED
  gravity: Gravity = Gravity.BOTTOM
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.sliding-panel {
  width: 100vw;
  left: 0;
}
</style>
