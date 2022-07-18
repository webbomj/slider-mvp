import {
  EventName,
  IModelOptions,
  IPresenterOptions,
  IScaleProps,
  ModelAction,
} from "../interfaces/interfaces";
import Model from "../model/model";
import View from "../view/view";
import { arrScaleCreator } from "./utils/scale";

class Presenter {
  private model;
  private view;
  private state: IModelOptions;
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
    this.getState();
    const scaleOptions = this.createArrScale();
    this.view = new View({ options: joinOptions, container, scaleOptions });
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

  getState = () => {
    this.state = this.model.getState();
  };

  createArrScale = () => {
    console.log(this.state);
    const { max, min, step } = this.state;
    const { scale, shift } = arrScaleCreator({ max, min, step });
    return { scale, shift };
  };

  clickedScaleItemHandler = (e: MouseEvent) => {
    const newFromValue = +e.target?.textContent;
    if (typeof newFromValue === "number") {
      this.model.updateState({
        type: ModelAction.setFromValue,
        payload: { value: newFromValue },
      });
    }
  };

  modelWasUpdate = (model: IModelOptions): void => {
    const scaleProps: IScaleProps = this.createArrScale();
    this.view.updateView({ model, scaleProps });
  };

  subscribe = () => {
    this.view.subscribe({
      eventName: EventName.clickedScaleItem,
      function: this.clickedScaleItemHandler,
    });

    // model sub
    this.model.subscribe({
      eventName: EventName.modelWasUpdate,
      function: this.modelWasUpdate,
    });
  };
}

export default Presenter;
