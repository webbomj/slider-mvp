import {
  IModelOptions,
  IScaleOptions,
  ISubscriber,
  IUpdateViewProps,
  IViewInitProps,
  IViewOptions,
} from '../interfaces/interfaces';
import Observer from '../observer/observer';
import lineBlock from './components/lineBlock/lineBlock';
import Scale from './components/scale/scale';

class View {
  private container: HTMLElement;
  private options: IModelOptions;
  public observer: Observer;
  private slider: lineBlock;
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

  private init = ({ scaleOptions, lineBlockOptions }: IViewInitProps) => {
    this.slider = new lineBlock({
      container: this.container,
      model: this.options,
      observer: this.observer,
      options: lineBlockOptions,
    });
    if (this.options.isScale) {
      let scaleProps: IScaleOptions = {
        container: this.container,
        arrayScale: scaleOptions.scale,
        shift: scaleOptions.shift,
        observer: this.observer,
        isVertical: this.isVertical,
      };
      this.scale = new Scale(scaleProps);
    }
  };

  public updateView = ({
    model,
    scaleProps,
    lineBlockOptions,
  }: IUpdateViewProps) => {
    this.slider.update(model, lineBlockOptions);
    if (model.isScale) {
      this.scale.update(scaleProps);
    }
  };

  public subscribe = (subscriber: ISubscriber) => {
    this.observer.subscribe(subscriber);
  };
}

export default View;
