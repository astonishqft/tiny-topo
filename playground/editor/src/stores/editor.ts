import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', () => {
  const lineType = ref('ortogonalLine')
  function setShapeLinkType(type: string) {
    changeShapeLinkType.value = type
  }

  return { changeShapeLinkType, setShapeLinkType }
})
