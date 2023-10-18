import type Element from 'zrender/lib/Element';
import Command from './command';

class AddNodes implements Command {
  private nodes: Element[];
  private flowEditor: FlowEditor;

  constructor(nodes: Element[], flowEditor: FlowEditor) {
    this.flowEditor = flowEditor;
    this.nodes = nodes;
  }

  execute () {
    this.nodes.forEach((node: Element) => this.flowEditor.addNode(node));
  }

  undo() {
    this.nodes.forEach((node: Element) => this.flowEditor.removeNode(node));
  }

  redo() {
    this.execute();
  }
}

class AddConnector implements Command {
  private onnector: Connector;
  private flowEditor: any;

  constructor(onnector: Connector, flowEditor: Editor) {
    this.flowEditor = flowEditor;
    this.onnector = onnector;
  }

  execute () {  
    this.flowEditor.addConnector(this.onnector);
  }

  undo() {
    this.flowEditor.removeConnector(this.onnector);
  }

  redo() {
    this.execute();
  }
}

export {
  AddNodes,
  AddConnector
};
