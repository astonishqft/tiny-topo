import * as zrender from 'zrender'
import Shape from '../Shape'
import { shapeConfig, getDefaultTextConfig } from '../shapeConfig'

class Rect extends Shape {
  constructor(x: number, y: number) {
    super(x, y)
  }

  getShape(): zrender.Displayable {
    const { defaultStyleConfig, defaultShapeConfig} = zrender.util.clone(shapeConfig['rect'])
    const textConfig = getDefaultTextConfig()
    this.shapeInstance = new zrender.Rect({
      shape: {
        ...defaultShapeConfig,
        x: this.x - defaultShapeConfig.width / 2,
        y: this.y - defaultShapeConfig.height / 2
      },
      style: defaultStyleConfig,
      ...textConfig, 
      draggable: true
    })

    return this.shapeInstance
  }
}

export default Rect
