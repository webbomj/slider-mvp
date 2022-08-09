import {
  EventName,
  HandlePosition,
  IHandleProps,
} from "../../../interfaces/interfaces";
import Observer from "../../../observer/observer";
import "./handle.scss";

class Handle {
  private container: HTMLElement;

  private shift: number;

  private isVertical: boolean;

  private handle: HTMLElement;

  private observer: Observer;

  private handlePosition: HandlePosition | undefined;

  constructor({
    container,
    shift,
    observer,
    handlePosition,
    isVertical,
  }: IHandleProps) {
    this.container = container;
    this.shift = shift;
    this.observer = observer;
    this.handlePosition = handlePosition;
    this.isVertical = isVertical;
    this.render();
  }

  private render = () => {
    const handle = document.createElement("div");
    handle.classList.add("handler");
    if (this.handlePosition) {
      handle.dataset.handle = this.handlePosition;
    }
    this.handle = handle;
    this.container.append(handle);
    this.handle.addEventListener("pointerdown", (e: PointerEvent) =>
      this.clickHandler(e)
    );
    this.update(this.shift, this.isVertical);
  };

  private clickHandler = (event: PointerEvent) => {
    this.observer.notify({
      eventName: EventName.clickedHandle,
      eventPayload: event,
    });
  };

  public update = (value: number, isVertical: boolean = false) => {
    this.shift = value;
    this.isVertical = isVertical;
    if (this.isVertical) {
      this.handle.style.top = `${this.shift}%`;
    } else {
      this.handle.style.left = `${this.shift}%`;
    }
  };
}

export default Handle;
