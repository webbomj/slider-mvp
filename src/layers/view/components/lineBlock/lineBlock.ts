import { ILineBlockOptions } from "../../../interfaces/interfaces";
import Handle from "../handle/handle";
import Label from "../label/label";
import ProgressBar from "../progressBar/progressBar";

class lineBlock {
  private container: HTMLElement;
  private firstHandler;
  private secondHandler;
  private firstLabel;
  private progressBar;

  constructor(options: ILineBlockOptions) {
    const { container } = options;
    this.container = container;
    this.init();
  }

  init = () => {
    const lineBlock = document.createElement("div");
    const activeBlock = document.createElement("div");

    lineBlock.id = "lineBlock";
    activeBlock.id = "activeBlock";

    this.firstHandler = new Handle().render(activeBlock);
    this.firstLabel = new Label().render(activeBlock);
    lineBlock.append(activeBlock);

    this.progressBar = new ProgressBar().render(lineBlock);
    if (this.container) {
      this.container.append(lineBlock);
    }
  };
}

export default lineBlock;
