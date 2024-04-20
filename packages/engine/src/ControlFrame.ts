import * as zrender from 'zrender'
import Painter from './Painter'
import Shape from './Shape'

class ControlFrame {
  painter: Painter
  box: zrender.Rect | null = null
  controlPointWidth : number = 8 // 控制点的宽度
  ltControlPoint: zrender.Element | null = null
  rtControlPoint: zrender.Element | null = null
  lbControlPoint: zrender.Element | null = null
  rbControlPoint: zrender.Element | null = null
  isDragging: boolean = false
  shape: Shape | null = null
  controlColor = '#228be6'
  startOffsetX = 0
  startOffsetY = 0
  startX = 0
  startY = 0
  startWidth = 0
  startHeight = 0

  boundingBox = { x: 0, y: 0, width: 0, height: 0 }
  constructor(painter: Painter) {
    this.painter = painter
    this.createControlFrame()
    this.initEvent()
    this.hide()
  }

  addSelfTo() {
    this.painter._layer.add(this.ltControlPoint!)
    this.painter._layer.add(this.rtControlPoint!)
    this.painter._layer.add(this.lbControlPoint!)
    this.painter._layer.add(this.rbControlPoint!)
    this.painter._layer.add(this.box!)
  }

  active(shape: Shape, boundingBox: { x: number; y: number; width: number; height: number }) {
    const { x, y, width, height } = boundingBox
    this.boundingBox = boundingBox
    this.shape = shape
    this.box?.setPosition([x, y])
    this.box!.attr({
      shape: {
        x: 0,
        y: 0,
        width,
        height
      }
    })

    this.refreshControlPoints()
    this.show()
  }

  refreshControlPoints() {
    this.ltControlPoint?.setPosition([this.boundingBox.x, this.boundingBox.y])
    this.rtControlPoint?.setPosition([this.boundingBox.x + this.boundingBox.width, this.boundingBox.y])
    this.lbControlPoint?.setPosition([this.boundingBox.x, this.boundingBox.y + this.boundingBox.height])
    this.rbControlPoint?.setPosition([this.boundingBox.x + this.boundingBox.width, this.boundingBox.y + this.boundingBox.height])
  }

  createControlFrame() {
    this.box = new zrender.Rect({
      style: {
        fill: 'transparent',
        stroke: this.controlColor
      }
    })

    // 左上角控制点
    this.ltControlPoint = new zrender.Rect({
      style: {
        fill: '#fff',
        stroke: this.controlColor,
        lineWidth: 1
      },
      shape: {
        x: -this.controlPointWidth / 2,
        y: -this.controlPointWidth / 2,
        width: this.controlPointWidth,
        height: this.controlPointWidth,
        r: 2
      },
      draggable: true,
      cursor: 'nw-resize',
      z: 100
    })

    // 右上角控制点
    this.rtControlPoint = new zrender.Rect({
      style: {
        fill: '#fff',
        stroke: this.controlColor,
        lineWidth: 1
      },
      shape: {
        x: -this.controlPointWidth / 2,
        y: -this.controlPointWidth / 2,
        width: this.controlPointWidth,
        height: this.controlPointWidth,
        r: 2
      },
      draggable: true,
      cursor: 'ne-resize',
      z: 100
    })

    // 左下角控制点
    this.lbControlPoint = new zrender.Rect({
      style: {
        fill: '#fff',
        stroke: this.controlColor,
        lineWidth: 1
      },
      shape: {
        x: -this.controlPointWidth / 2,
        y: -this.controlPointWidth / 2,
        width: this.controlPointWidth,
        height: this.controlPointWidth,
        r: 2
      },
      draggable: true,
      cursor: 'sw-resize',
      z: 100
    })

    // 右下角
    this.rbControlPoint = new zrender.Rect({
      style: {
        fill: '#fff',
        stroke: this.controlColor,
        lineWidth: 1
      },
      shape: {
        x: -this.controlPointWidth / 2,
        y: -this.controlPointWidth / 2,
        width: this.controlPointWidth,
        height: this.controlPointWidth,
        r: 2
      },
      draggable: true,
      cursor: 'se-resize',
      z: 100
    })
  }

  show() {
    this.box!.show()
    this.ltControlPoint!.show()
    this.rtControlPoint!.show()
    this.lbControlPoint!.show()
    this.rbControlPoint!.show()
  }

  hide() {
    this.box!.hide()
    this.ltControlPoint!.hide()
    this.rtControlPoint!.hide()
    this.lbControlPoint!.hide()
    this.rbControlPoint!.hide()
  }

  resizeShape() {
    const type = this.shape?.shapeInstance?.type
    if (type === 'ellipse') {
      this.shape?.shapeInstance?.setPosition([this.boundingBox.x, this.boundingBox.y])
      const rx = this.boundingBox.width / 2
      const ry = this.boundingBox.height / 2
      const cx = rx
      const cy = ry;
      (this.shape?.shapeInstance as zrender.Ellipse).attr({
        shape: {
          cx,
          cy,
          rx,
          ry
        }
      })
    } else {
      this.shape?.shapeInstance?.setPosition([this.boundingBox.x, this.boundingBox.y]);
      (this.shape?.shapeInstance as zrender.Path).attr({
        shape: {
          x:0,
          y:0,
          width: this.boundingBox.width,
          height: this.boundingBox.height
        }
      })
    }
  }

  initEvent() {
    const controlPoinst = [
      this.ltControlPoint,
      this.rtControlPoint,
      this.lbControlPoint,
      this.rbControlPoint
    ]

    controlPoinst.forEach((controlPoint, index) => {
      controlPoint!.on('dragstart', (e: zrender.ElementEvent) => {
        this.isDragging = true
        this.startOffsetX = e.offsetX
        this.startOffsetY = e.offsetY
        this.startX = this.boundingBox.x
        this.startY = this.boundingBox.y
        this.startWidth = this.boundingBox.width
        this.startHeight = this.boundingBox.height
      })

      controlPoint!.on('drag', (e: zrender.ElementEvent) => {
        if (this.isDragging) {
          const offsetX = e.offsetX - this.startOffsetX
          const offsetY = e.offsetY - this.startOffsetY

          if (index === 0) {
            // 左上角控制点拖拽
            this.boundingBox = {
              x: this.startX + offsetX,
              y: this.startY + offsetY,
              width: this.startWidth - offsetX,
              height: this.startHeight - offsetY
            }
          } else if (index === 1) {
            // 右上角控制点拖拽
            this.boundingBox = {
              x: this.startX,
              y: this.startY + offsetY,
              width: this.startWidth + offsetX,
              height: this.startHeight - offsetY
            }
          } else if (index === 2) {
            // 左下角控制拖拽
            this.boundingBox = {
              x: this.startX + offsetX,
              y: this.startY,
              width: this.startWidth - offsetX,
              height: this.startHeight + offsetY
            }
          } else {
            // 右下角控制拖拽
            this.boundingBox = {
              x: this.startX,
              y: this.startY,
              width: this.startWidth + offsetX,
              height: this.startHeight + offsetY
            }
          }

          this.refreshControlPoints()
          this.active(this.shape as Shape, this.boundingBox)
          this.resizeShape()
          this.shape?.handler?.refreshConnections()
        }
      })

      controlPoint!.on('dragend', () => {
        this.isDragging = false
      })
    })
  }
}

export default ControlFrame
