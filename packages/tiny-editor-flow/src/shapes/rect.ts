import { Rect, RectProps } from 'fabric'
// import BaseShape from './baseShape'
// import TinyFlowEditor from '../tinyFlowEditor'
// import type { IShapeConfig } from '../types'

export default class extends Rect {
  private config: Partial<RectProps>

  constructor(config: Partial<RectProps>) {
    super(config)
    this.config = config
  }

  active() {

  }
}
