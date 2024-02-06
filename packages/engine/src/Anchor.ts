import * as zrender from 'zrender'
import Shape, { IAnchor, IAnchors } from './Shape'

interface IExtraAnchor {
  mark?: string
  node?: Shape
  anchor?: IAnchor
}

export type IAnchorPoint = zrender.Circle & IExtraAnchor 

class Anchor {
  points: IAnchorPoint [] = []
  shape: Shape
  anchors: IAnchors = []
  radius: number = 4

  constructor(shape: Shape) {
    this.shape = shape
    this.anchors = shape.createAnchors()
    this.createPoints()
  }

  createPoints() {
    this.anchors.forEach((anchor: IAnchor) => {
      const point: IAnchorPoint = new zrender.Circle({
        style: {
          fill: '#fff',
          stroke: 'rgb(0,140,140)',
          lineWidth: 1
        },
        shape: {
          cx: anchor.x,
          cy: anchor.y,
          r: this.radius
        },
        cursor: 'crosshair',
        z: 2000
      })

      point.mark = 'anchor'
      point.node = this.shape
      point.anchor = anchor

      point.on('mouseover', () => {
        point.attr({
          style: {
            fill: 'rgb(0,140,140)',
            shadowBlur: 8,
            shadowColor: 'rgb(0,140,140)'
          }
        })
        this.show()
      })

      point.on('mouseout', () => {
        point.attr({
          style: {
            fill: '#fff',
            shadowBlur: 0
          }
        })
      })
      this.points.push(point)
    })
  }

  show() {
    this.points.forEach((point: zrender.Circle) => {
      point.show()
    })
  }

  hide() {
    this.points.forEach((point: zrender.Circle) => {
      point.hide()
    })
  }

  getAnchorByIndex(index: number) {
    return this.anchors.filter(item => item.index == index)[0]
  }

  refresh() {
    this.anchors = this.shape.createAnchors()

    this.points.forEach((point: IAnchorPoint) => {
      const freshPoint = this.getAnchorByIndex((point.anchor as IAnchor).index)

      point.attr({
        shape: {
          cx: freshPoint.x,
          cy: freshPoint.y
        }
      })

      point.anchor = freshPoint
    })
  }
}

export default Anchor
