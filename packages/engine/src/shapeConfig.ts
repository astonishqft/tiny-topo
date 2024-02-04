import * as zrender from 'zrender'

export interface IShapeTextConfig {
  textContent: zrender.Text;
  textConfig?: zrender.ElementTextConfig;
}

const getDefaultTextConfig = (): IShapeTextConfig => {
  return {
    textContent: new zrender.Text({
      style: {
        text: 'title',
        fill: '#333',
        font: '10px Arial'
      }
    }),
    textConfig: {
      position: 'inside'
    }
  }
}

const shapeConfig = {
  rect: {
    style: {
      fill: '#fff',
      stroke: '#333',
      lineWidth: 1,
      fontWeight: 'normal',
      fontSize: 12,
      opacity: 1
    },
    shape: {
      x: 0,
      y: 0,
      width: 80,
      height: 80
    }
  },
  circle: {
    style: {
      fill: '#fff',
      stroke: '#333',
      lineWidth: 1,
      fontWeight: 'normal',
      fontSize: 12,
      opacity: 1
    },
    shape: {
      cx: 40,
      cy: 40,
      r: 40
    } 
  }
}

export { shapeConfig, getDefaultTextConfig }
