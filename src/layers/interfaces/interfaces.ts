import Observer from "../observer/observer";

interface IModelOptions {
  min: number;
  max: number;
  from: number;
  to: number;
  step: number;
  isVertical: boolean;
  isInterval: boolean;
  isLabel: boolean;
  isScale: boolean;
  isProgressBar: boolean;
}

enum ModelAction {
  "setMinValue",
  "setMaxValue",
  "setFromValue",
  "setToValue",
  "setStep",
  "setIsVertical",
  "setIsInterval",
  "setIsLabel",
  "setIsProgressBar",
  "setIsScale",
}

interface IModelAction {
  type: ModelAction;
  payload: {
    value: number | boolean;
  };
}

interface IPresenterOptions {
  container: HTMLElement;
  options: IModelOptions;
}

interface IScaleProps {
  scale: number[];
  shift: number;
}

interface IViewOptions {
  container: HTMLElement;
  options: IModelOptions;
  scaleOptions: IScaleProps;
}

interface ILineBlockOptions {
  container: HTMLElement;
  options: IModelOptions;
  observer: Observer;
}

interface IObserver {
  subscribe: (subscriber: ISubscriber) => void;
  unsubscribe: (subscriber: ISubscriber) => void;
  notify: (eventObject: IEventObject) => void;
}

enum EventName {
  clickedScaleItem = "clickedScaleItem",
  modelWasUpdate = "modelWasUpdate",
}

interface ISubscriber {
  eventName: EventName;
  function: (e: Event | IModelOptions) => void;
}

interface IEventObject {
  eventName: EventName;
  eventPayload: Event | IModelOptions;
}

interface IScaleOptions {
  container: HTMLElement;
  arrayScale: number[];
  shift: number;
  observer: Observer;
}

interface IViewInitProps {
  scaleOptions: IScaleProps;
}

interface IUpdateViewProps {
  model: IModelOptions;
  scaleProps: IScaleProps;
}

interface ICreateArrScale {
  max: number;
  min: number;
  step: number;
}

interface IProgressBarOptions {
  container: HTMLElement;
  shiftFrom: number;
  width: number;
  observer: Observer;
}

interface ICountShiftFromProps {
  min: number;
  to: number;
  step: number;
  max: number;
}

interface ICountShiftToProps {
  min: number;
  step: number;
  max: number;
  to: number;
}

interface ICountProgressWidthProps {
  step: number;
  max: number;
  min: number;
  to: number;
  from: number;
}

interface IProgressBarUpdateProps {
  shiftFrom?: number;
  width: number;
}

interface ICountStepPixelProps {
  step: number;
  max: number;
  min: number;
}

interface IHandleProps {
  container: HTMLElement;
  shift: number;
  observer: Observer;
}

interface ILabelProps {
  container: HTMLElement;
  shift: number;
  text: number;
  observer: Observer;
}

export {
  IModelOptions,
  ModelAction,
  IPresenterOptions,
  IViewOptions,
  ILineBlockOptions,
  IModelAction,
  IObserver,
  ISubscriber,
  IEventObject,
  IScaleOptions,
  IViewInitProps,
  IUpdateViewProps,
  ICreateArrScale,
  IProgressBarOptions,
  ICountShiftFromProps,
  ICountShiftToProps,
  ICountProgressWidthProps,
  IProgressBarUpdateProps,
  ICountStepPixelProps,
  IHandleProps,
  ILabelProps,
  IScaleProps,
  EventName,
};
