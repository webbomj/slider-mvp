/**
 * @jest-environment jsdom
 */

import { IModelOptions } from "../interfaces/interfaces";
import View from "./view";
document.body.innerHTML = `
    <div id="app"></div>
  `;

describe("View", () => {
  let container: HTMLElement | null;
  let view: View | null;

  describe("View components should be in DOM", () => {
    beforeEach(() => {
      container = document.getElementById("app");
      const options: IModelOptions = {
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
      const scaleOptions = {
        scale: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        shift: 40,
      };
      const lineBlockOptions = {
        shift: 40,
        shiftFrom: 30,
        progressBarWidth: 120,
      };
      view = new View({
        container: container ? container : document.body,
        options,
        lineBlockOptions,
        scaleOptions,
      });
    });

    afterEach(() => {
      document.body.innerHTML = `
       <div id="app"></div>
       `;
    });

    test("lineBlock should be in DOM", () => {
      const lineBlock = document.querySelector(".lineBlock");
      expect(lineBlock).not.toBeNull();
    });
    test("scale should be in DOM", () => {
      const scale = document.querySelector(".scale");
      expect(scale).not.toBeNull();
    });
    test("Both handle should be in DOM", () => {
      const handles = document.querySelectorAll(".lineBlock__handler");
      expect(handles.length).toBe(2);
    });
    test("Both label should be in DOM", () => {
      const label = document.querySelectorAll(".lineBlock__label");
      expect(label.length).toBe(2);
    });
  });

  describe("UpdateView", () => {
    beforeEach(() => {
      container = document.getElementById("app");
      const options1: IModelOptions = {
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
      const scaleOptions = {
        scale: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        shift: 40,
      };
      const lineBlockOptions1 = {
        shift: 40,
        shiftFrom: 30,
        progressBarWidth: 120,
      };
      view = new View({
        container: container ? container : document.body,
        options: options1,
        lineBlockOptions: lineBlockOptions1,
        scaleOptions,
      });

      const lineBlockOptions = {
        shift: 10,
        shiftFrom: 50,
        progressBarWidth: 220,
      };

      const model: IModelOptions = {
        min: -8,
        max: -2,
        from: -4,
        to: -2,
        step: 2,
        isVertical: true,
        isInterval: true,
        isLabel: true,
        isScale: true,
        isProgressBar: true,
      };

      const scaleProps = {
        scale: [-8, -6, -4, -2],
        shift: 10,
      };

      const options = { lineBlockOptions, model, scaleProps };
      view?.updateView(options);
    });

    afterEach(() => {
      document.body.innerHTML = `
       <div id="app"></div>
       `;
    });

    test("updateView: handles should have new shift", () => {
      const handles: NodeListOf<HTMLDivElement> = document.querySelectorAll(
        ".lineBlock__handler"
      );
      expect(handles[0].style.top).toBe("10%");
      expect(handles[1].style.top).toBe("50%");
    });
    test("updateView: labels should have new shift", () => {
      const label: NodeListOf<HTMLDivElement> =
        document.querySelectorAll(".lineBlock__label");
      expect(label[0].style.top).toBe("10%");
      expect(label[1].style.top).toBe("50%");
    });
    test("updateView: scale max min should have new correct value", () => {
      const scaleItems: NodeListOf<HTMLDivElement> =
        document.querySelectorAll(".scale__item");
      expect(scaleItems[0].textContent).toBe("-8");
      expect(scaleItems[3].textContent).toBe("-2");
    });
    test("updateView: progressBar top height should have new correct value", () => {
      const progressBar: HTMLDivElement | null = document.querySelector(
        ".lineBlock__progressBar"
      );
      expect(progressBar?.style.top).toBe("50%");
      expect(progressBar?.style.height).toBe("220%");
    });
  });
});
