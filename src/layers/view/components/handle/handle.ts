import { IHandleProps } from "../../../interfaces/interfaces";

class Handle {
  private container: HTMLElement;
  private shift: number;
  private handle: HTMLElement;
  constructor({ container, shift }: IHandleProps) {
    this.container = container;
    this.shift = shift;
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
