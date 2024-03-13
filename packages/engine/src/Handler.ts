import Shape from './Shape'
import Painter from './Painter'

class Handler {
  shape: Shape
  painter: Painter

  constructor(shape: Shape) {
    this.shape = shape
    this.painter = this.shape.painter!
    this.initEvent()
  }

  initEvent() {
    const shapeInstance = this.shape.shapeInstance
    
    shapeInstance?.on('drag',() => {
      this.refreshConnections()
    })

    shapeInstance?.on('dragstart',() => {
      console.log('dragstart')
    })

    shapeInstance?.on('dragend',() => {
      this.shape && this.shape.anchor?.refresh()
    })

    shapeInstance?.on('click',() => {
      console.log('click')
    })

    shapeInstance?.on('mouseover',() => { 
  
    })

    shapeInstance?.on('mouseout',() => {

    })
  }

  refreshConnections() {
    // 注意拖动节点后，在更新连线位置之前需要先更新锚点的位置
    this.shape && this.shape.anchor?.refresh()
    this.painter._zr.trigger('refreshConnections', { node: this.shape })
  }
}

export default Handler
