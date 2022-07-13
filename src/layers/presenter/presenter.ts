import {
  IModelOptions,
  IPresenterOptions,
  ModelAction,
} from "../interfaces/interfaces";
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
    this.view.observer.subscribe({
      eventName: "updateView",
      function: this.updateView,
    });
    this.model.observer.subscribe({
      eventName: "updateModel",
      function: this.updateModel,
    });
  }
  updateModel = (data: Partial<IModelOptions>) => {
    this.model.updateState({
      type: ModelAction.setMinValue,
      payload: { value: 100 },
    });
  };
  updateView = (data: Partial<IModelOptions>) => {
    this.view.updateView();
  };
}

export default Presenter;
