import type { Component } from 'vue'

export interface ElementItemType {
  component: Component
  nodeType: string
}

export type ElementListType = ElementItemType[]
