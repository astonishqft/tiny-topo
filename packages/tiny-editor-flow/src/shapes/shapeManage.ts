import * as zrender from 'zrender'
import Circle from './circle';
import type { NodeType, IShapeConfig } from '../types';
import TinyFlowEditor from '../tinyFlowEditor';
import { applyMixins } from './applyMixins'


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
  attr(keyOrObj: zrender.ElementProps): this
}

class CommonShape extends ICommonShape{
  private position: Array<number> = []
  private style: zrender.PathStyleProps = {}

  constructor() {
    super()
  }

  getNodeConfig() {
    return {
      position: this.position,
      style: this.style
    }
  }
}

export class ShapeManage {
  // private nodeType: NodeType
  private editor: TinyFlowEditor

  constructor(editor: TinyFlowEditor) {
    // this.nodeType = nodeType;
    this.editor = editor;
  }

  getShape(nodeType: NodeType, config: IShapeConfig) {
    const { offsetX, offsetY } = config;

    const shapeConfig = shapeConfigMap[nodeType]

    if (offsetX && offsetY) {
      shapeConfig.position = [offsetX, offsetY]
    }

    const shape = shapeMap[nodeType] 
    applyMixins(shape, [CommonShape]);

    const shapeInstance = new shape(shapeConfig)

    shapeInstance.setPosition = () => {

    }
  
    shapeInstance.on('click', () => {
      console.log(shapeInstance)
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
