import * as zrender from 'zrender'
import Shape, { type ShapeInitOpts } from '../Shape'
import { shapeConfig, getDefaultTextConfig } from '../shapeConfig'
import Anchor from '../Anchor'
import Handler from '../Handler'

class Rect extends Shape {
  constructor({ position, painter }: ShapeInitOpts) {
    const {x, y} = position
    super(x, y)
    this.painter = painter
  }

  getShape(): zrender.Displayable {
    const { style, shape} = zrender.util.clone(shapeConfig['rect'])
    const textConfig = getDefaultTextConfig()
    this.shapeInstance = new zrender.Rect({
      shape: {
        ...shape,
        x: this.x - shape.width / 2,
        y: this.y - shape.height / 2
      },
      style,
      ...textConfig, 
      draggable: true
    })

    // 添加锚点
    this.anchor = new Anchor(this)
    this.handler = new Handler(this)
    return this.shapeInstance
  }
}

export default Rect
