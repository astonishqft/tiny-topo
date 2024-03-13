import * as zrender from 'zrender'
import OrthogonalConnector from '@qftjs/orthogonal-connector'
import Painter from './Painter'
import type { IPoint } from './types'
import Shape, { type IAnchor } from './Shape'

interface ILinkOpts {
  fromAnchor: IAnchor
  lineType: string
  painter: Painter
}

class Link extends zrender.Group {
  fromAnchor: IAnchor
  toAnchor: IAnchor | null = null
  lineType: string
  painter: Painter
  link: zrender.Polyline | zrender.Line | zrender.BezierCurve | null = null
  arrow: zrender.Polygon | null = null
  canvasWidth: number
  canvasHeight: number
  toNode: Shape | null = null
  fromNode: Shape | null = null

  constructor({ fromAnchor, lineType = 'ortogonalLine', painter }: ILinkOpts) {
    super()
    this.fromAnchor = fromAnchor
    this.lineType = lineType
    this.painter = painter
    this.canvasWidth = painter._zr.getWidth()
    this.canvasHeight = painter._zr.getHeight()
    this.createLink()
  }

  createLink() {
    switch (this.lineType) {
      case 'ortogonalLine':
        this.link = new zrender.Polyline({
          style: {
            // TODO
          },
          z: 30
        })
        break
      case 'line':
        this.link = new zrender.Line({
          style: {
            // TODO
          },
          z: 30
        })
        break
      case 'bezierCurve':
        this.link = new zrender.BezierCurve({

        })
        break
      default:
        this.link = new zrender.Polyline({
          style: {
            // TODO
          },
          z: 30
        })
        break
    }

    this.arrow = new zrender.Polygon({
      style: {
        fill: '#000'
      }
    })

    this.add(this.link)
    this.add(this.arrow)
  }

  updatePosition({ x, y }: IPoint) {
    this.toAnchor = {
      x,
      y: y + 5,
      direction: 'left',
      boundingBox: { x, y, width: 10, height: 10 },
      index: 4
    }!
    this.refresh()
  }

  refresh() {
    switch (this.lineType) {
      case 'ortogonalLine':
        this.renderOrtogonalLine()
        break
      case 'line':
        // TODO
        break
      case 'bezierCurve':
        // TODO
        break
      default:
        this.renderOrtogonalLine()
        break
    }
  }

  setFromAnchor(anchor: IAnchor) {
    this.fromAnchor = anchor
    this.refresh()
  }

  setToAnchor(anchor: IAnchor) {
    this.toAnchor = anchor
    this.refresh()
  }

  // 绘制连接线箭头
  renderArrow(preNode: number[]) {
    const arrowLength = 12
    const offsetAngle = Math.PI / 8
    const [x1, y1] = preNode

    const { x: x2, y: y2 } = this.toAnchor!
    const p1 = [x2, y2]

    const angle = Math.atan2(y2 - y1, x2 - x1)
    const p2 = [x2 - arrowLength * Math.cos(angle + offsetAngle), y2 - arrowLength * Math.sin(angle + offsetAngle)]
    const p3 = [x2 - arrowLength * Math.cos(angle - offsetAngle), y2 - arrowLength * Math.sin(angle - offsetAngle)]

    this.arrow!.attr({
      shape: {
        points: [p1, p2, p3]
      }
    })
  }

  renderOrtogonalLine() {
    const paths = OrthogonalConnector.connect({
      shapeA: this.fromAnchor,
      shapeB: this.toAnchor!,
      shapeHorizontalMargin: 10,
      shapeVerticalMargin: 10,
      globalBoundsMargin: 40,
      globalBounds: { x: 0, y: 0, width: this.canvasWidth, height: this.canvasHeight }
    })

    const points: Array<Array<number>> = []

    paths.forEach((p: { x: number, y: number }) => {
      points.push([p.x, p.y])
    })

    this.link && (this.link as zrender.Polyline).setShape({
      points
    })

    this.renderArrow(points[points.length - 2])
  }

  setFromNode(node: Shape) {
    this.fromNode = node
  }

  setToNode(node: Shape) {
    this.toNode = node
  }
}

export default Link
