import { ILabelProps } from "../../../interfaces/interfaces";
import Observer from "../../../observer/observer";

class Label {
  private label: HTMLElement;
  private container: HTMLElement;
  private shift: number;
  private observer: Observer;
  constructor({ container, shift, text, observer }: ILabelProps) {
    this.container = container;
    this.shift = shift;
    this.observer = observer;
    const label = document.createElement("div");
    this.label = label;
    this.render();
    this.update(text, this.shift);
  }
  render = () => {
    this.label.classList.add("lineBlock__label");
    this.container.append(this.label);
  };
  update = (value: number, shift: number) => {
    this.label.textContent = `${value}`;
    this.shift = shift;
    this.label.style.left = `${this.shift}%`;
  };
}

export default Label;
