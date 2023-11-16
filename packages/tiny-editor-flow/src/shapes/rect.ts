import Konva from 'konva'
// import BaseShape from './baseShape'
// import TinyFlowEditor from '../tinyFlowEditor'
// import type { IShapeConfig } from '../types'

export default class extends Konva.Rect {
  private config: Konva.RectConfig

  constructor(config: Konva.RectConfig) {
    super(config)
    this.config = config
  }

  active() {

  }
}
