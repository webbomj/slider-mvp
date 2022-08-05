import {
  IProgressBarOptions,
  IProgressBarUpdateProps,
} from "../../../interfaces/interfaces";
import Observer from "../../../observer/observer";
import "./progressBar.scss";

class ProgressBar {
  private container: HTMLElement;
  private shiftFrom: number;
  private width: number;
  private isVertical: boolean;
  constructor({
    container,
    shiftFrom,
    width,
    isVertical,
  }: IProgressBarOptions) {
    this.container = container;
    this.shiftFrom = shiftFrom;
    this.isVertical = isVertical;
    this.width = width;
    this.render(this.container);
  }
  private render = (container: HTMLElement): void => {
    const progressBar = document.createElement("div");
    progressBar.classList.add("progressBar");
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
    const progressBarNode: HTMLElement | null =
      this.container.querySelector(".progressBar");
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
