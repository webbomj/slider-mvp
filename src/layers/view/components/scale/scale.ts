import { IScaleOptions, IViewOptions } from "../../../interfaces/interfaces";

class Scale {
  arrayScale: number[];
  container: HTMLElement;
  shift: number;
  constructor({ arrayScale, container, shift }: IScaleOptions) {
    this.arrayScale = arrayScale;
    this.container = container;
    this.shift = shift;
    this.render();
  }

  render = () => {
    const scale = document.createElement("div");
    scale.classList.add("lineBlock__scale");
    this.arrayScale.forEach((el, idx) => {
      let scaleNumber = this.createItem();
      scaleNumber.style.left = `${this.shift}`;
      scaleNumber.textContent = `${el}`;

      scale.appendChild(scaleNumber);
    });

    this.container.appendChild(scale);
    const scaleNode = this.container.querySelector(".lineBlock__scale");
    if (scaleNode) {
      const scaleItemsNode = scaleNode.querySelectorAll(
        ".lineBlock__scaleItem"
      );
      let margin = 0;
      for (let index = 0; index < scaleItemsNode.length; index++) {
        scaleItemsNode[index].style.left = `${margin}%`;
        margin += this.shift;
      }
      margin = 0;
    }
  };

  createItem = () => {
    const scale = document.createElement("div");
    scale.classList.add("lineBlock__scaleItem");
    return scale;
  };
}

export default Scale;
