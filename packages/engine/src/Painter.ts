import * as zrender from 'zrender'
import Storage from './Storage'
import Shape, { type ShapeInitOpts } from './Shape'
import Rect from './shapes/Rect'
import Circle from './shapes/Circle'
import RoundRect from './shapes/RoundRect'
import Link from './Link'
import type { IAnchorPoint } from './types'

class Painter {
  _zr: zrender.ZRenderType
  _layer: zrender.Group
  storage: Storage
  isCreatingConnection: boolean = false // 是否正在创建连线
  selectedAnchor: zrender.Element | null = null // 被选中的锚点
  activeLink: Link | null = null // 当前激活的连接线
  lineType: string = 'ortogonalLine'

  constructor(dom: HTMLElement, opts: zrender.ZRenderInitOpt, storage: Storage) {
    this.storage = storage
    this._zr = zrender.init(dom, opts)
    this._layer = new zrender.Group()
    this._zr.add(this._layer)
    this.initEvent()
  }

  createShape(type: string, x: number, y: number) {
    let shape: Shape
    const config: ShapeInitOpts = {
      position: { x, y },
      painter: this
    }
    switch (type) {
      case 'rect':
        shape = new Rect(config)
        break
      case 'circle':
        shape = new Circle(config)
        break
      case 'roundRect':
        shape = new RoundRect(config)
        break
      default:
        throw new Error('Invalid shape type')
    }

    this.storage.add(shape)
    this._layer.add(shape.getShape())
    // 添加锚点到画布
    shape.anchor && shape.anchor.points.forEach(p => this._layer.add(p))
  }

  setLineType(type: string) {
    this.lineType = type
  }

  removeConnection(connection: Link) {
    this._layer.remove(connection)
    this.storage.removeConnection(connection)
  }

  addConnection(connection: Link) {
    this._layer.add(connection)
    this.storage.addConnection(connection)
  }

  unActive() {
    this.unActiveConnections()
    this.unActiveShapes()
  }

  unActiveConnections() {
    this.storage.getAllConnections().forEach((connection: Link) => {
      connection.unActive()
    })
  }

  unActiveShapes() {
    this.storage.getAllShapes().forEach((shape: Shape) => {
      shape.unActive()
    })
  }

  initEvent() {
    this._zr.on('mousedown', (e: zrender.ElementEvent) => {
      const target: IAnchorPoint = e.target
      this.selectedAnchor = target
      if (target && target.anchor && target.mark === 'anchor') {
        // 选中锚点
        this.isCreatingConnection = true

        // 创建连线
        this.activeLink = new Link({ fromAnchor: target.anchor, painter: this, lineType: this.lineType })
        this.activeLink.setFromNode(target.node!)
        this.addConnection(this.activeLink)
      }

      if (!e.target) {
        // 如果什么都没选中的话
        this.unActive()
      }
    })

    this._zr.on('mousemove', (e: zrender.ElementEvent) => {
      this.showAnchor(e.offsetX, e.offsetY)

      if (this.isCreatingConnection && this.activeLink) {
        // 更新连线
        this.activeLink.updatePosition({ x: e.offsetX, y: e.offsetY })
      }
    })

    this._zr.on('mouseup', (e: zrender.ElementEvent) => {
      const target: IAnchorPoint = e.target

      if (target && target.anchor && target.mark === 'anchor') {
        if (this.isCreatingConnection) {
          if (e.target === this.selectedAnchor) { // 禁止锚点和自身相连
            this.removeConnection(this.activeLink!)
          } else {
            this.activeLink?.setToNode(target.node!) // 给连线设置 toNode 属性
            this.activeLink?.setToAnchor(target.anchor)
          }
        }

        this.activeLink = null
      }

      // 如果鼠标释放的时候不在锚点上就表示放弃连线
      if (this.activeLink) {
        this.removeConnection(this.activeLink)
        this.activeLink = null
      }

      this.isCreatingConnection = false
      this.selectedAnchor = null
    })

    this._zr.on('refreshConnections', (e: { node: Shape }) => {
      const node = e.node
      const connections = this.getConnectionsByNode(node)

      connections.forEach((connection: Link) => {
        if (connection.fromNode === node) {
          connection.setFromNode(node)
          connection.setFromAnchor(node.getAnchorByIndex(connection.fromAnchor.index))
        } else if (connection.toNode === node) {
          connection.setToNode(node)
          connection.setToAnchor(node.getAnchorByIndex(connection.toAnchor!.index))
        }
      })
    })
  }

  getConnectionsByNode(node: Shape): Link[] {
    const connections: Link[] = []
    this.storage.getAllConnections().forEach((connection: Link) => {
      if (connection.fromNode === node || connection.toNode === node) {
        if (connections.indexOf(connection) === -1) {
          connections.push(connection)
        }
      }
    })

    return connections
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
