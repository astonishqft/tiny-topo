
import * as zrender from 'zrender'
import Storage from './Storage'
import Painter from './Painter'

class TinyEditor {
  painter: Painter
  storage: Storage

  constructor(dom: HTMLElement, opts: zrender.ZRenderInitOpt = {}) {
    this.storage = new Storage()
    this.painter = new Painter(dom, opts, this.storage)
  }

  createShape(type: string, x: number, y: number) {
    this.painter.createShape(type, x, y)
  }

  setLineType(type: string) {
    this.painter.setLineType(type)
  }
}

export default TinyEditor
