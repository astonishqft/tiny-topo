import * as zrender from 'zrender';
import Stage from './Stage';
import Shape from './Shape';
import Rect from './shapes/Rect';

class Painter {
  _zr: zrender.ZRenderType;
  _layer: zrender.Group;
  stage: Stage;

  constructor(dom: HTMLElement, opts: zrender.ZRenderInitOpt, stage: Stage) {
    this.stage = stage;
    this._zr = zrender.init(dom, opts);
    this._layer = new zrender.Group();
    this._zr.add(this._layer);
  }

  createShape(type: string, x: number, y: number) {
    let shape: Shape;

    switch (type) {
      case 'rect':
        shape = new Rect(x, y);
        break;
      default:
        throw new Error('Invalid shape type');
    }

    this.stage.add(shape);
    this._layer.add(shape.getShape());
  }
}

export default Painter;
