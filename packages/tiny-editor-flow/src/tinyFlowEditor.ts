import { Canvas, FabricObject, Group, ActiveSelection } from 'fabric'
import { ShapeManage } from './shapes/shapeManage'
import type { TinyFlowEditorOptions, AddNodeType } from './types'
import type { TPointerEventInfo, TPointerEvent } from 'fabric'

class TinyFlowEditor extends Canvas {
  private nodes: FabricObject[] = []
  private connectLines: FabricObject[] = []
  private groups: Group[] = []
  private shapeManage: ShapeManage

  // 鼠标是否点击，也就是开始拖拽的标记位
  private isDrag = false

  // 鼠标按下时，相对画布x轴的距离
  private startLeft = 0

  // 鼠标按下时，相对画布y轴的距离
  private startTop = 0

  constructor(opts: TinyFlowEditorOptions) {
    const { containerId, width, height } = opts;
    super(containerId, {
      width,
      height
    });


    this.shapeManage = new ShapeManage()

    this.initEvent()
  }

  addNode({ nodeType, shapeConfig }: AddNodeType) {
    const { x, y } = shapeConfig
    if (x && y) {
      const node = this.shapeManage.getShape(nodeType, { left: x, top: y }, this)
     
      this.add(node)
      this.nodes.push(node)
    }
  }

  discardActiveNode() {
    this.discardActiveObject()
  }

  selectNode(node) {
    console.log('node', node)
    console.log('this.', this)
    const sel = new ActiveSelection([node], {
      canvas: this
    });
    this.setActiveObject(sel)
    this.requestRenderAll()
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
    
    this.on('mouse:move', (e: TPointerEventInfo<TPointerEvent>) => {
      if (e.target) {
        e.target.setCoords()
      }
    })

    this.on('mouse:down', (e: TPointerEventInfo<TPointerEvent>) => {
      if (e.target) {
        console.log('mouse:down', e.target)
        this.startLeft = e.target.left
        this.startTop = e.target.top
        this.isDrag = true


        // this.discardActiveNode()

        // this.selectNode(e.target)
      }
    })
  }
}

export default TinyFlowEditor;
