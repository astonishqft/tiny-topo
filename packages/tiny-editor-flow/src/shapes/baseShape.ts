import TinyFlowEditor from '../tinyFlowEditor';
import type { IShapeConfig } from '../types';

class BaseShape {
  private editor: TinyFlowEditor
  constructor(editor: TinyFlowEditor, config: IShapeConfig) {
    this.editor = editor;

    this.initEvent()
  }

  initEvent() {
    // this.on
  }
}

export default BaseShape;
