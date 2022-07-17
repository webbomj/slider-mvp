import {
  IModelOptions,
  IObserver,
  IScaleOptions,
  ISubscriber,
  IViewOptions,
} from "../interfaces/interfaces";
import Observer from "../observer/observer";
import lineBlock from "./components/lineBlock/lineBlock";
import Scale from "./components/scale/scale";

class View {
  private container: HTMLElement;
  private options: IModelOptions;
  public observer: Observer;
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
      observer: this.observer,
    });
    const { min, max, step } = this.options;
    const arrScale = this.createArrScale(min, max, step);
    const stepInPercent = (100 / (max - min)) * step;
    let scaleOptions: IScaleOptions = {
      container: this.container,
      arrayScale: arrScale,
      shift: stepInPercent,
      observer: this.observer,
    };

    this.scale = new Scale(scaleOptions);
  };

  createArrScale = (min: number, max: number, step: number) => {
    let arrayScale = [];
    for (let index = min; index <= max; index += step) {
      arrayScale.push(index);
    }
    if (max % step !== 0) {
      arrayScale.push(max);
    }
    return arrayScale;
  };

  updateView = () => {};

  public subscribe = (subscriber: ISubscriber) => {
    this.observer.subscribe(subscriber);
  };
}

export default View;
