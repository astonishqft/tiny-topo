import zrender from 'zrender'
import BaseShape from './baseShape'
import TinyFlowEditor from '../tinyFlowEditor'
import type { IShapeConfig } from '../types'

class Circle extends zrender.Circle {
  constructor(editor: TinyFlowEditor, config: IShapeConfig) {
    super()

    this.editor = editor

    this.sh
  }
}

export default Circle;
