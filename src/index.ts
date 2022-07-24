import { IModelOptions } from "./layers/interfaces/interfaces";
import Presenter from "./layers/presenter/presenter";

const defaultOptions: IModelOptions = {
  min: -10,
  max: -2,
  from: -10,
  to: -8,
  step: 2,
  isVertical: false,
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
