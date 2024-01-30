
import * as zrender from 'zrender';
import Stage from './Storage';
import Painter from './Painter';

class TinyFlowEditor {
  painter: Painter;
  stage: Stage;

  constructor(dom: HTMLElement, opts: zrender.ZRenderInitOpt = {}) {
    this.stage = new Stage();
    this.painter = new Painter(dom, opts, this.stage);
  }

  createShape(type: string, x: number, y: number) {
    this.painter.createShape(type, x, y);
  }
}

export default TinyFlowEditor;
