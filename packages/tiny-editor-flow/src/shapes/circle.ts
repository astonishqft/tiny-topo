import * as zrender from 'zrender'
// import BaseShape from './baseShape'
// import TinyFlowEditor from '../tinyFlowEditor'
// import type { IShapeConfig } from '../types'

class Circle extends zrender.Circle {
  private config: zrender.CircleProps

  constructor(config: zrender.CircleProps) {
    super(config)
    this.config = config

    // this.node = this.createNode()
  }

  // createNode() {
  //   const styleConfig = this.getDefaultStyle()
  //   return new zrender.Circle({
  //     shape: {
  //       cx: this.config.offsetX,
  //       cy: this.config.offsetY,
  //       r: 30
  //     },
  //     style: {
  //       fill: '#fff',
  //       stroke: '#333',
  //       lineWidth: 1
  //     },
  //     textContent: new zrender.Text({
  //       style: {
  //         text: 'titile',
  //         fill: '#333',
  //         x: this.config.offsetX,
  //         y: this.config.offsetY
  //       }
  //     })
  //   })
  // }
}

export default Circle;
