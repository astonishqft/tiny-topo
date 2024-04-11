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
        fontSize: 12,
        fontFamily: 'Arial'
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
      width: 60,
      height: 60
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
      cx: 30,
      cy: 30,
      r: 30
    } 
  },
  roundRect: {
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
      width: 60,
      height: 60,
      r: 4
    }
  }
}

export { shapeConfig, getDefaultTextConfig }
