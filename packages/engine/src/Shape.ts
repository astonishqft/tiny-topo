import * as zrender from 'zrender'
import Anchor from './Anchor'
import Handler from './Handler'
import Painter from './Painter'

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
  protected x: number
  protected y: number
  shapeInstance?: zrender.Displayable
  id: number
  anchor?: Anchor
  handler?: Handler
  painter: Painter | null = null

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
    
  }
}

export default Shape
