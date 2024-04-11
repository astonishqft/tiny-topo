import * as zrender from 'zrender'
import Anchor from './Anchor'
import Handler from './Handler'
import Painter from './Painter'
import type { BuiltinTextPosition, FontStyle, FontWeight } from 'zrender/lib/core/types'

export interface IAnchor {
  x: number
  y: number
  index: number
  direction: string
  boundingBox: { x: number, y: number, width: number, height: number}
}

export interface ShapeInitOpts {
  position: { x: number, y: number },
  painter: Painter
}

export type IAnchors = IAnchor[]

abstract class Shape {
  nodeType = 'shape'
  protected x: number
  protected y: number
  shapeInstance?: zrender.Displayable
  id: number
  anchor?: Anchor
  handler?: Handler
  painter: Painter | null = null
  fontSize: number = 12
  lineDash: number[] = [0, 0]
  textPosition: BuiltinTextPosition = 'inside'
  lineWidth = 1
  strokeColor: null | string = '#1e1e1e'
  fillColor: null | string = '#fff'
  strokeType: string = 'solid'
  fontColor: string | undefined = '#1e1e1e'
  nodeText: string = 'title'
  fontWeight: FontWeight | undefined = 'normal'
  fontItalic: FontStyle | undefined = 'normal'
  selected: boolean = false // 是否被选中

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.id = zrender.util.guid()
  }

  abstract getShape(): zrender.Displayable

  createAnchors(): IAnchors {
    const boundingBox = this.getBoundingRect()

    // 创建四个锚点
    return [
      { x: boundingBox.x + boundingBox.width / 2, y: boundingBox.y, index: 1, direction: 'top', boundingBox },
      { x: boundingBox.x + boundingBox.width, y: boundingBox.y + boundingBox.height / 2, index: 2, direction: 'right', boundingBox },
      { x: boundingBox.x + boundingBox.width / 2, y: boundingBox.y + boundingBox.height, index: 3, direction: 'bottom', boundingBox},
      { x: boundingBox.x, y: boundingBox.y + boundingBox.height / 2, index: 4, direction: 'left', boundingBox }
    ]
  }

  getBoundingRect() {
    const g = new zrender.Group()
    return g.getBoundingRect([this.shapeInstance as zrender.Displayable])
  }

  getAnchorByIndex(index: number) {
    return this.anchor!.anchors.filter(item => item.index == index)[0]
  }

  unActive() {
    this.shapeInstance?.setStyle({
      shadowColor: '',
      shadowBlur: 0
    }) 

    this.selected = false
  }

  isActive() {
    return this.selected
  }

  active() {
    this.shapeInstance?.setStyle({
      shadowColor: '#e85827',
      shadowBlur: 4
    })

    this.selected = true
  }

  setFontSize(fontSize: number) {
    this.fontSize = fontSize
    this.shapeInstance?.getTextContent()?.setStyle({
      fontSize
    })
  }

  setFontColor(color: string | undefined) {
    this.fontColor = color
    this.shapeInstance?.getTextContent()?.setStyle({
      fill: color
    })
  }

  setShapeText(text: string) {
    this.nodeText = text
    this.shapeInstance?.getTextContent()?.setStyle({
      text: text
    })
  }

  setStrokeColor(color: string | null) {
    this.strokeColor = color
    this.shapeInstance?.setStyle({
      stroke: color
    })
  }

  setFillColor(color: string | null) {
    this.fillColor = color
    this.shapeInstance?.setStyle({
      fill: color
    })
  }

  setLineWidth(width: number) {
    this.lineWidth = width
    this.shapeInstance?.setStyle({
      lineWidth: width
    })
  }

  setFontWeight() {
    this.fontWeight = this.fontWeight === 'normal' ? 'bold' : 'normal'
    this.shapeInstance?.getTextContent()?.setStyle({
      fontWeight: this.fontWeight
    })
  }

  setFontItalic() {
    this.fontItalic = this.fontItalic === 'normal' ? 'italic' : 'normal'
    this.shapeInstance?.getTextContent()?.setStyle({
      fontStyle: this.fontItalic
    })
  }

  setStrokeType(type: string) {
    if (type === 'dashed') {
      this.lineDash = [5,5] 
    } else if (type === 'dotted') {
      this.lineDash = [2, 2]
    }
    this.shapeInstance?.setStyle({
      lineDash: this.lineDash
    })
    this.strokeType = type
  }

  setTextPosition(position: BuiltinTextPosition) {
    this.textPosition = position
    this.shapeInstance?.setTextConfig({
      position
    })
  }
}

export default Shape
