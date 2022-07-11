import { IModelOptions } from "../interfaces/interfaces";

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

  private setMinValue = (value: number): void => {
    this.minValue = value;
  };
  private setMaxValue = (value: number): void => {
    this.maxValue = value;
  };
  private setFromValue = (value: number): void => {
    this.fromValue = value;
  };
  private setToValue = (value: number): void => {
    this.toValue = value;
  };
  private setStep = (value: number): void => {
    this.step = value;
  };
  private setIsVertical = (value: boolean): void => {
    this.isVertical = value;
  };
  private setIsInterval = (value: boolean): void => {
    this.isInterval = value;
  };
  private setIsLabel = (value: boolean): void => {
    this.isLabel = value;
  };
  private setIsProgressBar = (value: boolean): void => {
    this.isProgressBar = value;
  };
  private setIsScale = (value: boolean): void => {
    this.isScale = value;
  };
}
