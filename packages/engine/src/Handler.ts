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
      // this.shape && this.shape.anchor?.hide()
    })

    shapeInstance?.on('dragstart',() => {
      console.log('dragstart')
    })

    shapeInstance?.on('dragend',() => {
      console.log('dragend')
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
}

export default Handler
