import Shape from './Shape'
import Link from './Link'

class Storage {
  shapes: Shape[] = []
  connections: Link[] = []

  constructor () {
    console.log('Storage')
  }

  add(...shapes: Shape[]) {
    this.shapes.push(...shapes)
  }

  addConnection(...connections: Link[]) {
    this.connections.push(...connections)
  }

  removeConnection (connection: Link) {
    const i = this.connections.indexOf(connection)
    if (i > -1) {
      this.connections.splice(i, 1)
    }
  }

  /**
   * 获取所有元素
   */
  getAllShapes () {
    return this.shapes
  }

  getAllConnections () {
    return this.connections
  }
}

export default Storage
