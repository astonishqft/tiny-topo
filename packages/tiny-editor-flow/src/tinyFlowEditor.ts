import * as zrender from 'zrender'
import { Shape } from './shapes/shape'
import type { TinyFlowEditorOptions, AddNodeType } from './types'

const { Group } = zrender;

class TinyFlowEditor extends Group {
  private _zr: zrender.ZRenderType;
  private nodes: zrender.Element[] = []
  private connectLines: zrender.Element[] = []
  private groups: zrender.Group[] = []
  private shape: Shape

  constructor(opts: TinyFlowEditorOptions) {
    super();

    const { container, devicePixelRatio } = opts;
    if (!container) {
      throw new Error('Initialize failed: invalid dom.');
    }

    this._zr = zrender.init(container, {
      renderer: 'canvas',
      devicePixelRatio: devicePixelRatio || 2
    })

    this.shape = new Shape(this);
    this._zr.add(this);
  }

  addNode({ nodeType, offsetX, offsetY }: AddNodeType) {
    console.log('nodeType', nodeType)
    console.log('offsetX', offsetX)
    console.log('offsetY', offsetY)

    const node = this.shape.getShape(nodeType, { offsetX, offsetY })

    this._zr.add(node.getNode())
  }
}

export default TinyFlowEditor;
