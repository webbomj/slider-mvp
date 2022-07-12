import { IModelOptions, IPresenterOptions } from "../interfaces/interfaces";
import Model from "../model/model";

class Presenter {
  private model;
  private view;
  constructor({ options }: IPresenterOptions) {
    const defaultOptions: IModelOptions = {
      min: 0,
      max: 100,
      from: 20,
      to: null,
      step: 1,
      isVertical: false,
      isInterval: false,
      isLabel: true,
      isScale: true,
      isProgressBar: true,
    };
    this.model = new Model({ ...defaultOptions, ...options });
  }
}
