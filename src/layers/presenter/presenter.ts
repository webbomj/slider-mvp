import { IModelOptions, IPresenterOptions } from "../interfaces/interfaces";
import Model from "../model/model";
import View from "../view/view";

class Presenter {
  private model;
  private view;
  constructor({ options, container }: IPresenterOptions) {
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
    const joinOptions = { ...defaultOptions, ...options };
    this.model = new Model(joinOptions);
    this.view = new View({ options: joinOptions, container });
  }
}

export default Presenter;
