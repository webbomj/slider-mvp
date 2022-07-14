import { IModelOptions } from "./layers/interfaces/interfaces";
import Presenter from "./layers/presenter/presenter";

const defaultOptions: IModelOptions = {
  min: 0,
  max: 4000,
  from: 50,
  step: 200,
  isVertical: false,
  isInterval: false,
  isLabel: true,
  isScale: true,
  isProgressBar: true,
};

const container = document.getElementById("app");
if (container) {
  const app = new Presenter({ container, options: defaultOptions });
  console.log(app);
}
