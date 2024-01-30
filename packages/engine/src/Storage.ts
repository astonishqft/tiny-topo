import Shape from './Shape';

class Storage {
  shapes: Shape[] = []

  constructor () {

  }

  add(...shapes: Shape[]) {
    this.shapes.push(...shapes)
  }

  /**
   * 获取所有元素
   */
  getAllShapes () {
    return this.shapes
  }
}

export default Storage;
