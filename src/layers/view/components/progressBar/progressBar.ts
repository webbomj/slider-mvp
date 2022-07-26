import {
  IProgressBarOptions,
  IProgressBarUpdateProps,
} from "../../../interfaces/interfaces";
import Observer from "../../../observer/observer";

class ProgressBar {
  private container: HTMLElement;
  private shiftFrom: number;
  private width: number;
  private observer: Observer;
  private isVertical: boolean;
  constructor({
    container,
    shiftFrom,
    width,
    observer,
    isVertical,
  }: IProgressBarOptions) {
    this.container = container;
    this.shiftFrom = shiftFrom;
    this.isVertical = isVertical;
    this.width = width;
    this.observer = observer;
    this.render(this.container);
  }
  private render = (container: HTMLElement): void => {
    const progressBar = document.createElement("div");
    progressBar.classList.add("lineBlock__progressBar");
    container.appendChild(progressBar);
    this.update({
      shiftFrom: this.shiftFrom,
      width: this.width,
      isVertical: this.isVertical,
    });
  };

  update = ({
    shiftFrom,
    width,
    isVertical,
  }: IProgressBarUpdateProps): void => {
    this.shiftFrom = shiftFrom;

    this.width = width;
    const progressBarNode: HTMLElement | null = this.container.querySelector(
      ".lineBlock__progressBar"
    );
    if (progressBarNode) {
      if (isVertical) {
        progressBarNode.style.top = `${this.shiftFrom}%`;
        progressBarNode.style.height = `${this.width}%`;
      } else {
        progressBarNode.style.left = `${this.shiftFrom}%`;
        progressBarNode.style.width = `${this.width}%`;
      }
    }
  };
}

export default ProgressBar;
