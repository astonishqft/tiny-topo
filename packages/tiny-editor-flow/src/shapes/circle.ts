import Konva from 'konva'
import Anchor from './anchor'
import type { IAnchors } from '../types'

export default class extends Konva.Circle {
  config: Konva.CircleConfig
  anchors: IAnchors
  anchor: Anchor

  constructor(config: Konva.CircleConfig) {
    super(config)
    this.config = config
    this.anchors = []
    this.createAnchors()
    this.anchor = new Anchor(this)
  }

  // 创建锚点，提供给连接线连接
  createAnchors() {
    const radius = this.getAttr('radius')
    const x = this.getAttr('x')
    const y = this.getAttr('y')

    const top = {
      x: x,
      y: y - radius,
      node: this,
      type: 'top'
    }

    const right = {
      x: x + radius,
      y: y,
      node: this,
      type: 'right'
    }

    const bottom = {
      x: x,
      y: y + radius,
      node: this,
      type: 'bottom'
    }

    const left = {
      x: x - radius,
      y: y,
      node: this,
      type: 'left'
    }

    this.anchors = [top, right, bottom, left]
  }

  active() {
    this.setAttr('fill', 'red')
  }
}
