import * as zrender from 'zrender'
import type { IExtraAnchor } from './Anchor'

export type IAnchorPoint = zrender.Element & IExtraAnchor

export interface IPoint {
  x: number
  y: number
}
