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

export {
  IModelOptions,
  ModelAction,
  IPresenterOptions,
  IViewOptions,
  ILineBlockOptions,
  IModelAction,
};
