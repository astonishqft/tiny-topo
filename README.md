# tiny-editor 大纲简介

## 支持Typescript

## 支持monorepo

## 使用HTML5 dragable API 实现拖拽

## Canvas实现绘制

## 面向对象的编程思想

## 参考资料

[关于节点之间的连线算法](https://www.yuque.com/antv/blog/eyi70n)

[Canvas的渲染优化](https://www.yuque.com/antv/blog/grqax2)


# fabric.js

1. Fabric.js 中一些操作需调用setCoords()才能重新计算控制位置(改变Object状态)

在Fabric.js中，setCoords方法用于更新对象的边界框和转换矩阵。通常情况下，当你对对象进行了一些变换操作（如旋转、缩放、平移等），需要手动调用setCoords方法来更新对象的坐标。

具体来说，当你对对象进行了以下操作时，需要调用setCoords方法：

- 旋转对象
- 缩放对象
- 平移对象
- 修改对象的位置或大小

通过调用setCoords方法，可以确保对象的边界框和转换矩阵与实际的变换操作保持同步，以便正确地渲染和处理对象。

需要注意的是，如果你使用了Fabric.js的内置控制点来操作对象的变换，通常不需要手动调用setCoords方法，因为它们会自动更新对象的坐标。

2. fabric.js renderAll 方法什么时候调用？

renderAll 方法是 fabric.js 中用来重新渲染画布中所有对象的方法。一般情况下，当画布中的任何对象发生变化时，都需要调用 renderAll 方法来更新画布。如果你使用的是 fabric.js 的动画功能，那么 renderAll 方法会在每一帧中被自动调用。