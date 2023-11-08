import * as zrender from 'zrender'
import BaseShape from './baseShape'
import TinyFlowEditor from '../tinyFlowEditor'
import type { IShapeConfig } from '../types'

class Circle extends BaseShape {
  private config
  private node: zrender.Element

  constructor(editor: TinyFlowEditor, config: IShapeConfig) {
    super(editor, config)
    this.config = config

    this.node = this.createNode()
  }

  createNode() {
    return new zrender.Circle({
      shape: {
        cx: this.config.offsetX,
        cy: this.config.offsetY,
        r: 30
      },
      style: {
        fill: '#fff',
        stroke: '#000',
        lineWidth: 1
      }
    })
  }

  getNode() {
    return this.node
  }
}

export default Circle;
