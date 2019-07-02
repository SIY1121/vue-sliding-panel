import { PanelState } from '../types' import { PanelState } from '../types'
<template>
  <section>
    <section
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      :style="styles"
      class="sliding-panel"
    ></section>
    <div v-if="isScrimVisible" class="scrim" :style="{ background: scrimColor }"></div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Gravity, PanelState } from '@/types'

@Component
export default class HelloWorld extends Vue {
  @Prop({ default: PanelState.COLLAPSED }) public state!: PanelState
  @Prop({ default: Gravity.BOTTOM }) public gravity!: Gravity
  @Prop({ default: '2em' }) public collapsedOffset!: any
  @Prop({ default: '0' }) public offset!: any
  @Prop({ default: true }) public scrim!: boolean
  @Prop({ default: 'rgba(0,0,0,.1)' }) public scrimColor!: string

  @Prop({
    default: 0.5,
    validator: (value: number) => 0 <= value && value <= 1
  })
  public anchorPosition!: number

  mounted() {
    switch (this.gravity) {
      case Gravity.TOP:
      case Gravity.BOTTOM:
        this.offset = '50vh'
        break
      case Gravity.LEFT:
      case Gravity.RIGHT:
        this.offset = '70vw'
    }
  }

  onTouchStart() {}

  onTouchMove() {}

  onTouchEnd() {}

  get styles(): any {
    let hiddenOffset: '100vh' | '100vw'
    let size: 'width' | 'height' = 'width'
    const returns: any = {}
    const anchor: string = this.gravity

    switch (this.gravity) {
      case Gravity.TOP:
      case Gravity.BOTTOM:
        hiddenOffset = '100vh'
        size = 'height'
        break
      case Gravity.LEFT:
      case Gravity.RIGHT:
        hiddenOffset = '100vw'
        size = 'width'
    }

    switch (this.state) {
      case PanelState.HIDDEN:
        returns[anchor] = `calc(${this.offset} * -1)`
        returns[size] = this.offset
        break
      case PanelState.COLLAPSED:
        returns[anchor] = `calc(${this.offset} * -1 + ${this.collapsedOffset})`
        returns[size] = this.offset
        break
      case PanelState.ANCHORED:
        returns[anchor] = `calc(${this.offset} * -1 + ${this.offset} * ${this.anchorPosition})`
        returns[size] = this.offset
        break
      case PanelState.EXPANDED:
        returns[anchor] = `0`
        returns[size] = this.offset
        break
    }
    return returns
  }

  get isScrimVisible() {
    return this.scrim && (this.state === PanelState.ANCHORED || this.state === PanelState.EXPANDED)
  }
}
</script>

<style lang="scss" scoped>
.sliding-panel {
  position: fixed;
  transition: all 0.3s ease 0s;
  width: 500px;
  height: 500px;
  background: #f98000;
}
.scrim {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: background 0.3s ease 0s;
}
</style>
