import {
  IModelOptions,
  IObserver,
  IViewOptions,
} from "../interfaces/interfaces";
import Observer from "../observer/observer";
import lineBlock from "./components/lineBlock/lineBlock";
import Scale from "./components/scale/scale";

class View {
  private container: HTMLElement;
  private options: IModelOptions;
  public observer: IObserver;
  private slide;
  private scale;

  constructor({ options, container }: IViewOptions) {
    this.container = container;
    this.options = options;
    this.observer = new Observer();
    this.init();
  }

  init = () => {
    this.slide = new lineBlock({
      container: this.container,
      options: this.options,
    });
    this.scale = new Scale().render(this.container);
  };

  updateView = () => {};
}

export default View;
