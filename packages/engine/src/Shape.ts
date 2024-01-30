import * as zrender from 'zrender'

abstract class Shape {
  protected x: number;
  protected y: number;
  id: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.id = zrender.util.guid()
  }

  abstract getShape(): zrender.Element;
}

export default Shape;
