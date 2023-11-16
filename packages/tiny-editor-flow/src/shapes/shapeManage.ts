import Circle from './circle'
import Rect from './rect'
import RectRadius from './rectRadius'
import type { NodeType } from '../types'
import { applyMixins } from './applyMixins'
import type { TFabricObjectProps } from 'fabric'

const shapeMap = {
  circle: Circle,
  rect: Rect,
  rectRadius: RectRadius
}

const commonShapeConfig = {
  fill: '#fff',
  stroke: '#333',
  strokeWidth: 1,
  top: 0,
  left: 0,
  transparentCorners: false
}

const shapeConfigMap = {
  circle: {
    ...commonShapeConfig,
    radius: 20
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
    rx: 4,
    ry: 4
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
  getShape(nodeType: NodeType, config: TFabricObjectProps, canvas) {
    // const { left, top } = config

    const shapeConfig = shapeConfigMap[nodeType]

    const shapeNode = shapeMap[nodeType] 
    // applyMixins(shapeNode, [CommonShape])

    const shapeInstance = new shapeNode(shapeConfig)
    // const shapeInstance = new Circle(shapeConfig)

    // 设置属性
    Object.keys(config).forEach((key: keyof TFabricObjectProps) => {
      shapeInstance.set(key, config[key])
    })
  
    shapeInstance.setCoords()
    // canvas.requestRenderAll()
  
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
