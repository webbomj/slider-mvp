import { IModelOptions } from "./layers/interfaces/interfaces";
import Presenter from "./layers/presenter/presenter";

const defaultOptions: IModelOptions = {
  min: 0,
  max: 10,
  from: 1,
  to: 3.3,
  step: 1,
  stepScale: 2,
  isVertical: true,
  isInterval: true,
  isLabel: true,
  isScale: true,
  isProgressBar: true,
};

const container = document.getElementById("app");
const container1 = document.getElementById("app1");
container1?.classList.add("app1");

if (container) {
  const app = new Presenter({ container, options: defaultOptions });
  console.log(app);
}

$.fn.extend({
  slider: (options: IModelOptions, container: HTMLElement) => {
    console.log(this, options);
    new Presenter({ container, options });
  },
});

$("#app1").slider(defaultOptions, container1);

declare global {
  interface JQuery {
    slider(options: IModelOptions, container: HTMLElement | null): void;
  }
}
