import { Controller } from "./demo-page/controller";
import { IModelOptions } from "./layers/interfaces/interfaces";
import Presenter from "./layers/presenter/presenter";
import { validateModel } from "./layers/presenter/utils/validateModelOption";

const defaultOptions1: IModelOptions = {
  min: 2,
  max: 20,
  from: 2,
  to: 4,
  step: 2,
  stepScale: 2,
  isVertical: false,
  isInterval: true,
  isLabel: true,
  isScale: true,
  isProgressBar: true,
};

const container1 = document.getElementById("app1");
container1?.classList.add("app1");

(function ($) {
  $.fn.slider = function (options: IModelOptions) {
    if (!this[0]) {
      return;
    }
    const isValid = validateModel(options);
    if (isValid) {
      return new Presenter({ options, container: this[0] });
    }
    throw Error("Options is not valid");
  };
})(jQuery);

const first = $("#app1").slider(defaultOptions1);
const firstContainer = $("#app1")[0];
if (first) {
  new Controller({
    container: firstContainer,
    slider: first,
  });
}
// first?.fullUpdate({
//   max: 5,
//   min: -4,
//   step: 1,
//   to: 5,
//   from: 3,
//   isInterval: false,
//   isVertical: false,
// });

const input = document.querySelector(".input");
input?.addEventListener("change", (e) => {
  if (!(e.target instanceof HTMLInputElement)) {
    return;
  }

  first?.fullUpdate({ isVertical: e.target.checked });
});

declare global {
  interface JQuery {
    slider(options: IModelOptions): Presenter | undefined;
  }
}
