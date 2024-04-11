import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as tinyEditor from '@qftjs/tiny-editor-engine'

export const usePropertyStore = defineStore('property', () => {
  const shapeBgColor = ref<string | null>(null)
  // 节点的相关属性
  const shapeStrokeColor = ref<string | null>(null)
  const shapeFontColor = ref<string | undefined>(undefined)
  const shapeFontSize = ref<number>(12)
  const shapeText = ref('title')
  const shapeTextPosition = ref<tinyEditor.BuiltinTextPosition>('indide')
  const shapeFontWeight = ref('normal')
  const shapeStrokeType = ref<string>('solid')
  const shapeFontItalic = ref('normal')
  const shapeLineWidth = ref<number>(1) // 节点的宽度

  const shapeLinkType = ref('ortogonalLine') // 节点之间的连线类型 直线、曲线、折线
  const linkFontColor = ref<string | undefined>(undefined)
  const linkFontText = ref<string>('')
  const linkFontSize = ref<number>(12)
  const linkWidth = ref<number>(1) // 连线的宽度
  const linkStrokeType = ref<string>('solid')

  const linkFontWeight = ref('normal')
  const linkFontItalic = ref('normal')

  const linkStrokeColor = ref<string | undefined>(undefined)
  // setShape 开头表示设置的是节点的属性
  function setShapeBgColor(color: string | null) {
    shapeBgColor.value = color
  }

  function setShapeStrokeColor(color: string | null) {
    shapeStrokeColor.value = color
  }

  function setShapeFontSize(size: number) {
    shapeFontSize.value = size
  }

  function setShapeLineWidth(width: number) {
    shapeLineWidth.value = width
  }

  function setShapeStrokeType(type: string) {
    shapeStrokeType.value = type
  }

  function setShapeTextPosition(position: tinyEditor.BuiltinTextPosition) {
    shapeTextPosition.value = position
  }

  function setShapeFontColor(color: string | undefined) {
    shapeFontColor.value = color
  }

  function setShapeFontWeight() {
    shapeFontWeight.value = shapeFontWeight.value === 'normal' ? 'bold' : 'normal'
  }

  function setShapeFontItalic() {
    shapeFontItalic.value = shapeFontItalic.value === 'normal' ? 'italic' : 'normal'
  }

  function setShapeText(text: string) {
    shapeText.value = text
  }

  function setLinkFontColor(color: string | undefined) {
    linkFontColor.value = color
  }

  function setLinkStrokeColor(color: string | undefined) {
    linkStrokeColor.value = color
  }

  function setLinkFontSize(size: number) {
    linkFontSize.value = size
  }

  function setLinkWidth(size: number) {
    linkWidth.value = size
  }

  function setLinkStrokeType(type: string) {
    linkStrokeType.value = type
  }

  function setLinkText(text: string) {
    linkFontText.value = text
  }

  function setLinkFontWeight() {
    linkFontWeight.value = linkFontWeight.value === 'bold' ? 'normal' : 'bold'
  }

  function setLinkFontItalic() {
    linkFontItalic.value = linkFontItalic.value === 'normal' ? 'italic' : 'normal'
  }

  function changeShapeLinkType(type: string) {
    shapeLinkType.value = type
  }
  return {
    shapeBgColor,
    setShapeBgColor,
    shapeStrokeColor,
    setShapeStrokeColor,
    shapeFontSize,
    setShapeFontSize,
    shapeLineWidth,
    setShapeLineWidth,
    shapeStrokeType,
    setShapeStrokeType,
    shapeTextPosition,
    setShapeTextPosition,
    shapeFontColor,
    setShapeFontColor,
    setShapeFontWeight,
    setShapeFontItalic,
    shapeFontWeight,
    shapeFontItalic,
    linkFontWeight,
    shapeLinkType,
    changeShapeLinkType,
    setLinkFontWeight,
    linkFontItalic,
    setLinkFontItalic,
    setShapeText,
    shapeText,
    linkFontColor,
    setLinkFontColor,
    linkStrokeColor,
    setLinkStrokeColor,
    linkFontSize,
    setLinkFontSize,
    linkWidth,
    setLinkWidth,
    linkStrokeType,
    setLinkStrokeType,
    linkFontText,
    setLinkText
  }
})
