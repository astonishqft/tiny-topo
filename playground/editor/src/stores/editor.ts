import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', () => {
  const shapeLinkType = ref('ortogonalLine')
  function changeShapeLinkType(type: string) {
    shapeLinkType.value = type
  }

  return { shapeLinkType, changeShapeLinkType }
})
