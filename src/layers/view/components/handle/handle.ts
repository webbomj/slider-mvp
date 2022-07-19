import { EventName, IHandleProps } from "../../../interfaces/interfaces";
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
    this.update(this.shift);
  }
  render = () => {
    const handle = document.createElement("div");
    handle.classList.add("lineBlock__handler");
    this.handle = handle;
    this.container.append(handle);
    this.handle.addEventListener("mousedown", (e: PointerEvent) =>
      this.clickHandler(e)
    );
  };

  clickHandler = (event: PointerEvent) => {
    this.observer.notify({
      eventName: EventName.clickedHandle,
      eventPayload: event,
    });
  };

  update = (value: number) => {
    this.shift = value;
    this.handle.style.left = `${this.shift}%`;
  };
}

export default Handle;
