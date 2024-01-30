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

export interface ICommonCOnfig {
  textContent: zrender.Text;
  textConfig?: zrender.ElementTextConfig;
  draggable?: boolean;
}

const commonConfig: ICommonCOnfig = {
  textContent: new zrender.Text({
    style: {
      text: 'title',
      fill: '#333',
      font: '10px Arial'
    }
  }),
  textConfig: {
    position: 'inside'
  },
  draggable: true
}

const shapeConfig = {
  rect: {
    style: defaultStyleConfig,
    shape: defaultShapeConfig
  } 
}

export { shapeConfig, commonConfig };
