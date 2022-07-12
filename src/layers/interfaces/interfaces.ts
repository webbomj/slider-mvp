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

export { IModelOptions, IPresenterOptions, IViewOptions, ILineBlockOptions };
