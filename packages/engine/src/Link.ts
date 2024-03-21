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
  controlNode1: zrender.Circle | null = null // 贝赛尔曲线控制点1
  controlNode2: zrender.Circle | null = null // 贝塞尔曲线控制点2
  controlLine1: zrender.Line | null = null // 贝塞尔曲线控制线1
  controlLine2: zrender.Line | null = null // 贝塞尔曲线控制线2

  isActive: boolean = false // 当前线是否被选中

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
          z: 30
        })

        this.controlNode1 = new zrender.Circle({
          style: {
            fill: 'red'
          },
          shape: {
            r: 4
          },
          z: 40,
          draggable: true
        })

        this.controlNode2 = new zrender.Circle({
          style: {
            fill: 'red'
          },
          shape: {
            r: 4
          },
          z: 40,
          draggable: true
        })

        this.controlLine1 = new zrender.Line({
          style: {
            stroke: '#ccc'
          },
          z: 30
        })

        this.controlLine2 = new zrender.Line({
          style: {
            stroke: '#ccc'
          },
          z: 30
        })

        this.controlNode1.on('drag', (e: zrender.ElementEvent) => {
          const { x, y, shape: { cx, cy }} = e.target as zrender.Circle
          const absX = x + cx
          const absY = y + cy
          this.controlLine1?.setShape({
            x2: absX,
            y2: absY
          })

          this.link && (this.link as zrender.BezierCurve).setShape({
            cpx1: absX,
            cpy1: absY
          })
        })

        this.controlNode2.on('drag', (e: zrender.ElementEvent) => {
          const { x, y, shape: { cx, cy }} = e.target as zrender.Circle
          const absX = x + cx
          const absY = y + cy
          this.controlLine2?.setShape({
            x1: absX,
            y1: absY
          })
          this.link && (this.link as zrender.BezierCurve).setShape({
            cpx2: absX,
            cpy2: absY
          })

          this.renderArrow([absX, absY])
        })

        this.unActive()
        this.add(this.controlNode1)
        this.add(this.controlNode2)
        this.add(this.controlLine1)
        this.add(this.controlLine2)
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

    (this.link as zrender.Element).on('click', () => {
      this.active()
    });

    (this.link as zrender.Element).on('mouseover', () => {
      this.link?.setStyle({
        lineWidth: 2
      })
    });

    (this.link as zrender.Element).on('mouseout', () => {
      this.link?.setStyle({
        lineWidth: 1
      })
    })

    this.arrow = new zrender.Polygon({
      style: {
        fill: '#000'
      },
      z: 40
    })

    this.add(this.link)
    this.add(this.arrow)
  }

  active() {
    // 在选中某个 Link 之前先取消所有选中的状态
    this.painter.unActive()

    if (this.controlLine1 && this.controlLine2 && this.controlNode1 && this.controlNode2) {
      this.controlNode1!.show()
      this.controlNode2!.show()
      this.controlLine1!.show()
      this.controlLine2!.show()
    }

    this.setLineStroke('#e85827')
  }

  unActive() {
    if (this.controlLine1 && this.controlLine2 && this.controlNode1 && this.controlNode2) {
      this.controlNode1!.hide()
      this.controlNode2!.hide()
      this.controlLine1!.hide()
      this.controlLine2!.hide() 
    }

    this.setLineStroke('#000')
  }

  setLineStroke(color: string) {
    this.link?.setStyle({
      stroke: color
    })
    this.arrow?.setStyle({
      stroke: color,
      fill: color
    })
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
        this.renderLine()
        break
      case 'bezierCurve':
        this.renderBezierCurve()
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

  renderLine() {
    this.link && (this.link as zrender.Line).setShape({
      x1: this.fromAnchor!.x,
      y1: this.fromAnchor!.y,
      x2: this.toAnchor!.x,
      y2: this.toAnchor!.y
    }) 

    this.renderArrow([this.fromAnchor!.x, this.fromAnchor!.y])
  }

  renderBezierCurve() {
    const [cpx1, cpy1] = this.calcControlPoints(this.fromAnchor)
    const [cpx2, cpy2] = this.calcControlPoints(this.toAnchor!)

    this.link && (this.link as zrender.BezierCurve).setShape({
      x1: this.fromAnchor!.x, // 起点横坐标
      y1: this.fromAnchor!.y, // 起点纵坐标
      x2: this.toAnchor!.x, // 终点横坐标
      y2: this.toAnchor!.y, // 终点纵坐标
      cpx1: cpx1 + this.controlNode1!.x, // 第一个控制点的横坐标
      cpy1: cpy1 + this.controlNode1!.y, // 第一个控制点的纵坐标
      cpx2: cpx2 + this.controlNode2!.x, // 第二个控制点的横坐标
      cpy2: cpy2 + this.controlNode2!.y // 第二个控制点的纵坐标
    })

    this.controlNode1?.setShape({
      cx: cpx1,
      cy: cpy1
    })

    this.controlNode2?.setShape({
      cx: cpx2,
      cy: cpy2
    })

    this.controlLine1?.setShape({
      x1: this.fromAnchor!.x,
      y1: this.fromAnchor!.y,
      x2: cpx1 + this.controlNode1!.x,
      y2: cpy1 + this.controlNode1!.y
    })

    this.controlLine2?.setShape({
      x1: cpx2 + this.controlNode2!.x,
      y1: cpy2 + this.controlNode2!.y,
      x2: this.toAnchor!.x,
      y2: this.toAnchor!.y
    })

    this.renderArrow([cpx2 + this.controlNode2!.x, cpy2 + this.controlNode2!.y])
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

  calcControlPoints(anchor: IAnchor): number[] {
    const { direction } = anchor
    let point = []
    const offset = 80
    switch (direction) {
      case 'top':
        point = [anchor.x, anchor.y - offset]
        break
      case 'right':
        point = [anchor.x + offset, anchor.y]
        break
      case 'bottom':
        point = [anchor.x, anchor.y + offset]
        break
      case 'left':
        point = [anchor.x - offset, anchor.y]
        break
      default:
        point = [anchor.x, anchor.y]
    }

    return point
  }

  setFromNode(node: Shape) {
    this.fromNode = node
  }

  setToNode(node: Shape) {
    this.toNode = node
  }
}

export default Link
