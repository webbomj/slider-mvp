import {
  EventName,
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
      to: 0,
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
    // this.view.subscribe({
    //   eventName: "updateView",
    //   function: this.updateView,
    // });
    // this.model.subscribe({
    //   eventName: "updateModel",
    //   function: this.updateModel,
    // });
    this.subscribe();
  }

  clickedScaleItemHandler = (e: MouseEvent) => {
    const newFromValue = +e.target?.textContent;
    if (typeof newFromValue === "number") {
      this.model.updateState({
        type: ModelAction.setFromValue,
        payload: { value: newFromValue },
      });
    }
  };

  subscribe = () => {
    this.view.subscribe({
      eventName: EventName.clickedScaleItem,
      function: this.clickedScaleItemHandler,
    });
  };

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
