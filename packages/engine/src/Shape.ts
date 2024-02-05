import * as zrender from 'zrender'
import Anchor from './Anchor'
import Handler from './Handler'

export interface IAnchor {
  x: number
  y: number
  index: number
}

export type IAnchors = IAnchor[]

abstract class Shape {
  protected x: number
  protected y: number
  shapeInstance?: zrender.Displayable
  id: number
  anchor?: Anchor
  handler?: Handler

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.id = zrender.util.guid()
  }

  abstract getShape(): zrender.Displayable

  abstract createAnchors(): IAnchors

  getBoundingRect() {
    const g = new zrender.Group()
    return g.getBoundingRect([this.shapeInstance as zrender.Displayable])
  }
}

export default Shape
