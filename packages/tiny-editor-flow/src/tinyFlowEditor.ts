import * as zrender from 'zrender'
import { ShapeManage } from './shapes/shapeManage'
import type { TinyFlowEditorOptions, AddNodeType } from './types'

const { Group } = zrender;

class TinyFlowEditor extends Group {
  private _zr: zrender.ZRenderType;
  private nodes: zrender.Element[] = []
  private connectLines: zrender.Element[] = []
  private groups: zrender.Group[] = []
  private shapeManage: ShapeManage

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

    this.shapeManage = new ShapeManage()
    this._zr.add(this);

    this.initEvent()
  }

  addNode({ nodeType, shapeConfig }: AddNodeType) {
    const { x, y } = shapeConfig
    if (x && y) {
      const node = this.shapeManage.getShape(nodeType, { x, y })
      this._zr.add(node)
    }
  }

  initEvent() {
    this._zr.on('selectNode', ({ node }) => {
      node.active()
    })
  }
}

export default TinyFlowEditor;
