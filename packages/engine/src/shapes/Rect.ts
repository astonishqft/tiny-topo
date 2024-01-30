import * as zrender from 'zrender';
import Shape from '../Shape';
import { shapeConfig, getDefaultTextConfig } from '../shapeConfig';

class Rect extends Shape {
  constructor(x: number, y: number) {
    super(x, y);
  }

  getShape(): zrender.Displayable {
    const config = zrender.util.clone(shapeConfig['rect']);
    const textConfig = getDefaultTextConfig();
    const shape = new zrender.Rect({
      shape: {
        ...config.shape,
        x: this.x - config.shape.width / 2,
        y: this.y - config.shape.height / 2
      },
      style: config.style,
      ...textConfig, 
      draggable: true
    });

    return shape;
  }
}

export default Rect;
