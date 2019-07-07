import { PanelState } from '../../vue-sliding-panel/types'
<template>
  <div class="home">
    <sliding-panel :state.sync="state">
      {{ state }}
    </sliding-panel>
    <section class="document-root">
      <highlight-code lang="ts">
        const a : string = 'a'
      </highlight-code>
    </section>
  </div>
</template>

<script lang="ts">
import SlidingPanel from 'lib/SlidingPanel.vue'
import { Component, Vue } from 'vue-property-decorator'
import { PanelState } from 'lib/types'

@Component({
  components: { SlidingPanel }
})
export default class About extends Vue {
  state: PanelState = PanelState.COLLAPSED
}
</script>
<style lang="scss" scoped>
@import '@/assets/main.scss';
</style>
