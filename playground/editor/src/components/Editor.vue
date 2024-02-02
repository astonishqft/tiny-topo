<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as tinyEditor from '@qftjs/tiny-editor-engine'

const editor = ref<tinyEditor.TinyEditor>()

onMounted(() => {
  editor.value = new tinyEditor.TinyEditor(document.getElementById('tiny-editor') as HTMLElement)
})

const drop = (event: DragEvent) => {
  // 阻止默认行为（会作为某些元素的链接打开）
  event.preventDefault()

  const { offsetX, offsetY } = event
  const data = event.dataTransfer!.getData('addNode')

  const { nodeType } = JSON.parse(data)

  if (editor.value) {
    editor.value.createShape(nodeType, offsetX, offsetY)
  }
}

const dragOver = (event: DragEvent) => {
  // 在Vue 3中，可以使用@dragover.prevent或v-on:dragover.prevent指令来阻止浏览器的默认行为。如果没有阻止此事件的默认行为，浏览器将不会触发drop事件。
  event.preventDefault()
}
</script>

<template>
  <div class="tiny-editor-container" @drop="drop" @dragover="dragOver">
    <div id="tiny-editor"></div>
  </div>
</template>

<style scoped>
.tiny-editor-container {
  height: 100%;
  position: absolute;
  width: calc(100% - 445px);
  left: 185px;
  border-right: 1px solid #dadce0;
}
#tiny-editor {
  width: 100%;
  height: 100%;
}
</style>
