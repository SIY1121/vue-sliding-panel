<template>
  <section>
    <div class="row" style="background: #eee">
      <div style="width: 60%">
        <div class="small">
          Name
        </div>
        <div class="val">
          {{ name }}
        </div>
      </div>
      <div style="width: 100px">
        <div class="small">
          Default
        </div>
        <div class="val">
          {{ def }}
        </div>
      </div>
      <div style="width: 100px">
        <div class="small">
          type
        </div>
        <div class="val">
          {{ type }}
        </div>
      </div>
    </div>
    <div style="background: #fafafa;padding: .5em;">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class DescriptionCard extends Vue {
  @Prop() name!: string
  @Prop() def!: string
  @Prop() type!: string
}
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';
.row {
  display: flex;
  padding: 0.5em;
  justify-content: space-between;
  @include sp {
    flex-direction: column;
  }
}
.small {
  color: #888;
  font-size: 0.8rem;
}
.val {
  font-weight: bold;
}
</style>
