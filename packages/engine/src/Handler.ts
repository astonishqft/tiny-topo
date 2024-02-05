import Shape from './Shape'

class Handler {
  shape: Shape

  constructor(shape: Shape) {
    this.shape = shape
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
