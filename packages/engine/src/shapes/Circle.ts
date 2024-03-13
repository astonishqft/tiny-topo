import * as zrender from 'zrender'
import Shape from '../Shape'
import { shapeConfig, getDefaultTextConfig } from '../shapeConfig'
import Anchor from '../Anchor'
import Handler from '../Handler'

class Circle extends Shape {
  constructor(x: number, y: number) {
    super(x, y)
  }

  getShape(): zrender.Displayable {
    const { style, shape } = zrender.util.clone(shapeConfig['circle'])
    const textConfig = getDefaultTextConfig()
    this.shapeInstance = new zrender.Circle({
      shape: {
        ...shape,
        cx: this.x,
        cy: this.y
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

export default Circle
