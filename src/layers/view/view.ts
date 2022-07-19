import {
  IModelOptions,
  IScaleOptions,
  ISubscriber,
  IUpdateViewProps,
  IViewInitProps,
  IViewOptions,
} from "../interfaces/interfaces";
import Observer from "../observer/observer";
import lineBlock from "./components/lineBlock/lineBlock";
import Scale from "./components/scale/scale";

class View {
  private container: HTMLElement;
  private options: IModelOptions;
  public observer: Observer;
  private slide: lineBlock;
  private scale: Scale;
  private isVertical: boolean;

  constructor({
    options,
    container,
    scaleOptions,
    lineBlockOptions,
  }: IViewOptions) {
    this.container = container;
    this.options = options;
    this.observer = new Observer();
    this.isVertical = options.isVertical;
    this.init({ scaleOptions, lineBlockOptions });
  }

  init = ({ scaleOptions, lineBlockOptions }: IViewInitProps) => {
    this.slide = new lineBlock({
      container: this.container,
      model: this.options,
      observer: this.observer,
      options: lineBlockOptions,
    });

    let scaleProps: IScaleOptions = {
      container: this.container,
      arrayScale: scaleOptions.scale,
      shift: scaleOptions.shift,
      observer: this.observer,
      isVertical: this.isVertical,
    };

    this.scale = new Scale(scaleProps);
  };

  updateView = ({ model, scaleProps, lineBlockOptions }: IUpdateViewProps) => {
    this.slide.update(model, lineBlockOptions);
    this.scale.update(scaleProps);
  };

  public subscribe = (subscriber: ISubscriber) => {
    this.observer.subscribe(subscriber);
  };
}

export default View;
