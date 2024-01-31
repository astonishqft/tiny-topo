import * as zrender from 'zrender';

const defaultStyleConfig = {
  fill: '#fff',
  stroke: '#333',
  lineWidth: 1,
  fontWeight: 'normal',
  fontSize: 12,
  opacity: 1
};

const defaultShapeConfig = {
  x: 0,
  y: 0,
  width: 80,
  height: 80
};

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
    defaultStyleConfig,
    defaultShapeConfig
  } 
}

export { shapeConfig, getDefaultTextConfig };
