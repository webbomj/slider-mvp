import { IModelOptions } from "./layers/interfaces/interfaces";
import Presenter from "./layers/presenter/presenter";

const defaultOptions: IModelOptions = {
  min: 0,
  max: 10,
  from: 1,
  to: 8,
  step: 1,
  isVertical: true,
  isInterval: true,
  isLabel: true,
  isScale: true,
  isProgressBar: true,
};

const container = document.getElementById("app");
if (container) {
  const app = new Presenter({ container, options: defaultOptions });
  console.log(app);
}
