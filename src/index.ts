import { Controller } from "./demo-page/controller";
import { IModelOptions } from "./slider/layers/interfaces/interfaces";
import "./slider/slider";

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

const first = $("#slider1 .app__slider").slider(defaultOptions1);
const firstContainer = $("#slider1 .app__control")[0];
if (first) {
  new Controller({
    container: firstContainer,
    slider: first,
  });
}

// const input = document.querySelector(".input");
// input?.addEventListener("change", (e) => {
//   if (!(e.target instanceof HTMLInputElement)) {
//     return;
//   }

//   first?.fullUpdate({ isVertical: e.target.checked });
// });
