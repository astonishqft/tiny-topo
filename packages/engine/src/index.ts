
import * as zrender from 'zrender';
import CanvasPainter from 'zrender/lib/canvas/Painter.js';
import TinyEditor from './TinyEditor';

zrender.registerPainter('canvas', CanvasPainter);

export { TinyEditor };
