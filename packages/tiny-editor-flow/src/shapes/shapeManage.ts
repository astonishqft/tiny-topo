import Konva from 'konva'
import Circle from './circle'
import Rect from './rect'
import Anchor from './anchor'
import { applyMixins } from './applyMixins'
import type { NodeType, IShape } from '../types'

const shapeMap = {
  circle: Circle,
  rect: Rect,
  rectRadius: Rect
}

const commonShapeConfig = {
  fill: '#fff',
  stroke: '#333',
  strokeWidth: 1,
  x: 0,
  y: 0,
  draggable: true
}

const shapeConfigMap = {
  circle: {
    ...commonShapeConfig,
    radius: 20,
    x: 0,
    y: 0
  },
  rect: {
    ...commonShapeConfig,
    width: 40,
    height: 40
  },
  rectRadius: {
    ...commonShapeConfig,
    width: 40,
    height: 40,
    cornerRadius: [4, 4, 4, 4]
  }
}

class CommonShape {
  // selected: boolean = false

  // active(shapeInstance: IShape) {
  //   this.selected = true
  //   shapeInstance.setAttr('fill', 'red')
  // }
}

export class ShapeManage {
  getShape(nodeType: NodeType, config: Konva.ShapeConfig): IShape{
    const shapeConfig = shapeConfigMap[nodeType]

    const shapeNode = shapeMap[nodeType] 
    applyMixins(shapeNode, [CommonShape])

    const shapeInstance: IShape = new shapeNode({ ...shapeConfig, ...config})


    // shapeInstance.setAttrs(config)

    shapeInstance.on('mouseover', () => {
      shapeInstance.anchor.refresh()
      shapeInstance.anchor.show()
    })

    shapeInstance.on('mouseout', () => {
      shapeInstance.anchor.hide()
    })

    shapeInstance.on('dragstart', () => {
      console.log('dragstart', shapeInstance)
      shapeInstance.anchor.hide()
    })

    shapeInstance.on('dragmove', () => {
      // shapeInstance.anchor.show()

    })

    shapeInstance.on('dragend', () => {
      console.log('dragend', shapeInstance)
      shapeInstance.anchor.hide()
    })

    // shapeInstance.on('dragend', () => {
    //   console.log('dragend', shapeInstance)
    // })

    // shapeInstance.on('dblclick', () => {
    //   console.log('dblclick', shapeInstance)
    // })

    return shapeInstance
  }
}
