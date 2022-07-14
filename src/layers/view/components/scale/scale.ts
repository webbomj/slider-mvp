import { IScaleOptions, IViewOptions } from "../../../interfaces/interfaces";

class Scale {
  arrayScale: number[];
  container: HTMLElement;
  constructor({ arrayScale, container }: IScaleOptions) {
    this.arrayScale = arrayScale;
    this.container = container;
    this.render();
  }

  render = () => {
    const scale = document.createElement("div");
    scale.classList.add("lineBlock__scale");

    this.arrayScale.forEach((el, idx) => {
      let scaleNumber = this.createItem();

      scaleNumber.textContent = `${el}`;

      scale.appendChild(scaleNumber);
    });

    this.container.appendChild(scale);
  };

  createItem = () => {
    const scale = document.createElement("div");
    scale.classList.add("lineBlock__scaleItem");
    return scale;
  };
}

export default Scale;
