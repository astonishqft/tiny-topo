<script setup lang="ts">
import { inject } from 'vue'

const $bus = inject('$bus')

$bus.on('dragStart')
</script>

<template>
  <div class="editor">
    editor
  </div>

</template>

<style scoped>
.editor {
  height: 100%;
  position: absolute;
  width: calc(100% - 445px);
  left: 185px;
  border-right: 1px solid #dadce0;
}
</style>
