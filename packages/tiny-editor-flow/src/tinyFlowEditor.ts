import * as zrender from 'zrender'

import type { TinyFlowEditorOptions, AddNodeType } from './types'

const { Group } = zrender;

class TinyFlowEditor extends Group {
  private _zr: zrender.ZRenderType;
  private nodes: zrender.Element[] = []
  private connectLines: zrender.Element[] = []
  private groups: zrender.Group[] = []

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

    this._zr.add(this);
  }

  addNode({ nodeType, offsetX, offsetY }: AddNodeType) {
    console.log('nodeType', nodeType)
    console.log('offsetX', offsetX)
    console.log('offsetY', offsetY)
  }
}

export default TinyFlowEditor;
