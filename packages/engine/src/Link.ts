import * as zrender from 'zrender'
import OrthogonalConnector from '@qftjs/orthogonal-connector'
import Painter from './Painter'
import type { IPoint } from './types'
import Shape, { type IAnchor } from './Shape'
import type { FontStyle, FontWeight } from 'zrender/lib/core/types'

interface ILinkOpts {
  fromAnchor: IAnchor
  lineType: string
  painter: Painter
}

class Link extends zrender.Group {
  nodeType = 'link'
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
  linkText: zrender.Text | null = null
  ortogonalLinePoints: number[][] = [] // 正交连线坐标点
  textPoints: number[] = []
  selected: boolean = false // 当前线是否被选中
  strokeLinkColor: string | undefined = '#1e1e1e'
  linkWidth: number = 1
  lineDash: number[] = [0, 0]
  linkStrokeType: string = 'solid'
  linkFontColor: string | undefined = '#333'
  linkFontText = ''
  linkFontSize = 12
  linkFontWeight: FontWeight | undefined = 'normal'
  linkFontItalic: FontStyle | undefined = 'normal'

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
          this.renderText()
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
          this.renderText()
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
      this.painter._zr.trigger('selectLink', this)
    });

    (this.link as zrender.Element).on('mouseover', () => {
      this.link?.setStyle({
        lineWidth: this.linkWidth + 1
      })
    });

    (this.link as zrender.Element).on('mouseout', () => {
      this.link?.setStyle({
        lineWidth: this.linkWidth
      })
    });

    (this.link as zrender.Element).on('dblclick',() => {
      this.painter._zr.trigger('dbClickLink', this)
    })

    this.arrow = new zrender.Polygon({
      style: {
        fill: '#000'
      },
      z: 40
    })

    this.linkText = new zrender.Text({
      style: {
        text: '',
        fill: '#333',
        fontSize: 12,
        fontFamily: 'Arial',
        verticalAlign: 'middle',
        backgroundColor: '#fff',
        align: 'center',
        padding: [4, 4, 4, 4]
      },
      z: 50
    })

    this.linkText.hide()
    this.add(this.linkText)

    this.add(this.link)
    this.add(this.arrow)
  }

  changeLineType(lineType: string) {
    this.remove(this.link!)
    this.remove(this.arrow!)
    this.remove(this.linkText!)
    this.remove(this.controlNode1!)
    this.remove(this.controlNode2!)
    this.remove(this.controlLine1!)
    this.remove(this.controlLine2!)
    this.lineType = lineType
    this.createLink()
    this.refresh()
    this.active()

  }

  active() {
    // 在选中某个 Link 之前先取消所有选中的状态
    this.painter.unActive()
    this.selected = true
    if (this.controlLine1 && this.controlLine2 && this.controlNode1 && this.controlNode2) {
      this.controlNode1!.show()
      this.controlNode2!.show()
      this.controlLine1!.show()
      this.controlLine2!.show()
    }

    this.link?.setStyle({
      shadowColor: '#e85827',
      shadowBlur: 4
    })
  }

  unActive() {
    if (this.controlLine1 && this.controlLine2 && this.controlNode1 && this.controlNode2) {
      this.controlNode1!.hide()
      this.controlNode2!.hide()
      this.controlLine1!.hide()
      this.controlLine2!.hide() 
    }

    this.link?.setStyle({
      shadowColor: 'none',
      shadowBlur: undefined
    })

    this.selected = false
  }

  isActive() {
    return this.selected
  }

  setLineStroke(color: string | undefined) {
    this.link?.setStyle({
      stroke: color
    })
    this.arrow?.setStyle({
      stroke: color,
      fill: color
    })

    this.strokeLinkColor = color
  }

  setLinkWidth(width: number) {
    this.link?.setStyle({
      lineWidth: width
    })

    this.linkWidth = width
  }

  setLinkStrokeType(type: string) {
    if (type === 'dashed') {
      this.lineDash = [5,5] 
    } else if (type === 'dotted') {
      this.lineDash = [2, 2]
    }
    this.link?.setStyle({
      lineDash: this.lineDash
    })
    this.linkStrokeType = type
  }

  setLinkFontColor(color: string | undefined) {
    this.linkText?.setStyle({
      fill: color
    })
    this.linkFontColor = color
  }

  setLinkText(text: string) {
    this.linkText?.setStyle({
      text
    })
    this.linkText?.show()
    this.linkFontText = text
  }

  setLinkFontSize(size: number) {
    this.linkText?.setStyle({
      fontSize: size
    })

    this.linkFontSize = size
  }

  setLinkFontWeight() {
    this.linkFontWeight = this.linkFontWeight === 'normal' ? 'bold' : 'normal'
    this.linkText?.setStyle({
      fontWeight: this.linkFontWeight
    })
  }

  setLinkFontItalic() {
    this.linkFontItalic = this.linkFontItalic === 'normal' ? 'italic' : 'normal'
    this.linkText?.setStyle({
      fontStyle: this.linkFontItalic
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
    if (!preNode) return
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

  // 计算正交连线的中点坐标
  calcOrtogonalLineMidPoint() {
    if (this.ortogonalLinePoints.length === 0) {
      return [this.fromAnchor!.x, this.fromAnchor!.y]
    }
    let accList: number[] = [0]
    let directionList = []
    for (let i = 1; i< this.ortogonalLinePoints.length; i++) {
      const p1 = this.ortogonalLinePoints[i-1]
      const p2 = this.ortogonalLinePoints[i]
      const dist = zrender.vector.dist(p1, p2)
      accList.push(accList[i-1] + dist)

      if (p1[0] === p2[0]) {
        directionList.push('vertical')
      } else {
        directionList.push('horizontal')
      }
    }

    const midLength = accList[accList.length - 1] / 2

    let index = 0
    for (let i = 1; i < accList.length; i++) {
      if (midLength <= accList[i]) {
        index = i
        break
      }
    }

    // 判断中点所在的线段的方向
    const currentDirection = directionList[index - 1]
    const preNode = this.ortogonalLinePoints[index - 1]
    const nextNode = this.ortogonalLinePoints[index]
    const offsetLength = midLength - accList[index - 1]

    if (currentDirection === 'horizontal') {
      const delta = (nextNode[0] - preNode[0]) > 0 ? 1 : -1
      return [preNode[0] + offsetLength * delta, preNode[1]]
    } else {
      const delta = (nextNode[1] - preNode[1]) > 0 ? 1 : -1
      return [preNode[0], preNode[1] + offsetLength * delta]
    }
  }

  renderText() {
    if (this.lineType === 'bezierCurve') {
      const point = this.link && (this.link as zrender.BezierCurve).pointAt(0.5)

      if (point) {
        this.textPoints = point
      }
    } else if (this.lineType === 'ortogonalLine') {
      this.textPoints = this.calcOrtogonalLineMidPoint()
    } else {
      this.textPoints = [
        (this.fromAnchor!.x + this.toAnchor!.x) / 2,
        (this.fromAnchor!.y + this.toAnchor!.y) / 2
      ]
    }

    this.linkText?.setStyle({
      x: this.textPoints[0],
      y: this.textPoints[1]
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
    this.renderText()
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
    this.renderText()
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

    // const points: Array<Array<number>> = []
    this.ortogonalLinePoints = []

    paths.forEach((p: { x: number, y: number }) => {
      this.ortogonalLinePoints.push([p.x, p.y])
    })

    this.link && (this.link as zrender.Polyline).setShape({
      points: this.ortogonalLinePoints
    })

    this.renderArrow(this.ortogonalLinePoints[this.ortogonalLinePoints.length - 2])
    this.renderText()
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
