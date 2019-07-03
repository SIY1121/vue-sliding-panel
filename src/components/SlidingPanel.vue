import { PanelState } from '../types'
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
      ref="panel"
      @touchstart.prevent="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend.prevent="onTouchEnd"
      @click="onClick"
      :style="styles"
      class="sliding-panel"
      :class="{ transition: state !== 'dragging' }"
    >
      <section class="sliding-panel-slot" :class="slotClass">
        <slot v-bind:state="state" />
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Gravity, PanelState } from '@/types'

@Component
export default class SlidingPanel extends Vue {
  @Prop({ required: true })
  public state!: PanelState

  @Prop({ default: Gravity.BOTTOM })
  public gravity!: Gravity

  @Prop({ default: '4rem' })
  public collapsedOffset!: any

  @Prop({ default: '0' })
  public offset!: any

  @Prop({ default: true })
  public scrim!: boolean

  @Prop({ default: 'rgba(0,0,0,.5)' })
  public scrimColor!: string

  @Prop({ default: PanelState.COLLAPSED })
  public dismissedState!: PanelState

  @Prop({ default: 0.5, validator: (value: number) => 0 <= value && value <= 1 })
  public anchorPosition!: number

  @Prop({ default: false })
  public anchorEnabled!: boolean

  /////////temporary variables
  private oldOffset: number = 0
  private touchStartPosition: number = 0
  private draggingOffset: number = 0
  private oldState: PanelState = PanelState.HIDDEN
  /////////

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
    const styleObject: any = {}
    const anchor: string = this.gravity //'top' 'right' 'bottom' or 'left'

    switch (this.gravity) {
      case Gravity.TOP:
      case Gravity.BOTTOM:
        styleObject.height = this.offset
        break
      case Gravity.LEFT:
      case Gravity.RIGHT:
        styleObject.width = this.offset
    }

    switch (this.state) {
      case PanelState.HIDDEN:
        styleObject[anchor] = `calc(${this.offset} * -1)`
        break
      case PanelState.COLLAPSED:
        styleObject[anchor] = `calc(${this.offset} * -1 + ${this.collapsedOffset})`
        break
      case PanelState.ANCHORED:
        styleObject[anchor] = `calc(${this.offset} * -1 + ${this.offset} * ${this.anchorPosition})`
        if (this.anchorEnabled) break
      // eslint-disable-next-line no-fallthrough
      case PanelState.EXPANDED:
        styleObject[anchor] = `0`
        break
      case PanelState.DRAGGING:
        styleObject[anchor] = `${this.draggingOffset}px`
    }
    return styleObject
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

  /**
   * init temporary variables
   */
  onTouchStart(e: TouchEvent) {
    this.oldState = this.state
    this.$emit('update:state', PanelState.DRAGGING)
    const target = this.$refs.panel as HTMLElement
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

  /**
   * calculate and update position
   */
  onTouchMove(e: TouchEvent) {
    switch (this.gravity) {
      case Gravity.TOP:
        this.draggingOffset = Math.min(this.oldOffset + (e.targetTouches[0].screenY - this.touchStartPosition), 0)
        break
      case Gravity.BOTTOM:
        this.draggingOffset = Math.min(this.oldOffset + (e.targetTouches[0].screenY - this.touchStartPosition) * -1, 0)
        break
      case Gravity.LEFT:
        this.draggingOffset = Math.min(this.oldOffset + (e.targetTouches[0].screenX - this.touchStartPosition), 0)
        break
      case Gravity.RIGHT:
        this.draggingOffset = Math.min(this.oldOffset + (e.targetTouches[0].screenX - this.touchStartPosition) * -1, 0)
    }
  }

  /**
   * snap to closest position
   */
  onTouchEnd(e: TouchEvent) {
    const target = this.$refs.panel as HTMLElement
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

    // TODO: remove duplicated code
    // optimize threshold by oldState
    // e.g. Collapsed panel should be easy to expand
    switch (this.oldState) {
      case PanelState.HIDDEN:
      case PanelState.COLLAPSED:
        if (
          this.anchorEnabled &&
          offsetInPixel * (this.anchorPosition + (1 - this.anchorPosition) * 0.5) < draggingOffsetEnd
        ) {
          this.$emit('update:state', PanelState.EXPANDED)
        } else if (
          this.anchorEnabled &&
          offsetInPixel * (this.anchorPosition + (1 - this.anchorPosition) * 0.5) > draggingOffsetEnd &&
          offsetInPixel * (this.anchorPosition * 0.1) < draggingOffsetEnd
        ) {
          this.$emit('update:state', PanelState.ANCHORED)
        } else if (draggingOffsetEnd >= offsetInPixel * 0.1) {
          this.$emit('update:state', PanelState.EXPANDED)
        } else if (draggingOffsetEnd < offsetInPixel * 0.1) {
          this.$emit('update:state', this.dismissedState)
        }
        break
      case PanelState.ANCHORED:
        if (
          this.anchorEnabled &&
          offsetInPixel * (this.anchorPosition + (1 - this.anchorPosition) * 0.1) < draggingOffsetEnd
        ) {
          this.$emit('update:state', PanelState.EXPANDED)
        } else if (
          this.anchorEnabled &&
          offsetInPixel * (this.anchorPosition + (1 - this.anchorPosition) * 0.1) > draggingOffsetEnd &&
          offsetInPixel * (this.anchorPosition * 0.9) < draggingOffsetEnd
        ) {
          this.$emit('update:state', PanelState.ANCHORED)
        } else if (draggingOffsetEnd >= offsetInPixel * 0.5) {
          this.$emit('update:state', PanelState.EXPANDED)
        } else if (draggingOffsetEnd < offsetInPixel * 0.5) {
          this.$emit('update:state', this.dismissedState)
        }
        break
      case PanelState.EXPANDED:
        if (
          this.anchorEnabled &&
          offsetInPixel * (this.anchorPosition + (1 - this.anchorPosition) * 0.9) < draggingOffsetEnd
        ) {
          this.$emit('update:state', PanelState.EXPANDED)
        } else if (
          this.anchorEnabled &&
          offsetInPixel * (this.anchorPosition + (1 - this.anchorPosition) * 0.9) > draggingOffsetEnd &&
          offsetInPixel * (this.anchorPosition * 0.5) < draggingOffsetEnd
        ) {
          this.$emit('update:state', PanelState.ANCHORED)
        } else if (draggingOffsetEnd >= offsetInPixel * 0.9) {
          this.$emit('update:state', PanelState.EXPANDED)
        } else if (draggingOffsetEnd < offsetInPixel * 0.9) {
          this.$emit('update:state', this.dismissedState)
        }
        break
    }
  }

  onClick() {
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
