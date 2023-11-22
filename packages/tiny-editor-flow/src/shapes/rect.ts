import Konva from 'konva'
import Anchor from './anchor'
import { IAnchors } from 'types'

class Rect extends Konva.Rect {
  anchors: IAnchors
  config: Konva.RectConfig
  anchor: Anchor

  constructor(config: Konva.RectConfig) {
    super(config)
    this.config = config
    this.anchors = []
    this.createAnchors()
    this.anchor = new Anchor(this)
  }

  // 创建锚点，提供给连接线连接
  createAnchors() {
    const width = this.getAttr('width')
    const height = this.getAttr('height')
    const x = this.getAttr('x')
    const y = this.getAttr('y')
    const top = {
      node: this,
      type: 'top',
      x: x + width / 2,
      y: y
    }

    const right = {
      node: this,
      type: 'right',
      x: x + width,
      y: y + height / 2
    }

    const bottom = {
      node: this,
      type: 'bottom',
      x: x + width / 2,
      y: y + height
    }

    const left = {
      x: x,
      y: y + height / 2,
      node: this,
      type: 'left'
    }

    this.anchors = [top, right, bottom, left]
  }

  active() {
    this.setAttr('fill', 'red')
  }
}

export default Rect
