interface IModelOptions {
  min: number;
  max: number;
  from: number;
  to?: number | null;
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
    value: boolean | number;
  };
}

interface IPresenterOptions {
  container: HTMLElement;
  options: IModelOptions;
}

interface IViewOptions {
  container: HTMLElement;
  options: IModelOptions;
}

interface ILineBlockOptions {
  container: HTMLElement;
  options: IModelOptions;
}

interface IObserver {
  subscribe: (subscriber: ISubscriber) => void;
  unsubscribe: (subscriber: ISubscriber) => void;
  notify: (eventObject: IEventObject) => void;
}

interface ISubscriber {
  eventName: "updateView" | "updateModel";
  function: (data: Partial<IModelOptions>) => void;
}
interface IEventObject {
  eventName: "updateView";
  eventPayload: Partial<IModelOptions>;
}

interface IScaleOptions {
  container: HTMLElement;
  arrayScale: number[];
  shift: number;
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
};
