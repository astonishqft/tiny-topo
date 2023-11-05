import * as zrender from 'zrender'
import CanvasPainter from 'zrender/lib/canvas/Painter.js';
import TinyFlowEditor from './tinyFlowEditor'

const { registerPainter} = zrender
registerPainter('canvas', CanvasPainter);

export {
  TinyFlowEditor
}

