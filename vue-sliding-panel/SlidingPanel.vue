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
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @click="onClick"
      :style="styles"
      class="sliding-panel"
      :class="{ transition: state !== 'dragging' }"
    >
      <slot />
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Gravity, PanelState } from './types'

@Component
export default class SlidingPanel extends Vue {
  @Prop()
  public state!: PanelState

  @Prop({ default: Gravity.BOTTOM })
  public gravity!: Gravity

  @Prop({ default: '4rem' })
  public collapsedOffset!: string

  @Prop({ default: '0' })
  public offset!: string

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

  @Prop({ default: true })
  public touchEnabled!: boolean

  @Prop({ default: false })
  public mouseFallbackEnabled!: boolean

  @Prop({ default: false })
  public disabled!: boolean

  /////////temporary variables for all direction sliding
  private oldOffset: number = 0
  private touchStartPosition: number = 0
  private draggingOffset: number = 0
  private oldState: PanelState = PanelState.HIDDEN
  /////////

  ///////// temporary variables for left or right sliding
  private touchStartPositionY: number = 0
  private innerScrollEnabled: boolean = false
  /////////

  mounted() {
    if (this.offset === '0')
      switch (this.gravity) {
        case Gravity.TOP:
        case Gravity.BOTTOM:
          this.offset = '50vh'
          break
        case Gravity.LEFT:
        case Gravity.RIGHT:
          this.offset = '80vw'
      }
  }

  /**
   * generate style based on the current state
   */
  get styles(): any {
    if (this.disabled) return {}

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
    return this.scrim && !(this.state === PanelState.HIDDEN || this.state === PanelState.COLLAPSED) && !this.disabled
  }

  dismiss() {
    this.$emit('update:state', this.dismissedState)
  }

  startSlide(e: TouchEvent) {
    const target = this.$refs.panel as HTMLElement

    this.oldState = this.state

    this.$emit('update:state', PanelState.DRAGGING)
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
        this.touchStartPositionY = e.targetTouches[0].screenY
        this.oldOffset = target.offsetLeft
        break
      case Gravity.RIGHT:
        this.touchStartPosition = e.targetTouches[0].screenX
        this.touchStartPositionY = e.targetTouches[0].screenY
        this.oldOffset = window.innerWidth - (target.offsetLeft + target.clientWidth)
    }
    this.draggingOffset = this.oldOffset
  }

  /**
   * init temporary variables
   */
  onTouchStart(e: TouchEvent) {
    if (!this.touchEnabled) return

    this.startSlide(e)
  }

  /**
   * calculate and update position
   */
  onTouchMove(e: TouchEvent) {
    if (!this.touchEnabled) return

    const target = this.$refs.panel as HTMLElement

    if (this.gravity === Gravity.BOTTOM) {
      const direction = (e.targetTouches[0].screenY - this.touchStartPosition) * -1 > 0 ? 'toExpand' : 'toCollapse'
      // scroll inside if already expanded
      if (this.oldState === PanelState.EXPANDED && (direction === 'toExpand' || target.scrollTop > 0)) return // cancel sliding

      if (this.oldState === PanelState.EXPANDED && (direction === 'toCollapse' || target.scrollTop === 0))
        this.startSlide(e)
    }

    if (this.gravity === Gravity.RIGHT || this.gravity === Gravity.LEFT) {
      if (
        Math.abs(e.targetTouches[0].screenY - this.touchStartPositionY) >
        Math.abs(e.targetTouches[0].screenX - this.touchStartPosition)
      )
        return // cancel sliding
    }

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

    if (e.cancelable) e.preventDefault()
  }

  /**
   * snap to closest position
   */
  onTouchEnd(e: TouchEvent) {
    if (!this.touchEnabled) return

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
      case PanelState.DRAGGING:
        if (
          this.anchorEnabled &&
          offsetInPixel * (this.anchorPosition + (1 - this.anchorPosition) * 0.9) < draggingOffsetEnd
        ) {
          this.$emit('update:state', PanelState.EXPANDED)
        } else if (
          this.anchorEnabled &&
          offsetInPixel * (this.anchorPosition + (1 - this.anchorPosition) * 0.9) > draggingOffsetEnd &&
          offsetInPixel * (this.anchorPosition * 0.9) < draggingOffsetEnd
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
    if (!this.touchEnabled || !this.mouseFallbackEnabled) return

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
  &.transition {
    transition: all 0.3s cubic-bezier(0, 0, 0.1, 1) 0s;
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
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
