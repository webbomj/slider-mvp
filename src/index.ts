import { IModelOptions } from "./layers/interfaces/interfaces";
import Model from "./layers/model/model";

const defaultOptions: IModelOptions = {
  min: 0,
  max: 100,
  from: 50,
  step: 1,
  isVertical: false,
  isInterval: false,
  isLabel: true,
  isScale: true,
  isProgressBar: true,
};

const model = new Model(defaultOptions);
console.log(model);
