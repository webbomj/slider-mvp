import {
  EventName,
  HandlePosition,
  ILineBlockOptions,
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

  getState = (): void => {
    this.state = this.model.getState();
  };

  createLineBlock = (): ILineBlockOptions => {
    this.getState();
    const { progressWidth, shiftFrom, shiftTo } = lineBlockCreator(this.state);
    return { progressBarWidth: progressWidth, shift: shiftTo, shiftFrom };
  };

  createArrScale = (): IScaleProps => {
    const { max, min, step } = this.state;
    const { scale, shift } = arrScaleCreator({ max, min, step });
    return { scale, shift };
  };

  clickedScaleItemHandler = (e: PointerEvent): void => {
    this.getState();
    const newValue = +e.target?.textContent;
    const { from, to, isInterval } = this.state;
    if (isInterval) {
      const difFromNewValue = Math.abs(Math.abs(from) - Math.abs(newValue));
      const difToNewValue = Math.abs(Math.abs(to) - Math.abs(newValue));

      if (difToNewValue < difFromNewValue) {
        this.model.updateState({
          type: ModelAction.setToValue,
          payload: { value: newValue },
        });
      } else if (difToNewValue > difFromNewValue) {
        this.model.updateState({
          type: ModelAction.setFromValue,
          payload: { value: newValue },
        });
      } else if (difFromNewValue === difToNewValue) {
        if (newValue < to) {
          this.model.updateState({
            type: ModelAction.setFromValue,
            payload: { value: newValue },
          });
        } else {
          this.model.updateState({
            type: ModelAction.setToValue,
            payload: { value: newValue },
          });
        }
      }
    } else {
      this.model.updateState({
        type: ModelAction.setToValue,
        payload: { value: newValue },
      });
    }
  };

  clickedHandleHandler = (event: PointerEvent): void => {
    const { max, min, step, isInterval, isVertical, to, from } = this.state;

    let sliderSpan = event.target;
    let slider = this.container.querySelector(".lineBlock");

    if (to === min && from === min) {
      sliderSpan = this.container.querySelector("[data-handle=to]");
      console.log(sliderSpan);
    }
    let position = sliderSpan?.dataset.handle;

    let sliderCoords = getCoords(slider);
    let sliderSpanCoords = getCoords(sliderSpan);
    let shift = event.pageX - sliderSpanCoords.left;
    if (isVertical) {
      shift = event.pageY - sliderSpanCoords.top;
    }
    const mouseMoveHandler = (evt: PointerEvent) => handleMove(evt);
    document.addEventListener("mousemove", mouseMoveHandler);

    //Начнем движение ползунка
    const handleMove = (evt: PointerEvent): void => {
      let left =
        ((evt.pageX - shift - sliderCoords.left) / sliderCoords.width) * 100;
      if (isVertical) {
        left =
          ((evt.pageY - shift - sliderCoords.top) / sliderCoords.height) * 100;
      }
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

      if (isInterval) {
        if (position === HandlePosition.to) {
          if (value < this.state.from) {
            value = this.state.from;
          }
          this.model.updateState({
            type: ModelAction.setToValue,
            payload: { value },
          });
        } else if (position === HandlePosition.from) {
          if (value > this.state.to) {
            value = this.state.to;
          }
          this.model.updateState({
            type: ModelAction.setFromValue,
            payload: { value },
          });
        }
      } else {
        this.model.updateState({
          type: ModelAction.setToValue,
          payload: { value },
        });
      }
    };

    document.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", mouseMoveHandler);
    });
  };

  modelWasUpdate = (model: IModelOptions): void => {
    this.getState();
    const scaleProps = this.createArrScale();
    const lineBlockOptions = this.createLineBlock();
    this.view.updateView({ model, scaleProps, lineBlockOptions });
  };

  subscribe = (): void => {
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
