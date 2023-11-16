<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TinyFlowEditor } from '@qftjs/tiny-editor-flow'

const editor = ref<TinyFlowEditor>()

onMounted(() => {
  editor.value = new TinyFlowEditor({
    containerId: 'tiny-editor',
    width: 1000,
    height: 800
  })
})

const dragStart = (event: DragEvent) => {
  event.preventDefault()
}

const drop = (event: DragEvent) => {
  // 阻止默认行为（会作为某些元素的链接打开）
  event.preventDefault()
  console.log('event', event)
  const { offsetX, offsetY } = event
  const data = event.dataTransfer!.getData('addNode')

  const { nodeType } = JSON.parse(data)

  if (editor.value) {
    console.log('editor', editor.value)
    editor.value.addNode({ nodeType, shapeConfig: { x: offsetX, y: offsetY } })
  }
}

const dragOver = (event: DragEvent) => {
  // 在Vue 3中，可以使用@dragover.prevent或v-on:dragover.prevent指令来阻止浏览器的默认行为。如果没有阻止此事件的默认行为，浏览器将不会触发drop事件。
  event.preventDefault()
}
</script>

<template>
  <div class="tiny-editor-container" @drop="drop" @dragstart="dragStart" @dragover="dragOver">
    <canvas id="tiny-editor"></canvas>
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
</style>
