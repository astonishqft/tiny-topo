<script setup lang="ts">
import { ref, watch } from 'vue'
import { useEditorStore } from '@/stores/editor'
import CanvasProperty from './elementProperty/CanvasProperty.vue'
import NodeProperty from './elementProperty/NodeProperty.vue'
import LinkProperty from './elementProperty/LinkProperty.vue'

const selectNameMap: Record<string, string> = {
  canvas: '画布属性',
  shape: '节点属性',
  link: '连线属性'
}

const editorStore = useEditorStore()

const title = ref('')

watch(
  () => editorStore.currentActiveProperty,
  (newVal) => {
    title.value = selectNameMap[newVal]
  }
)
</script>

<template>
  <div class="property">
    <div class="property-title">{{ title }}</div>
    <div class="property-content">
      <CanvasProperty v-show="editorStore.currentActiveProperty === 'canvas'" />
      <NodeProperty v-show="editorStore.currentActiveProperty === 'shape'" />
      <LinkProperty v-show="editorStore.currentActiveProperty === 'link'" />
    </div>
  </div>
</template>

<style scoped>
.property {
  width: 260px;
  position: absolute;
  right: 0;
  top: 40px;
  height: calc(100% - 200px);
  border-bottom: 1px solid #dadce0;
  .property-title {
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    font-size: 14px;
    border-bottom: 1px solid #e5e5e5;
    font-weight: bold;
  }
}
</style>
