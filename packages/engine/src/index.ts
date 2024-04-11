
import * as zrender from 'zrender'
import CanvasPainter from 'zrender/lib/canvas/Painter.js'
import TinyEditor from './TinyEditor'
import Link from './Link'
import Shape from './Shape'
import type { BuiltinTextPosition, FontStyle, FontWeight } from 'zrender/lib/core/types'

zrender.registerPainter('canvas', CanvasPainter)

export { TinyEditor, Link, Shape, BuiltinTextPosition, FontWeight, FontStyle, zrender }
