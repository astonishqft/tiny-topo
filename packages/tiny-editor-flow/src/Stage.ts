import Shape from './Shape';

class Stage {
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

export default Stage;
