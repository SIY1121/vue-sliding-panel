<template>
  <section>
    <transition name="fade">
      <div
        v-if="isScrimVisible"
        class="scrim"
        :style="{ background: scrimColor }"
        @click="dismiss"
        @touchend.prevent="dismiss"
      ></div>
    </transition>
    <section
      @touchstart.prevent="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend.prevent="onTouchEnd"
      @click="onClick"
      :style="styles"
      class="sliding-panel"
      :class="{ transition: state !== 'dragging' }"
    >
      <slot class="sliding-panel-slot" :class="slotClass" v-bind:state="state" />
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Gravity, PanelState } from '@/types'

@Component
export default class HelloWorld extends Vue {
  @Prop({ default: PanelState.COLLAPSED }) public state!: PanelState
  @Prop({ default: Gravity.BOTTOM }) public gravity!: Gravity
  @Prop({ default: '4rem' }) public collapsedOffset!: any
  @Prop({ default: '0' }) public offset!: any
  @Prop({ default: true }) public scrim!: boolean
  @Prop({ default: 'rgba(0,0,0,.5)' }) public scrimColor!: string
  @Prop({ default: PanelState.COLLAPSED }) public dismissedState!: PanelState
  @Prop({
    default: 0.5,
    validator: (value: number) => 0 <= value && value <= 1
  })
  public anchorPosition!: number

  @Prop({ default: false }) public anchorEnabled!: boolean

  /////////temporary variables
  private oldOffset: number = 0
  private touchStartPosition: number = 0
  private draggingOffset: number = 0
  private tmpSlideOffset: number = 0
  /////////

  private currentOffset: string = '0'

  mounted() {
    if (this.offset == 0)
      switch (this.gravity) {
        case Gravity.TOP:
        case Gravity.BOTTOM:
          this.offset = '50vh'
          break
        case Gravity.LEFT:
        case Gravity.RIGHT:
          this.offset = '90vw'
      }
  }

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
        this.currentOffset = `calc(${this.offset} * -1)`
        break
      case PanelState.COLLAPSED:
        this.currentOffset = `calc(${this.offset} * -1 + ${this.collapsedOffset})`
        break
      case PanelState.ANCHORED:
        this.currentOffset = `calc(${this.offset} * -1 + ${this.offset} * ${this.anchorPosition})`
        if (this.anchorEnabled) break
      // eslint-disable-next-line no-fallthrough
      case PanelState.EXPANDED:
        this.currentOffset = `0`
        break
      case PanelState.DRAGGING:
        returns[size] = this.offset
        returns[anchor] = `${this.draggingOffset}px`
        return returns
    }

    returns[size] = this.offset
    returns[anchor] = this.currentOffset
    return returns
  }

  get isScrimVisible() {
    return this.scrim && !(this.state === PanelState.HIDDEN || this.state === PanelState.COLLAPSED)
  }

  get slotClass() {
    return this.gravity === Gravity.TOP || this.gravity === Gravity.BOTTOM ? 'ud' : 'lr'
  }

  dismiss() {
    this.$emit('update:state', this.dismissedState)
  }

  onTouchStart(e: TouchEvent) {
    console.log('start')
    this.$emit('update:state', PanelState.DRAGGING)
    const target = e.target as HTMLElement
    switch (this.gravity) {
      case Gravity.TOP:
        this.touchStartPosition = e.targetTouches[0].screenY
        this.oldOffset = target.offsetTop
        break
      case Gravity.BOTTOM:
        this.touchStartPosition = e.targetTouches[0].screenY
        this.oldOffset = window.innerHeight - (target.offsetTop + target.clientHeight)
        break
      case Gravity.LEFT:
        this.touchStartPosition = e.targetTouches[0].screenX
        this.oldOffset = target.offsetLeft
        break
      case Gravity.RIGHT:
        this.touchStartPosition = e.targetTouches[0].screenX
        this.oldOffset = window.innerWidth - (target.offsetLeft + target.clientWidth)
    }
    this.draggingOffset = this.oldOffset
  }

  onTouchMove(e: TouchEvent) {
    console.log('move')
    switch (this.gravity) {
      case Gravity.TOP:
        this.draggingOffset = Math.min(
          this.oldOffset + (e.targetTouches[0].screenY - this.touchStartPosition),
          0
        )
        this.tmpSlideOffset =
          1 - Math.abs(this.draggingOffset) / (e.target as HTMLElement).clientHeight
        break
      case Gravity.BOTTOM:
        this.draggingOffset = Math.min(
          this.oldOffset + (e.targetTouches[0].screenY - this.touchStartPosition) * -1,
          0
        )
        break
      case Gravity.LEFT:
        this.draggingOffset = Math.min(
          this.oldOffset + (e.targetTouches[0].screenX - this.touchStartPosition),
          0
        )
        break
      case Gravity.RIGHT:
        this.draggingOffset = Math.min(
          this.oldOffset + (e.targetTouches[0].screenX - this.touchStartPosition) * -1,
          0
        )
    }
  }

  onTouchEnd(e: TouchEvent) {
    const target = e.target as HTMLElement
    let offsetInPixel = 0
    let draggingOffsetEnd = 0
    switch (this.gravity) {
      case Gravity.TOP:
      case Gravity.BOTTOM:
        offsetInPixel = target.clientHeight
        draggingOffsetEnd = this.draggingOffset + offsetInPixel
        break
      case Gravity.LEFT:
      case Gravity.RIGHT:
        offsetInPixel = target.clientWidth
        draggingOffsetEnd = this.draggingOffset + offsetInPixel
    }

    if (this.anchorEnabled && offsetInPixel * (this.anchorPosition * 1.5) < draggingOffsetEnd) {
      this.$emit('update:state', PanelState.EXPANDED)
    } else if (
      this.anchorEnabled &&
      offsetInPixel * (this.anchorPosition * 1.5) > draggingOffsetEnd &&
      offsetInPixel * (this.anchorPosition * 0.5) < draggingOffsetEnd
    ) {
      this.$emit('update:state', PanelState.ANCHORED)
    } else if (draggingOffsetEnd >= offsetInPixel * 0.5) {
      this.$emit('update:state', PanelState.EXPANDED)
    } else if (draggingOffsetEnd < offsetInPixel * 0.5) {
      this.$emit('update:state', this.dismissedState)
    }
  }

  onClick() {
    console.log('onclick')
    if (this.state === PanelState.COLLAPSED)
      this.$emit('update:state', this.anchorEnabled ? PanelState.ANCHORED : PanelState.EXPANDED)
    else if (this.state === PanelState.ANCHORED) this.$emit('update:state', PanelState.EXPANDED)
    else if (this.state === PanelState.EXPANDED) this.$emit('update:state', this.dismissedState)
  }
}
</script>

<style lang="scss" scoped>
.sliding-panel {
  position: fixed;
  background: white;
  .sliding-panel-slot {
    &.ud {
      width: 100%;
      min-height: 100%;
      overflow-y: scroll;
    }
    &.lr {
      height: 100%;
      min-width: 100%;
      overflow-x: scroll;
    }
  }
  &.transition {
    transition: all 0.3s cubic-bezier(0, 0, 0.05, 1) 0s;
  }
}
.scrim {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: all 0.3s ease 0s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
