import {
  EventName,
  fn,
  HandlePosition,
  ILineBlockOptions,
  IModelOptions,
  IPresenterOptions,
  IScaleProps,
  ISubscriber,
  ModelAction,
} from '../interfaces/interfaces';
import Model from '../model/model';
import View from '../view/view';
import Observer from '../observer/observer';
import { arrScaleCreator, countValueRounding } from './utils/scale';
import { getCoords } from './utils/handle';
import { lineBlockCreator } from './utils/lineBlock';
import { validateModel } from './utils/validateModelOption';

class Presenter {
  private model: Model;

  private view: View;

  private state: IModelOptions;

  private container: HTMLElement;

  private observer: Observer;

  constructor({ options, container }: IPresenterOptions) {
    this.observer = new Observer();

    const defaultOptions: IModelOptions = {
      min: 0,
      max: 100,
      from: 20,
      to: 30,
      step: 1,
      stepScale: 1,
      isVertical: false,
      isInterval: false,
      isLabel: true,
      isScale: true,
      isProgressBar: true,
    };
    this.container = container;
    this.container.classList.add('js-slider');

    this.state = { ...defaultOptions, ...options };

    this.model = new Model(this.state);

    this.createView();
    this.subscribeView();
    this.subscribeModel();
  }

  createLineBlock = (): ILineBlockOptions => {
    const { progressWidth, shiftFrom, shiftTo } = lineBlockCreator(this.state);
    return { progressBarWidth: progressWidth, shift: shiftTo, shiftFrom };
  };

  createArrScale = (): IScaleProps => {
    const { max, min, stepScale } = this.state;
    const { scale, shift } = arrScaleCreator({ max, min, step: stepScale });
    return { scale, shift };
  };

  clickedScaleItemHandler = (e: Event): void => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    const newValue = Number(e.target?.textContent);
    this.updateModel(newValue);
  };

  clickedLineHandler = (event: PointerEvent) => {
    const slider: HTMLElement | null =
      this.container.querySelector('.line-block');
    const progressbar = this.container.querySelector('.progress-bar');
    if (event.target !== progressbar && event.target !== slider) {
      return;
    }
    if (!slider) {
      return;
    }

    const value = this.countValueForModel(slider, event);
    this.updateModel(value);
  };

  clickedHandleHandler = (event: PointerEvent): void => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const { min, isVertical, to, from } = this.state;
    let sliderSpan = event.target;
    const slider: HTMLElement | null =
      this.container.querySelector('.line-block');

    if (to === min && from === min) {
      const sliderSpanNode: HTMLElement | null =
        this.container.querySelector('[data-handle=to]');
      if (!sliderSpanNode) {
        return;
      }
      sliderSpan = sliderSpanNode;
    }

    const position = sliderSpan?.dataset.handle;

    if (!slider || !sliderSpan) {
      return;
    }

    const sliderSpanCoords = getCoords(sliderSpan);

    let shift = event.pageX - sliderSpanCoords.left;
    if (isVertical) {
      // eslint-disable-next-line no-unused-vars
      shift = event.pageY - sliderSpanCoords.top;
    }
    const mouseMoveHandler = (evt: PointerEvent) => {
      if (slider) {
        this.handleMove(evt, slider, position);
      }
    };
    document.addEventListener('pointermove', mouseMoveHandler);

    // Начнем движение ползунка
    document.addEventListener('pointerup', () => {
      document.removeEventListener('pointermove', mouseMoveHandler);
    });
  };

  modelWasUpdate = (model: IModelOptions): void => {
    this.state = model;
    const scaleProps = this.createArrScale();
    const lineBlockOptions = this.createLineBlock();
    this.view.updateView({ model, scaleProps, lineBlockOptions });
    this.observer.notify({
      eventName: EventName.sliderChange,
      eventPayload: this.state,
    });
  };

  subscribeView = (): void => {
    this.view.subscribe({
      eventName: EventName.clickedScaleItem,
      function: this.clickedScaleItemHandler,
    });

    this.view.subscribe({
      eventName: EventName.clickedHandle,
      function: this.clickedHandleHandler,
    });

    this.view.subscribe({
      eventName: EventName.clickedLine,
      function: this.clickedLineHandler,
    });
  };

  subscribeModel = () => {
    this.model.subscribe({
      eventName: EventName.modelWasUpdate,
      function: this.modelWasUpdate,
    });
  };

  getModel = () => this.model;

  getState = () => this.state;

  createView = () => {
    const scaleOptions = this.createArrScale();
    const lineBlockOptions = this.createLineBlock();

    this.view = new View({
      options: this.state,
      container: this.container,
      scaleOptions,
      lineBlockOptions,
    });
  };

  fullUpdate = (options: Partial<IModelOptions>) => {
    const newState: IModelOptions = { ...this.state, ...options };
    const isOptionsValid = validateModel(newState);

    if (isOptionsValid) {
      this.state = newState;

      this.container.innerHTML = '';
      this.createView();
      this.subscribeView();

      this.model.updateState({
        type: ModelAction.setFullState,
        payload: { value: newState },
      });
    } else {
      throw Error('Options is not valide');
    }
  };

  handleMove = (
    evt: PointerEvent,
    slider: HTMLElement,
    position: string | undefined,
  ): void => {
    const { isInterval } = this.state;

    let value = this.countValueForModel(slider, evt);

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

  updateModel = (newValue: number) => {
    const { from, to, isInterval } = this.state;
    if (isInterval) {
      const difFromNewValue = Math.abs(from - newValue);
      const difToNewValue = Math.abs(to - newValue);

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

  countValueForModel = (slider: HTMLElement, event: PointerEvent): number => {
    const { isVertical, max, min, step } = this.state;
    const sliderCoords = getCoords(slider);
    let left = ((event.pageY - sliderCoords.top) / sliderCoords.height) * 100;
    if (!isVertical) {
      left = ((event.pageX - sliderCoords.left) / sliderCoords.width) * 100;
    }
    if (left < 0) left = 0;
    if (left > 100) left = 100;

    const stepCount = (max - min) / step;
    const stepPercent = 100 / stepCount;
    let stepLeft = Math.ceil(left / stepPercent) * stepPercent;

    if (stepLeft < 0) stepLeft = 0;
    if (stepLeft > 100) stepLeft = 100;

    const valueFix = countValueRounding(step);

    const result = Number(((stepLeft / stepPercent) * step).toFixed(valueFix));
    const value = Number((result + min).toFixed(valueFix));
    return value;
  };

  subscribe = (fn: fn) => {
    const subscriber: ISubscriber = {
      eventName: EventName.sliderChange,
      function: fn,
    };
    this.observer.subscribe(subscriber);
  };

  unsubscribe = (fn: fn) => {
    const subscriber: ISubscriber = {
      eventName: EventName.sliderChange,
      function: fn,
    };
    this.observer.unsubscribe(subscriber);
  };
}

export default Presenter;
