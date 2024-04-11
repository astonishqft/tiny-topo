<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as tinyEditor from '@qftjs/tiny-editor-engine'
import { usePropertyStore } from '@/stores/property'
import { useEditorStore } from '@/stores/editor'
import EditText from './EditText.vue'

const propertyStore = usePropertyStore()
const editorStore = useEditorStore()
const editor = ref<tinyEditor.TinyEditor>()
const editTextRef = ref<InstanceType<typeof EditText> | null>(null)

const editeNode = ref<tinyEditor.Shape | null>(null)
const editLink = ref<tinyEditor.Link | null>(null)

onMounted(() => {
  editor.value = new tinyEditor.TinyEditor(document.getElementById('tiny-editor') as HTMLElement)

  watch(
    () => editorStore.shapeLinkType,
    (newValue) => {
      editor.value?.painter.changeShapeLinkType(newValue)
    }
  )

  propertyStore.$onAction(({ name, args }) => {
    switch (name) {
      case 'setShapeBgColor':
        editor.value?.painter.setShapeBgColor(args[0])
        break
      case 'setShapeFontColor':
        editor.value?.painter.setShapeFontColor(args[0])
        break
      case 'setShapeFontSize':
        editor.value?.painter.setShapeFontSize(args[0])
        break
      case 'setShapeFontItalic':
        editor.value?.painter.setShapeFontItalic()
        break
      case 'setShapeFontWeight':
        editor.value?.painter.setShapeFontWeight()
        break
      case 'setShapeStrokeColor':
        editor.value?.painter.setShapeStrokeColor(args[0])
        break
      case 'setShapeLineWidth':
        editor.value?.painter.setShapeLineWidth(args[0])
        break
      case 'setShapeText':
        editor.value?.painter.setShapeText(args[0])
        break
      case 'setShapeStrokeType':
        editor.value?.painter.setShapeStrokeType(args[0])
        break
      case 'setShapeTextPosition':
        editor.value?.painter.setShapeTextPosition(args[0])
        break
      case 'setLinkFontColor':
        editor.value?.painter.setLinkFontColor(args[0])
        break
      case 'setLinkFontSize':
        editor.value?.painter.setLinkFontSize(args[0])
        break
      case 'setLinkFontItalic':
        editor.value?.painter.setLinkFontItalic()
        break
      case 'setLinkFontWeight':
        editor.value?.painter.setLinkFontWeight()
        break
      case 'setLinkText':
        editor.value?.painter.setLinkText(args[0])
        break
      case 'setLinkStrokeColor':
        editor.value?.painter.setLinkStrokeColor(args[0])
        break
      case 'setLinkWidth':
        editor.value?.painter.setLinkWidth(args[0])
        break
      case 'setLinkStrokeType':
        editor.value?.painter.setLinkStrokeType(args[0])
        break
      case 'changeShapeLinkType':
        editor.value?.painter.setShapeLinkType(args[0])
        break
      default:
        break
    }
  })

  editor.value.painter._zr.on('selectNode', (e: tinyEditor.Shape) => {
    editorStore.setSelectedShape(e)
    editorStore.changeCurrentActiveProperty('shape')
  })

  editor.value.painter._zr.on('selectLink', (e: tinyEditor.Link) => {
    editorStore.setSelectedLink(e)
    editorStore.changeCurrentActiveProperty('link')
  })

  editor.value.painter._zr.on('selectCanvas', () => {
    editorStore.setSelectedShape(null)
    editorStore.setSelectedLink(null)
    editorStore.changeCurrentActiveProperty('canvas')
  })

  editor.value.painter._zr.on('dbClickNode', (e: tinyEditor.Shape) => {
    const g = new tinyEditor.zrender.Group()
    editeNode.value = e
    editTextRef.value?.show({
      ...g.getBoundingRect([e.shapeInstance]),
      text: e.shapeInstance.getTextContent().style.text
    })
  })

  editor.value.painter._zr.on('dbClickLink', (e: tinyEditor.Link) => {
    editLink.value = e
    editTextRef.value?.show({
      x: e.textPoints[0] - 40,
      y: e.textPoints[1] - 14,
      width: 80,
      height: 28,
      text: e.linkText.style.text
    })
  })
})

const handleTextEditBlur = (text: string) => {
  editeNode.value?.setShapeText(text)
  editLink.value?.setLinkText(text)
  if (!text) {
    editLink.value?.linkText.hide()
  }
  editeNode.value = null
  editLink.value = null
}

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
    <edit-text ref="editTextRef" @on-blur="handleTextEditBlur" />
  </div>
</template>

<style scoped>
.tiny-editor-container {
  height: calc(100% - 40px);
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
