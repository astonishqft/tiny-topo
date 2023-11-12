import * as zrender from 'zrender'

export interface TinyFlowEditorOptions {
  /**
   * DOM 容器
   */
  container: HTMLElement  
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
  /**
   * 画布大小与容器大小之比(传递给zrender的devicePixelRatio)
   */
  devicePixelRatio?: number
}

export type NodeType = 'circle'

export interface AddNodeType {
  nodeType: NodeType
  shapeConfig: zrender.PathProps
}
