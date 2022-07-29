/**
 * @jest-environment jsdom
 */

import { IModelOptions } from "../../interfaces/interfaces";
import Presenter from "../presenter";
import Model from "../../model/model";

describe("Presenter", () => {
  document.body.innerHTML = `<div id="app"></div>`;
  let presenter: Presenter;
  let container: HTMLElement | null;
  const options2: IModelOptions = {
    min: -8,
    max: -2,
    from: -8,
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
    const options: IModelOptions = {
      min: 0,
      max: 10,
      from: 0,
      to: 10,
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
      const handlers = document.querySelectorAll(".lineBlock__handler");
      expect(handlers).toHaveLength(2);
    });
    test("Labels should be in DOM", () => {
      const labels = document.querySelectorAll(".lineBlock__label");
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
      const labels = document.querySelectorAll(".lineBlock__label");
      expect(labels[1]?.textContent).toBe("-8");
      expect(labels[0]?.textContent).toBe("-4");
    });
  });

  describe("getModel", () => {
    test("should be instance of Model", () => {
      expect(presenter.getModel()).toBeInstanceOf(Model);
    });
  });
  describe("getModel", () => {
    test("should be instance of Model", () => {
      expect(presenter.getModel()).toBeInstanceOf(Model);
    });
  });
  // describe("clickedLineHandler", () => {
  //   jest.mock("../presenter.ts");

  //   document.body.innerHTML = `<div id="app"></div>`;
  //   const container: HTMLDivElement | null = document.querySelector("#app");
  //   if (!container) return;

  //   const presenter = new Presenter({ options: options2, container });

  //   test("should be", () => {
  //     presenter.getModel().updateState = jest.fn(() => {});
  //     presenter.clickedHandleHandler = jest.fn(() => {});

  //     const eve2 = $.Event("pointerup");
  //     $(".lineBlock__handle").first().trigger(eve2);
  //     const handle = document.querySelector(".lineBlock__handle");
  //     const event = new Event("pointerdown");
  //     handle?.dispatchEvent(event);
  //     expect().toBeCalled();
  //   });
  // });
});
