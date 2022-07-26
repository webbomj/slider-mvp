import { ILabelProps } from "../../../interfaces/interfaces";
import Observer from "../../../observer/observer";

class Label {
  private label: HTMLElement;
  private container: HTMLElement;
  private shift: number;
  private observer: Observer;
  private isVertical: boolean;
  private text: number;
  constructor({ container, shift, text, observer, isVertical }: ILabelProps) {
    this.container = container;
    this.shift = shift;
    this.text = text;
    this.isVertical = isVertical;
    this.observer = observer;
    const label = document.createElement("div");
    this.label = label;
    this.render();
  }
  private render = () => {
    this.label.classList.add("lineBlock__label");
    this.container.append(this.label);
    this.update(this.text, this.shift);
  };
  update = (value: number, shift: number) => {
    this.text = value;
    this.label.textContent = `${this.text}`;
    this.shift = shift;
    if (this.isVertical) {
      this.label.style.top = `${this.shift}%`;
    } else {
      this.label.style.left = `${this.shift}%`;
    }
  };
}

export default Label;
