import Observer from "../observer/observer";

interface IModelOptions {
  min: number;
  max: number;
  from: number;
  to: number;
  step: number;
  stepScale: number;
  isVertical: boolean;
  isInterval: boolean;
  isLabel: boolean;
  isScale: boolean;
  isProgressBar: boolean;
  // [key: string]: number | boolean;
}

enum ModelAction {
  "setMinValue",
  "setMaxValue",
  "setFromValue",
  "setToValue",
  "setStep",
  "setStepScale",
  "setIsVertical",
  "setIsInterval",
  "setIsLabel",
  "setIsProgressBar",
  "setIsScale",
  "setFullState",
}

interface IModelAction {
  type: ModelAction;
  payload: {
    value: number | boolean | IModelOptions;
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
  lineBlockOptions: ILineBlockOptions;
}

interface ILineBlockOptions {
  shift: number;
  shiftFrom: number;
  progressBarWidth: number;
}

interface ILineBlockProps {
  container: HTMLElement;
  model: IModelOptions;
  observer: Observer;
  options: ILineBlockOptions;
}

interface IObserver {
  subscribe: (subscriber: ISubscriber) => void;
  unsubscribe: (subscriber: ISubscriber) => void;
  notify: (eventObject: IEventObject) => void;
}

enum EventName {
  clickedScaleItem = "clickedScaleItem",
  modelWasUpdate = "modelWasUpdate",
  clickedHandle = "clickedHandle",
  clickedLine = "clickedLine",
}

interface ISubscriber {
  eventName: EventName;
  function: (e: Event | IModelOptions | Event[]) => void;
}

interface IEventObject {
  eventName: EventName;
  eventPayload: Event | IModelOptions | Event[];
}

interface IScaleOptions {
  container: HTMLElement;
  arrayScale: number[];
  shift: number;
  observer: Observer;
  isVertical: boolean;
}

interface IViewInitProps {
  scaleOptions: IScaleProps;
  lineBlockOptions: ILineBlockOptions;
}

interface IUpdateViewProps {
  model: IModelOptions;
  scaleProps: IScaleProps;
  lineBlockOptions: ILineBlockOptions;
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
  isVertical: boolean;
}

interface ICountShiftFromProps {
  min: number;
  current: number;
  step: number;
  max: number;
  isInterval: boolean;
  handle: "from" | "to";
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
  isInterval: boolean;
}

interface IProgressBarUpdateProps {
  shiftFrom: number;
  width: number;
  isVertical: boolean;
}

interface ICountStepPixelProps {
  step: number;
  max: number;
  min: number;
}

enum HandlePosition {
  from = "from",
  to = "to",
}

interface IHandleProps {
  container: HTMLElement;
  shift: number;
  observer: Observer;
  handlePosition?: HandlePosition;
  isVertical: boolean;
}

interface ILabelProps {
  container: HTMLElement;
  shift: number;
  text: number;
  observer: Observer;
  isVertical: boolean;
}

export {
  IModelOptions,
  ModelAction,
  IPresenterOptions,
  IViewOptions,
  ILineBlockOptions,
  ILineBlockProps,
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
  HandlePosition,
  IHandleProps,
  ILabelProps,
  IScaleProps,
  EventName,
};
