import * as zrender from 'zrender'
// import BaseShape from './baseShape'
// import TinyFlowEditor from '../tinyFlowEditor'
// import type { IShapeConfig } from '../types'

class Circle extends zrender.Circle {
  private config: zrender.CircleProps

  constructor(config: zrender.CircleProps) {
    super(config)
    this.config = config
  }

  active() {

  }
}

export default Circle;
