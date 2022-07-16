import { IHandleProps } from "../../../interfaces/interfaces";
import Observer from "../../../observer/observer";

class Handle {
  private container: HTMLElement;
  private shift: number;
  private handle: HTMLElement;
  private observer: Observer;
  constructor({ container, shift, observer }: IHandleProps) {
    this.container = container;
    this.shift = shift;
    this.observer = observer;
    this.render();
  }
  render = () => {
    const handle = document.createElement("div");
    handle.classList.add("lineBlock__handler");
    this.container.append(handle);
    this.handle = handle;
    this.update(this.shift);
  };

  update = (value: number) => {
    this.shift = value;
    this.handle.style.left = `${this.shift}%`;
  };
}

export default Handle;
