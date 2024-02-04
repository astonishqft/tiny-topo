import * as zrender from 'zrender'
import Shape from '../Shape'
import { shapeConfig, getDefaultTextConfig } from '../shapeConfig'

class Rect extends Shape {
  constructor(x: number, y: number) {
    super(x, y)
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

    return this.shapeInstance
  }
}

export default Rect
