import {
  IModelOptions,
  ModelAction,
  IModelAction,
  IObserver,
  ISubscriber,
  EventName,
} from "../interfaces/interfaces";
import Observer from "../observer/observer";

export default class Model {
  private minValue: number;

  private maxValue: number;

  private fromValue: number;

  private toValue: number;

  private step: number;

  private stepScale: number;

  private isVertical: boolean;

  private isInterval: boolean;

  private isLabel: boolean;

  private isScale: boolean;

  private isProgressBar: boolean;

  public observer: IObserver = new Observer();

  constructor(options: IModelOptions) {
    const {
      min,
      max,
      from,
      to,
      step,
      stepScale,
      isVertical,
      isInterval,
      isLabel,
      isScale,
      isProgressBar,
    } = options;

    this.minValue = min;
    this.maxValue = max;
    this.fromValue = from;
    this.toValue = to;
    this.step = step;
    this.stepScale = stepScale;
    this.isVertical = isVertical;
    this.isInterval = isInterval;
    this.isLabel = isLabel;
    this.isScale = isScale;
    this.isProgressBar = isProgressBar;
  }

  updateState = ({ type, payload }: IModelAction): void => {
    if (typeof payload.value === "number") {
      switch (type) {
        case ModelAction.setMinValue:
          this.minValue = payload.value;
          break;
        case ModelAction.setMaxValue:
          this.maxValue = payload.value;
          break;
        case ModelAction.setFromValue:
          this.fromValue = payload.value;
          break;
        case ModelAction.setToValue:
          this.toValue = payload.value;
          break;
        case ModelAction.setStep:
          this.step = payload.value;
          break;
        case ModelAction.setStepScale:
          this.stepScale = payload.value;
          break;
      }
      this.observer.notify({
        eventName: EventName.modelWasUpdate,
        eventPayload: this.getState(),
      });
    } else if (typeof payload.value === "boolean") {
      switch (type) {
        case ModelAction.setIsVertical:
          this.isVertical = payload.value;
          break;
        case ModelAction.setIsInterval:
          this.isInterval = payload.value;
          break;
        case ModelAction.setIsLabel:
          this.isLabel = payload.value;
          break;
        case ModelAction.setIsProgressBar:
          this.isProgressBar = payload.value;
          break;
        case ModelAction.setIsScale:
          this.isScale = payload.value;
          break;
      }
      this.observer.notify({
        eventName: EventName.modelWasUpdate,
        eventPayload: this.getState(),
      });
    } else if (typeof payload.value === "object") {
      switch (type) {
        case ModelAction.setFullState:
          this.minValue = payload.value.min;
          this.maxValue = payload.value.max;
          this.fromValue = payload.value.from;
          this.toValue = payload.value.to;
          this.step = payload.value.step;
          this.stepScale = payload.value.stepScale;
          this.isVertical = payload.value.isVertical;
          this.isInterval = payload.value.isInterval;
          this.isLabel = payload.value.isLabel;
          this.isScale = payload.value.isScale;
          this.isProgressBar = payload.value.isProgressBar;
          break;
      }
      this.observer.notify({
        eventName: EventName.modelWasUpdate,
        eventPayload: this.getState(),
      });
    }
    console.log(type, payload.value);
  };

  public subscribe = (subscriber: ISubscriber) => {
    this.observer.subscribe(subscriber);
  };

  public getState = (): IModelOptions => {
    return {
      from: this.fromValue,
      isInterval: this.isInterval,
      isLabel: this.isLabel,
      isProgressBar: this.isProgressBar,
      isScale: this.isScale,
      isVertical: this.isVertical,
      max: this.maxValue,
      min: this.minValue,
      step: this.step,
      stepScale: this.stepScale,
      to: this.toValue,
    };
  };
}
