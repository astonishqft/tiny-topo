<script setup lang="ts">
import { ref } from 'vue'
const editText = ref<HTMLElement>()
const emit = defineEmits<{
  (e: 'onBlur', text: string): void
}>()
const show = ({
  x,
  y,
  width,
  height,
  text
}: {
  x: number
  y: number
  width: number
  height: number
  text: string
}) => {
  if (editText.value) {
    editText.value.style.position = 'fixed'
    editText.value.style.display = 'block'
    editText.value.style.left = `${x + 185}px`
    editText.value.style.top = `${y + 40}px`
    editText.value.style.width = `${width}px`
    editText.value.style.height = `${height}px`
    editText.value.innerText = text
    editText.value.focus()
  }
}
const hide = () => {
  if (editText.value) {
    editText.value.style.display = 'none'
  }
}
const blur = () => {
  emit('onBlur', editText.value?.innerText || '')
  hide()
}
defineExpose({
  show,
  hide
})
</script>
<template>
  <div class="edit-text" ref="editText" contenteditable="true" @blur="blur" />
</template>

<style scoped>
.edit-text {
  display: none;
  background: #fff;
}
</style>
