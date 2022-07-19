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
import { getCoords } from "./utils/handle";
import { lineBlockCreator } from "./utils/lineBlock";

class Presenter {
  private model;
  private view;
  private state: IModelOptions;
  private container;
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
    this.container = container;
    const joinOptions = { ...defaultOptions, ...options };
    this.model = new Model(joinOptions);
    this.getState();
    console.log(this.state);
    const scaleOptions = this.createArrScale();

    const lineBlockOptions = this.createLineBlock();
    this.view = new View({
      options: joinOptions,
      container: this.container,
      scaleOptions,
      lineBlockOptions,
    });

    this.subscribe();
  }

  getState = () => {
    this.state = this.model.getState();
  };

  createLineBlock = () => {
    this.getState();
    const { progressWidth, shiftFrom, shiftTo } = lineBlockCreator(this.state);
    return { progressBarWidth: progressWidth, shift: shiftTo, shiftFrom };
  };

  createArrScale = () => {
    const { max, min, step } = this.state;
    const { scale, shift } = arrScaleCreator({ max, min, step });
    return { scale, shift };
  };

  clickedScaleItemHandler = (e: MouseEvent) => {
    const newToValue = +e.target?.textContent;
    if (typeof newToValue === "number") {
      this.model.updateState({
        type: ModelAction.setToValue,
        payload: { value: newToValue },
      });
    }
  };

  clickedHandleHandler = (event: PointerEvent) => {
    let sliderSpan = event.target;
    let slider = this.container.querySelector(".lineBlock");

    const { max, min, step } = this.state;

    let sliderCoords = getCoords(slider);
    let sliderSpanCoords = getCoords(sliderSpan);
    let shift = event.pageX - sliderSpanCoords.left;

    const mouseMoveHandler = (e: PointerEvent) => handleMove(e);
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", mouseMoveHandler);
    });

    //Начнем движение ползунка
    const handleMove = (evt: PointerEvent) => {
      let left =
        ((evt.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
      if (left < 0) left = 0;
      if (left > 100) left = 100;

      //Шаг слайдера
      let stepCount = (max - min) / step;
      let stepPercent = 100 / stepCount;
      let stepLeft = Math.round(left / stepPercent) * stepPercent;
      if (stepLeft < 0) stepLeft = 0;
      if (stepLeft > 100) stepLeft = 100;

      //Расчитаем значение равное шагу слайдера
      let result = Number(((stepLeft / stepPercent) * step).toFixed());
      let value = result + min;
      this.model.updateState({
        type: ModelAction.setToValue,
        payload: { value },
      });
    };

    return false;
  };

  modelWasUpdate = (model: IModelOptions): void => {
    this.getState();
    const scaleProps: IScaleProps = this.createArrScale();
    const lineBlockOptions = this.createLineBlock();
    console.log(lineBlockOptions);
    this.view.updateView({ model, scaleProps, lineBlockOptions });
  };

  subscribe = () => {
    this.view.subscribe({
      eventName: EventName.clickedScaleItem,
      function: this.clickedScaleItemHandler,
    });

    this.view.subscribe({
      eventName: EventName.clickedHandle,
      function: this.clickedHandleHandler,
    });

    // model sub
    this.model.subscribe({
      eventName: EventName.modelWasUpdate,
      function: this.modelWasUpdate,
    });
  };
}

export default Presenter;
