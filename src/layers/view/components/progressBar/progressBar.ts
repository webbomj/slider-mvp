import {
  IProgressBarOptions,
  IProgressBarUpdateProps,
} from "../../../interfaces/interfaces";

class ProgressBar {
  private container: HTMLElement;
  private shiftFrom: number;
  private width: number;
  constructor({ container, shiftFrom, width }: IProgressBarOptions) {
    this.container = container;
    this.shiftFrom = shiftFrom;
    this.width = width;
    this.render(this.container);
  }
  render = (container: HTMLElement): void => {
    const progressBar = document.createElement("div");
    progressBar.classList.add("lineBlock__progressBar");
    container.appendChild(progressBar);
    this.update({ shiftFrom: this.shiftFrom, width: this.width });
  };

  update = ({ shiftFrom, width }: IProgressBarUpdateProps): void => {
    console.log("обнова прогресс бара", shiftFrom, width);
    this.shiftFrom = shiftFrom;
    this.width = width;
    const progressBarNode = this.container.querySelector(
      ".lineBlock__progressBar"
    );
    if (progressBarNode) {
      progressBarNode.style.width = `${this.width}%`;
      progressBarNode.style.left = `${this.shiftFrom}%`;
    }
  };
}

export default ProgressBar;
