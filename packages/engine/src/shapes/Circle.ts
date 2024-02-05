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
    const { style, shape} = zrender.util.clone(shapeConfig['circle'])
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

  createAnchors() {
    const { x, y, width, height} = this.getBoundingRect()
    const radius = width / 2

    // 创建四个锚点
    return [
      { x: x + width / 2, y, index: 1 }, // 上
      { x: x + width, y: y + height / 2, index: 2 }, // 右
      { x: x + width / 2, y: y + height, index: 3 }, // 下
      { x: x, y: y + height / 2, index: 4 }, // 左
      { x: x + width / 2 + Math.cos((Math.PI * 2)*(1 / 8)) * radius, y: y + height / 2 + Math.sin((Math.PI * 2)*(1 / 8)) * radius, index: 5 }, // 右下
      { x: x + width / 2 - Math.cos((Math.PI * 2)*(1 / 8)) * radius, y: y + height / 2 + Math.sin((Math.PI * 2)*(1 / 8)) * radius, index: 6 }, // 左下
      { x: x + width / 2 - Math.cos((Math.PI * 2)*(1 / 8)) * radius, y: y + height / 2 - Math.sin((Math.PI * 2)*(1 / 8)) * radius, index: 7 }, // 左上
      { x: x + width / 2 + Math.cos((Math.PI * 2)*(1 / 8)) * radius, y: y + height / 2 - Math.sin((Math.PI * 2)*(1 / 8)) * radius, index: 8 } // 右上
    ]
  }
}

export default Circle
