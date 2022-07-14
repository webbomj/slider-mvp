import {
  IModelOptions,
  IObserver,
  IScaleOptions,
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
    const { min, max, step } = this.options;
    const arrScale = this.createArrScale(min, max, step);
    let scaleOptions: IScaleOptions = {
      container: this.container,
      arrayScale: arrScale,
    };
    this.scale = new Scale(scaleOptions);
  };

  createArrScale = (min: number, max: number, step: number) => {
    let arrayScale = [];
    for (let index = min; index <= max; index += step) {
      arrayScale.push(index);
    }
    return arrayScale;
  };

  updateView = () => {};
}

export default View;
