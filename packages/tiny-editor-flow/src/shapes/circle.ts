import Konva from 'konva'

export default class extends Konva.Circle {
  private config: Konva.CircleConfig
  private anchors: any[]

  constructor(config: Konva.CircleConfig) {
    super(config)
    this.config = config
    this.anchors = [1, 2, 3, 4, 5]
  }

  // 创建锚点，提供给连接线连接
  createAnchors() {
    const top = {
      x: this.width / 2 + this.left,
      y: this.top,
      node: this,
      type: 'top'
    }

    const right = {
      x: this.width + this.left,
      y: this.height + this.top,
      node: this,
      type: 'right'
    }
  }
}
