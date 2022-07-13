import {
  IModelOptions,
  ModelAction,
  IModelAction,
} from "../interfaces/interfaces";

export default class Model {
  private minValue: number;

  private maxValue: number;

  private fromValue: number;

  private toValue: number;

  private step: number;

  private isVertical: boolean;

  private isInterval: boolean;

  private isLabel: boolean;

  private isScale: boolean;

  private isProgressBar: boolean;

  constructor(options: IModelOptions) {
    const {
      min,
      max,
      from,
      to,
      step,
      isVertical,
      isInterval,
      isLabel,
      isScale,
      isProgressBar,
    } = options;

    this.minValue = min;
    this.maxValue = max;
    this.fromValue = from;
    this.step = step;
    this.isVertical = isVertical;
    this.isInterval = isInterval;
    this.isLabel = isLabel;
    this.isScale = isScale;
    this.isProgressBar = isProgressBar;

    if (to) {
      this.toValue = to;
    }
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
        default:
          break;
      }
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
        default:
          break;
      }
    }
  };
}
