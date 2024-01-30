import * as zrender from 'zrender';
import Stage from './Storage';
import Shape from './Shape';
import Rect from './shapes/Rect';

class Painter {
  _zr: zrender.ZRenderType;
  _layer: zrender.Group;
  storage: Stage;

  constructor(dom: HTMLElement, opts: zrender.ZRenderInitOpt, storage: Stage) {
    this.storage = storage;
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

    this.storage.add(shape);
    this._layer.add(shape.getShape());
  }
}

export default Painter;
