<script setup lang="ts">
import { onMounted } from 'vue'
import * as zrender from 'zrender'
import Connector from '@qftjs/orthogonal-connector'
import type { Rectangle } from '@qftjs/orthogonal-connector/dist/src/helpers/Rectangle'

interface IPoint {
  x: number
  y: number
}
interface Line {
  a: IPoint
  b: IPoint
}

onMounted(() => {
  const zr = zrender.init(document.getElementById('canvas'))
  const canvasWidth = zr.getWidth()
  const canvasHeight = zr.getHeight()

  const shapeA = {
    x: 400,
    y: 150,
    direction: 'right',
    boundingBox: { x: 300, y: 100, width: 100, height: 100 }
  }

  const shapeB = {
    x: 600,
    y: 450,
    direction: 'left',
    boundingBox: { x: 600, y: 400, width: 100, height: 100 }
  }

  // 锚点A
  const anchorA = new zrender.Circle({
    shape: {
      cx: shapeA.x,
      cy: shapeA.y,
      r: 4
    },
    style: {
      fill: 'red'
    },
    zlevel: 999999
  })

  zr.add(anchorA)

  // 伪锚点
  const fakeAnchorA = new zrender.Circle({
    shape: {
      cx: shapeA.x + 20,
      cy: shapeA.y,
      r: 4
    },
    style: {
      fill: 'blue'
    },
    zlevel: 999999
  })

  zr.add(anchorA)
  zr.add(fakeAnchorA)

  // 锚点B
  const anchorB = new zrender.Circle({
    shape: {
      cx: shapeB.x,
      cy: shapeB.y,
      r: 4
    },
    style: {
      fill: 'red'
    },
    zlevel: 999999
  })

  // 伪锚点
  const fakeAnchorB = new zrender.Circle({
    shape: {
      cx: shapeB.x - 20,
      cy: shapeB.y,
      r: 4
    },
    style: {
      fill: 'blue'
    },
    zlevel: 999999
  })

  zr.add(anchorB)
  zr.add(fakeAnchorB)

  const rectA = new zrender.Rect({
    shape: shapeA.boundingBox,
    style: {
      stroke: 'blue',
      fill: 'none'
    },
    textContent: new zrender.Text({
      style: {
        text: 'A',
        fill: '#333',
        font: '18px Arial'
      }
    }),
    textConfig: {
      position: 'inside'
    }
  })

  const rectB = new zrender.Rect({
    shape: shapeB.boundingBox,
    style: {
      stroke: 'red',
      fill: 'none'
    },
    textContent: new zrender.Text({
      style: {
        text: 'B',
        fill: '#333',
        font: '18px Arial'
      }
    }),
    textConfig: {
      position: 'inside'
    }
  })

  const paths = Connector.connect({
    shapeA,
    shapeB,
    shapeHorizontalMargin: 20,
    shapeVerticalMargin: 20,
    globalBoundsMargin: 50,
    globalBounds: { x: 0, y: 0, width: canvasWidth, height: canvasHeight }
  })

  // flatA
  // const flatA = new zrender.Rect({
  //   shape: {
  //     x: shapeA.boundingBox.x - 20,
  //     y: shapeA.boundingBox.y - 20,
  //     width: shapeA.boundingBox.width + 40,
  //     height: shapeA.boundingBox.height + 40
  //   },
  //   style: {
  //     lineDash: [5, 5],
  //     stroke: '#000',
  //     fill: 'none'
  //   }
  // })
  // zr.add(flatA)

  // flatB
  // const flatB = new zrender.Rect({
  //   shape: {
  //     x: shapeB.boundingBox.x - 20,
  //     y: shapeB.boundingBox.y - 20,
  //     width: shapeB.boundingBox.width + 40,
  //     height: shapeB.boundingBox.height + 40
  //   },
  //   style: {
  //     lineDash: [5, 5],
  //     stroke: '#000',
  //     fill: 'none'
  //   }
  // })
  // zr.add(flatA)
  // zr.add(flatB)

  const { hRulers, vRulers, grid, spots, connections } = Connector.auxiliaryData

  console.log('auxiliaryData', Connector.auxiliaryData)

  // 第一步：绘制标尺辅助线
  const hRulersPath: Array<Array<Array<number>>> = []
  const vRulersPath: Array<Array<Array<number>>> = []

  hRulers.forEach((ruler: number) => {
    hRulersPath.push([
      [0, ruler],
      [canvasWidth, ruler]
    ])
  })

  vRulers.forEach((ruler: number) => {
    hRulersPath.push([
      [ruler, 0],
      [ruler, canvasHeight]
    ])
  })

  hRulersPath.forEach((path: Array<Array<number>>) => {
    const line = new zrender.Polyline({
      shape: {
        points: path
      },
      style: {
        stroke: '#ccc',
        lineDash: [5, 5] // 设置虚线样式
      }
    })
    zr.add(line)
  })

  vRulersPath.forEach((path: Array<Array<number>>) => {
    const line = new zrender.Polyline({
      shape: {
        points: path
      },
      style: {
        stroke: '#ccc',
        lineDash: [5, 5] // 设置虚线样式
      }
    })
    zr.add(line)
  })

  // 第二步：绘制网格
  grid.forEach((g: Rectangle) => {
    const rect = new zrender.Rect({
      shape: {
        x: g.left,
        y: g.top,
        width: g.width,
        height: g.height
      },
      style: {
        fill: 'rgba(0, 0, 0, 0.1)'
      }
    })

    zr.add(rect)
  })

  // 第三步：绘制参考点
  spots.forEach((s: { x: number; y: number }) => {
    const circle = new zrender.Circle({
      shape: {
        cx: s.x,
        cy: s.y,
        r: 4
      },
      style: {
        fill: 'red'
      }
    })

    zr.add(circle)
  })

  // 第四步：绘制图
  connections.forEach((connection: Line) => {
    const line = new zrender.Line({
      shape: {
        x1: connection.a.x,
        y1: connection.a.y,
        x2: connection.b.x,
        y2: connection.b.y
      },
      style: {
        stroke: 'blue'
      }
    })

    zr.add(line)
  })

  // 绘制最终的轨迹
  const pathPoint = paths.map((p: IPoint) => [p.x, p.y])
  const connectLine = new zrender.Polyline({
    shape: {
      points: pathPoint
    },
    style: {
      // stroke: 'red',
      // lineWidth: 4
    }
  })

  // 绘制连接线箭头

  const arrowLength = 12
  const [x1, y1] = pathPoint[pathPoint.length - 2]

  const [x2, y2] = pathPoint[pathPoint.length - 1]
  const p1 = [x2, y2]

  const angle = Math.atan2(y2 - y1, x2 - x1)
  const p2 = [
    x2 - arrowLength * Math.cos(angle + Math.PI / 8),
    y2 - arrowLength * Math.sin(angle + Math.PI / 8)
  ]
  const p3 = [
    x2 - arrowLength * Math.cos(angle - Math.PI / 8),
    y2 - arrowLength * Math.sin(angle - Math.PI / 8)
  ]

  const arrow = new zrender.Polygon({
    shape: {
      points: [p1, p2, p3]
    },
    style: {
      // stroke: 'red',
      lineWidth: 1
    }
  })

  zr.add(connectLine)
  zr.add(arrow)
  zr.add(rectA)
  zr.add(rectB)
})
</script>

<template>
  <div class="connector-container">
    <div id="canvas"></div>
  </div>
</template>
<style scoped>
.connector-container {
  width: 100%;
  height: 100%;
}

#canvas {
  width: 100%;
  height: 100%;
}
</style>
