import * as zrender from 'zrender'
import Storage from './Storage'
import Shape from './Shape'
import Rect from './shapes/Rect'
import Circle from './shapes/Circle'
import RoundRect from './shapes/RoundRect'

class Painter {
  _zr: zrender.ZRenderType
  _layer: zrender.Group
  storage: Storage

  constructor(dom: HTMLElement, opts: zrender.ZRenderInitOpt, storage: Storage) {
    this.storage = storage
    this._zr = zrender.init(dom, opts)
    this._layer = new zrender.Group()
    this._zr.add(this._layer)
    this.initEvent()
  }

  createShape(type: string, x: number, y: number) {
    let shape: Shape

    switch (type) {
      case 'rect':
        shape = new Rect(x, y)
        break
      case 'circle':
        shape = new Circle(x, y)
        break
      case 'roundRect':
        shape = new RoundRect(x, y)
        break
      default:
        throw new Error('Invalid shape type')
    }

    this.storage.add(shape)
    this._layer.add(shape.getShape())
    // 添加锚点到画布
    shape.anchor && shape.anchor.points.forEach(p => this._layer.add(p))
  }

  initEvent() {
    this._zr.on('mousedown', (e: zrender.ElementEvent) => {
      console.log('mousedown', e.offsetX, e.offsetY)
    })

    this._zr.on('mousemove', (e: zrender.ElementEvent) => {
      this.showAnchor(e.offsetX, e.offsetY)
    })

    this._zr.on('mouseup', (e: zrender.ElementEvent) => {
      console.log('mouseup', e.offsetX, e.offsetY)
    })
  }

  showAnchor(x: number, y: number) {
    const shapes = this.storage.getAllShapes()
    shapes.forEach((shape: Shape) => {
      if (shape?.shapeInstance?.dragging) {
        shape.anchor && shape.anchor.hide()
        return
      }

      const boundingBox = shape.getBoundingRect()
      const offset = (shape.anchor?.radius || 4) + 4

      const offsetLayoutX = this._layer.x
      const offsetLayoutY = this._layer.y

      boundingBox.x = boundingBox.x + offsetLayoutX - offset / 2
      boundingBox.y = boundingBox.y + offsetLayoutY - offset / 2
      boundingBox.width = boundingBox.width + offset
      boundingBox.height = boundingBox.height + offset
      if (boundingBox.contain(x, y)) {
        shape.anchor && shape.anchor.show()
      } else {
        shape.anchor && shape.anchor.hide()
      }
    })
  }
}

export default Painter
