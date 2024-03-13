import * as zrender from 'zrender'
import Shape from '../Shape'
import { shapeConfig, getDefaultTextConfig } from '../shapeConfig'
import Anchor from '../Anchor'
import Handler from '../Handler'

class RoundRect extends Shape {
  constructor(x: number, y: number) {
    super(x, y)
  }

  getShape(): zrender.Displayable {
    const { style, shape} = zrender.util.clone(shapeConfig['roundRect'])
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

export default RoundRect
