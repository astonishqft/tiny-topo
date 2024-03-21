import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', () => {
  const lineType = ref('ortogonalLine')
  function setLineType(type: string) {
    lineType.value = type
  }

  return { lineType, setLineType }
})
