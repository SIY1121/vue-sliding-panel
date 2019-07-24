<template>
  <section class="document-root">
    <h1 class="title">Event Handling</h1>
    <p>
      Supporting click event, you need to add stop modifier to put clickable elements in panel.
    </p>
    <highlight-code lang="vue">
      &lt;sliding-panel&gt;
        &lt;button @click.stop="onClick"&gt;Click Me!&lt;/button&gt;
      &lt;/sliding-panel&gt;
    </highlight-code>
    <p>
      If you don't add it, panel will move unexpectedly.
    </p>
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
export default class EventHandling extends Vue {}
</script>

<style scoped>

</style>