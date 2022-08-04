/**
 * @jest-environment jsdom
 */

import { IModelOptions, ModelAction } from "../../interfaces/interfaces";
import Presenter from "../presenter";
import Model from "../../model/model";

const $ = require("jquery");

describe("Presenter", () => {
  document.body.innerHTML = `<div id="app"></div>`;
  let presenter: Presenter;
  let container: HTMLElement | null;
  const options: IModelOptions = {
    min: 0,
    max: 10,
    from: 1,
    to: 10,
    step: 1,
    stepScale: 1,
    isVertical: true,
    isInterval: true,
    isLabel: true,
    isScale: true,
    isProgressBar: true,
  };
  const options2: IModelOptions = {
    min: -8,
    max: -2,
    from: -7,
    to: -4,
    step: 1,
    stepScale: 1,
    isVertical: true,
    isInterval: true,
    isLabel: true,
    isScale: true,
    isProgressBar: true,
  };
  beforeEach(() => {
    container = document.getElementById("app");

    if (container) {
      presenter = new Presenter({ options, container });
    }
  });
  afterEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
  });
  describe("Should be in DOM", () => {
    test("Line block should be in DOM", () => {
      const lineBlock = document.querySelector(".lineBlock");
      expect(lineBlock).not.toBeNull();
    });
    test("Handlers should be in DOM", () => {
      const handlers = document.querySelectorAll(".handler");
      expect(handlers).toHaveLength(2);
    });
    test("Labels should be in DOM", () => {
      const labels = document.querySelectorAll(".label");
      expect(labels).toHaveLength(2);
    });
    test("Scale should be in DOM", () => {
      const scale = document.querySelector(".scale");
      expect(scale).not.toBeNull();
    });
  });
  describe("modelWasUpdate", () => {
    test("should update View", () => {
      presenter.modelWasUpdate(options2);
      const labels = document.querySelectorAll(".label");
      expect(labels[1]?.textContent).toBe("-7");
      expect(labels[0]?.textContent).toBe("-4");
    });
  });
  describe("fullUpdate", () => {
    const newModel: Partial<IModelOptions> = {
      isScale: false,
      isProgressBar: false,
    };
    test("should update Model", () => {
      presenter.fullUpdate(newModel);
      const result = {
        ...options,
        ...newModel,
      };
      expect(presenter.getModel().getState()).toEqual(result);
    });
  });

  describe("getModel", () => {
    test("should be instance of Model", () => {
      expect(presenter.getModel()).toBeInstanceOf(Model);
    });
  });

  describe("Handlers should called", () => {
    jest.mock("../presenter.ts");

    document.body.innerHTML = `<div id="app"></div>`;
    const container: HTMLDivElement | null = document.querySelector("#app");
    if (!container) return;

    const presenter = new Presenter({ options: options2, container });

    test("should clickedHandleHandler called", () => {
      const handleHandler = jest.spyOn(presenter, "clickedHandleHandler");

      const handle = document.querySelector(".handler");
      if (!handle) {
        return;
      }
      const eve2 = $.Event("pointerup", { target: handle });
      $(".handler").trigger(eve2);

      presenter.clickedHandleHandler(eve2);
      expect(handleHandler).toBeCalled();
    });
    test("should clickedLineHandler called", () => {
      const clickedHandler = jest.spyOn(presenter, "clickedLineHandler");

      const lineBlock = document.querySelector(".lineBlock");
      if (!lineBlock) {
        return;
      }
      const eve2 = $.Event("pointerdown", { target: lineBlock });
      $(".lineBlock").trigger(eve2);

      presenter.clickedLineHandler(eve2);
      expect(clickedHandler).toBeCalled();
    });
    test("should clickedScaleItemHandler called", () => {
      const scaleHandler = jest.spyOn(presenter, "clickedScaleItemHandler");

      const scaleItem = document.querySelector(".scale__item");
      if (!scaleItem) {
        return;
      }
      const eve2 = $.Event("pointerdown", { target: scaleItem });
      $(".lineBlock").trigger(eve2);

      presenter.clickedScaleItemHandler(eve2);
      expect(scaleHandler).toBeCalled();
    });
  });

  describe("handlerMove", () => {
    const handlers = document.querySelectorAll(".handler");
    let slider: HTMLElement;
    const sliderNode: HTMLElement | null = document.querySelector(".lineBlock");
    if (sliderNode) {
      slider = sliderNode;
    }
    const event1 = $.Event("pointermove", {
      target: handlers[0],
      pageX: 10,
      pageY: 10,
    });
    const event2 = $.Event("pointermove", {
      target: handlers[1],
      pageX: 200,
      pageY: 100,
    });
    const positionTo = "to";
    const positionFrom = "from";
    const positionUndefined = undefined;
    test("Should updatestate with positon from", () => {
      presenter.handleMove(event2, slider, positionFrom);

      expect(presenter.getModel().getState().to).toBe(10);
      expect(presenter.getModel().getState().from).toBe(10);
    });
    test("Should updatestate with positon to", () => {
      presenter.handleMove(event1, slider, positionTo);
      expect(presenter.getModel().getState().to).toBe(10);
      expect(presenter.getModel().getState().from).toBe(1);
    });
    test("Should updatestate with positon undefined", () => {
      presenter.handleMove(event1, slider, positionUndefined);
      expect(presenter.getModel().getState().to).toBe(10);
      expect(presenter.getModel().getState().from).toBe(1);
    });
  });
  describe("updateModel", () => {
    test("Should update from", () => {
      const newValue = 2;
      presenter.updateModel(newValue);
      expect(presenter.getModel().getState().from).toBe(2);
    });
    test("Should update to", () => {
      const newValue = 9;
      presenter.updateModel(newValue);
      expect(presenter.getModel().getState().to).toBe(9);
    });
    test("Should update from then distance between from and to equel", () => {
      document.body.innerHTML = `<div id="app"></div>`;

      container = document.getElementById("app");
      const options: IModelOptions = {
        min: 0,
        max: 10,
        from: 5,
        to: 7,
        step: 1,
        stepScale: 1,
        isVertical: true,
        isInterval: true,
        isLabel: true,
        isScale: true,
        isProgressBar: true,
      };

      if (container) {
        presenter = new Presenter({ options, container });
      }

      const newValue = 6;
      presenter.updateModel(newValue);
      expect(presenter.getModel().getState().from).toBe(6);
    });
    test("Should update from then distance between from and to equel", () => {
      document.body.innerHTML = `<div id="app"></div>`;

      container = document.getElementById("app");
      const options: IModelOptions = {
        min: 0,
        max: 10,
        from: 5,
        to: 5,
        step: 1,
        stepScale: 1,
        isVertical: true,
        isInterval: true,
        isLabel: true,
        isScale: true,
        isProgressBar: true,
      };

      if (container) {
        presenter = new Presenter({ options, container });
      }

      const newValue2 = 8;
      presenter.updateModel(newValue2);
      expect(presenter.getModel().getState().to).toBe(8);
    });
    test("Should update to", () => {
      document.body.innerHTML = `<div id="app"></div>`;

      container = document.getElementById("app");
      const options: IModelOptions = {
        min: 0,
        max: 10,
        from: 5,
        to: 7,
        step: 1,
        stepScale: 1,
        isVertical: true,
        isInterval: false,
        isLabel: true,
        isScale: true,
        isProgressBar: true,
      };

      if (container) {
        presenter = new Presenter({ options, container });
      }
      const newValue = 8;
      presenter.updateModel(newValue);
      expect(presenter.getModel().getState().to).toBe(8);
    });
  });
});
