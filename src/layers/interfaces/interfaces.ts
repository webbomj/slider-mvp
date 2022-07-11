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

export { IModelOptions };
