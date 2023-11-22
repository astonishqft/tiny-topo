import Konva from 'konva'
import { ShapeManage } from './shapes/shapeManage'
import type { TinyFlowEditorOptions, AddNodeType, IShape } from './types'
// import type { Shape } from 'konva'

class TinyFlowEditor extends Konva.Stage {
  private nodes: Konva.Shape[] = []
  private connectLines: Konva.Shape[] = []
  private groups: Konva.Group[] = []
  private shapeManage: ShapeManage

  private layer: Konva.Layer = new Konva.Layer()

  // 鼠标是否点击，也就是开始拖拽的标记位
  private isDrag = false

  // 鼠标按下时，相对画布x轴的距离
  private startLeft = 0

  // 鼠标按下时，相对画布y轴的距离
  private startTop = 0

  constructor(opts: TinyFlowEditorOptions) {
    const { containerId, width, height } = opts;
    super({
      container: containerId,
      width,
      height
    });

    this.add(this.layer)

    this.shapeManage = new ShapeManage()

    this.initEvent()
  }

  addNode({ nodeType, shapeConfig }: AddNodeType) {
    const { x, y } = shapeConfig
    if (x && y) {
      const node = this.shapeManage.getShape(nodeType, { x, y })

      this.layer.add(node)
      console.log('add node', node)
      node.anchor.bars.forEach(bar => {
        console.log('bar', bar)
        this.layer.add(bar)
      });
      this.nodes.push(node)
    }
  }

  discardActiveNode() {
    
  }

  selectNode(node) {
    
  }

  initEvent() {
    // this.on('mouse:over', (e: TPointerEventInfo<TPointerEvent>) => {
    //   if (e.target) {
    //     e.target.set('fill', 'red');
    //     this.renderAll();
    //   }
    // })

    // this.on('mouse:out', (e: TPointerEventInfo<TPointerEvent>) => {
    //   if (e.target) {
    //     e.target.set('fill', 'green');
    //     this.renderAll();
    //   }
    // })
    
    this.on('mouse:move', (e) => {
     
    })

    this.on('mouse:down', (e) => {
      if (e.target) {

        this.isDrag = true


      }
    })
  }
}

export default TinyFlowEditor;
