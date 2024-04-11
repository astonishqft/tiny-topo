import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as tinyEditor from '@qftjs/tiny-editor-engine'

export const useEditorStore = defineStore('editor', () => {
  const shapeLinkType = ref('ortogonalLine') // 节点之间的连线类型 直线、曲线、折线

  const currentActiveProperty = ref('canvas') // canvas、shape、link
  const selectedShape = ref<tinyEditor.Shape | null>(null)
  const selectedLink = ref<tinyEditor.Link | null>(null)
  function changeShapeLinkType(type: string) {
    shapeLinkType.value = type
  }

  function changeCurrentActiveProperty(type: string) {
    currentActiveProperty.value = type
  }

  function setSelectedShape(shape: tinyEditor.Shape | null) {
    selectedShape.value = shape
  }

  function setSelectedLink(link: tinyEditor.Link | null) {
    selectedLink.value = link
  }

  return {
    shapeLinkType,
    changeShapeLinkType,
    currentActiveProperty,
    changeCurrentActiveProperty,
    selectedShape,
    setSelectedShape,
    selectedLink,
    setSelectedLink
  }
})
