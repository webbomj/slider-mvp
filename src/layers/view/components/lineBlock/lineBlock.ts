import {
  HandlePosition,
  ILineBlockOptions,
  ILineBlockProps,
  IModelOptions,
  IProgressBarOptions,
} from "../../../interfaces/interfaces";
import Observer from "../../../observer/observer";
import Handle from "../handle/handle";
import Label from "../label/label";
import ProgressBar from "../progressBar/progressBar";
import "./lineBlock.scss";

class lineBlock {
  private container: HTMLElement;
  private state;
  private progressBar: ProgressBar;
  private labelTo: Label;
  private labelFrom: Label;
  private handleTo: Handle;
  private handleFrom: Handle;
  private observer: Observer;

  constructor(lineOptions: ILineBlockProps) {
    const { container, model, observer, options } = lineOptions;
    this.container = container;
    this.state = model;
    this.observer = observer;
    this.init(options);
  }

  init = (options: ILineBlockOptions) => {
    const { progressBarWidth, shift, shiftFrom } = options;
    const lineBlock = document.createElement("div");
    const activeBlock = document.createElement("div");

    const { to, from } = this.state;

    lineBlock.classList.add("lineBlock");
    activeBlock.classList.add("lineBlock__active");

    if (this.state.isInterval) {
      this.handleTo = new Handle({
        container: activeBlock,
        shift: shift,
        observer: this.observer,
        handlePosition: HandlePosition.to,
      });

      this.labelTo = new Label({
        container: activeBlock,
        shift: shift,
        text: to,
        observer: this.observer,
      });

      this.handleFrom = new Handle({
        container: activeBlock,
        shift: shiftFrom,
        observer: this.observer,
        handlePosition: HandlePosition.from,
      });

      this.labelFrom = new Label({
        container: activeBlock,
        shift: shiftFrom,
        text: from,
        observer: this.observer,
      });
    } else {
      this.handleTo = new Handle({
        container: activeBlock,
        shift: shift,
        observer: this.observer,
      });
      this.labelTo = new Label({
        container: activeBlock,
        shift: shift,
        text: to,
        observer: this.observer,
      });
    }

    lineBlock.append(activeBlock);

    const ProgressBarOptions: IProgressBarOptions = {
      container: lineBlock,
      shiftFrom: shiftFrom,
      width: progressBarWidth,
      observer: this.observer,
    };

    this.progressBar = new ProgressBar(ProgressBarOptions);
    if (this.container) {
      this.container.append(lineBlock);
    }
  };

  update = (model: IModelOptions, options: ILineBlockOptions) => {
    const { from, to, isInterval } = model;
    const { progressBarWidth, shift, shiftFrom } = options;
    this.handleTo.update(shift);
    this.labelTo.update(to, shift);
    if (isInterval) {
      this.handleFrom.update(shiftFrom);
      this.labelFrom.update(from, shiftFrom);
    }

    this.progressBar.update({
      shiftFrom: shiftFrom,
      width: progressBarWidth,
    });
  };
}

export default lineBlock;
