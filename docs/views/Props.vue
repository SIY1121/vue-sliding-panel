<template>
  <section class="document-root">
    <h1 class="title">Props</h1>
    <card name="state.sync" def="undefined" type="PanelState">
      State of panel.<br>
      <span class="highlight">'hidden', 'collapsed', 'anchored', 'expanded' 'dragging'</span> are available.<br>
    </card>
    <card name="gravity" def="bottom" type="Gravity">
      Sliding direction. <br>
      <span class="highlight">'top', 'right', 'bottom', 'left'</span> are available.
    </card>
    <card name="collapsedOffset" def="4rem" type="string">
      Height or width of collapsed panel.
    </card>
    <card name="offset" def="" type="string">
      Height or width of expanded panel.
    </card>
    <card name="scrim" def="true" type="boolean">
      Show scrim.
    </card>
    <card name="scrimColor" def="rgba(0,0,0,.5)" type="string">
      Color of scrim.
    </card>
    <card name="dismissedState" def="collapsed" type="PanelState">
      State when panel is dismissed by clicking on the scrim.
    </card>
    <card name="anchorPosition" def="0.5" type="number">
      Anchor position described by 0.0 - 1.0.
    </card>
    <card name="anchorEnabled" def="false" type="boolean">
      Enables anchor.
    </card>
    <card name="touchEnabled" def="true" type="boolean">
      Enables user touch operation.
    </card>
  </section>
</template>

<script lang="ts">
  import Card from '@/components/DescriptionCard.vue'
  /* eslint prettier/prettier: 0 */
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import SlidingPanel from "lib/SlidingPanel.vue"
  @Component({
    components: {SlidingPanel, Card }
  })
  export default class QuickStart extends Vue {}
</script>

<style lang="scss">
  .hljs {
    margin: 1rem 0;
    line-height: 1.5rem;
  }
  .highlight {
    background: #ddd;
  }
</style>
