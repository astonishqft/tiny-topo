import * as zrender from 'zrender'
import Circle from './circle'
import type { NodeType } from '../types'
import { applyMixins } from './applyMixins'

const { merge } = zrender.util

const shapeMap = {
  circle: Circle
}

const commonStyle = {
  fill: '#fff',
  stroke: '#333',
  lineWidth: 1 
}

const shapeConfigMap = {
  circle: {
    style: commonStyle,
    shape: {
      cx: 0,
      cy: 0,
      r: 35
    },
    position: [0, 0],
    draggable: true
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

    this.attr('style', {
      shadowColor:'yellow',
      shadowBlur:3
    })
  }
}

export class ShapeManage {
  getShape(nodeType: NodeType, config: zrender.PathProps) {
    const { x, y, style, shape } = config

    const shapeConfig = shapeConfigMap[nodeType]

    const shapeNode = shapeMap[nodeType] 
    applyMixins(shapeNode, [CommonShape])

    const shapeInstance = new shapeNode(shapeConfig)

    // 设置初始位置
    if (x && y) {
      shapeInstance.setPosition([x, y])
    }

    if (style) {
      shapeConfig.style = merge(shapeConfig.style, style)
    }

    if (shape) {
      shapeConfig.shape = merge(shapeConfig.shape, shape)
    }
  
    shapeInstance.on('click', () => {
      shapeInstance.__zr.trigger('selectNode', { node: shapeInstance })
    })

    shapeInstance.on('dragstart', () => {
      console.log('dragstart', shapeInstance)
    })

    shapeInstance.on('drag', () => {
      console.log('drag', shapeInstance)
    }) 

    shapeInstance.on('dragend', () => {
      console.log('dragend', shapeInstance)
    })

    shapeInstance.on('dblclick', () => {
      console.log('dblclick', shapeInstance)
    })

    return shapeInstance
  }
}
