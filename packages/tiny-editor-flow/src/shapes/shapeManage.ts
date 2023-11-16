import Konva from 'konva'
import Circle from './circle'
import Rect from './rect'

import type { NodeType } from '../types'
import { applyMixins } from './applyMixins'

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
    x: 200,
    y: 200
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

abstract class ICommonShape {
  selected: boolean = false
  abstract active(): void
  attr(name: string, value: any){}
}

class CommonShape extends ICommonShape {
  constructor() {
    super()
    this.selected = false
  }

  active() {
    this.selected = true

    // this.attr('style', {
    //   shadowColor:'yellow',
    //   shadowBlur:3
    // })
  }
}

export class ShapeManage {
  getShape(nodeType: NodeType, config: Konva.ShapeConfig) {
    // const { left, top } = config

    const shapeConfig = shapeConfigMap[nodeType]

    const shapeNode = shapeMap[nodeType] 
    // applyMixins(shapeNode, [CommonShape])

    const shapeInstance = new shapeNode(shapeConfig)

    shapeInstance.setAttrs(config)
  
  
    // shapeInstance.on('selected', (e) => {
    //   // shapeInstance.__zr.trigger('selectNode', { node: shapeInstance })
    //   // debugger
    // })

    // shapeInstance.on('dragstart', () => {
    //   console.log('dragstart', shapeInstance)
    // })

    // shapeInstance.on('drag', () => {
    //   console.log('drag', shapeInstance)
    // }) 

    // shapeInstance.on('dragend', () => {
    //   console.log('dragend', shapeInstance)
    // })

    // shapeInstance.on('dblclick', () => {
    //   console.log('dblclick', shapeInstance)
    // })

    return shapeInstance
  }
}
