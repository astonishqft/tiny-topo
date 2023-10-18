// 定义命令接口
interface Command {
  execute(): void;
  undo(): void;
  redo(): void;
}

export default Command;
