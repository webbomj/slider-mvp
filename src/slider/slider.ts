import { IModelOptions } from "./layers/interfaces/interfaces";
import Presenter from "./layers/presenter/presenter";
import { validateModel } from "./layers/presenter/utils/validateModelOption";
import "./slider.scss";
import $ from "jquery";

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
})($);

declare global {
  interface JQuery {
    slider(options: Partial<IModelOptions>): Presenter | undefined;
  }
}

// export default $.fn.slider;
