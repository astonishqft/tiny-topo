import type { TFabricObjectProps } from 'fabric'

export interface TinyFlowEditorOptions {
  /**
   * DOM 容器
   */
  containerId: string  
  /**
   * 画布宽度
   */
  width: number
  /**
   * 画布高度
   */
  height: number
  /**
   * 禁止缩放画布
   */
  disableZoomGraph?: boolean
  /**
   * 禁止拖动画布
   */
  disableMoveGraph?: boolean
}

export type NodeType = 'circle'

export interface AddNodeType {
  nodeType: NodeType
  shapeConfig: TFabricObjectProps
}
