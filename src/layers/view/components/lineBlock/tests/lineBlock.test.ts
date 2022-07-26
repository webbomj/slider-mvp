/**
 * @jest-environment jsdom
 */

import {
  ILineBlockOptions,
  ILineBlockProps,
  IModelOptions,
} from "../../../../interfaces/interfaces";
import Observer from "../../../../observer/observer";
import LineBlock from "../lineBlock";

describe("label", () => {
  let lineBlock: LineBlock;
  let container: HTMLElement | null;
  let lineBlockNode: HTMLElement | null;
  let options: ILineBlockProps;
  const observer = new Observer();
  document.body.innerHTML = `
      <div id="app"></div>
    `;
  describe("label", () => {
    beforeEach(() => {
      container = document.getElementById("app");
      const model: IModelOptions = {
        min: -10,
        max: -2,
        from: -10,
        to: -8,
        step: 2,
        isVertical: true,
        isInterval: true,
        isLabel: true,
        isScale: true,
        isProgressBar: true,
      };
      options = {
        container: container ? container : document.body,
        observer,
        model,
        options: { shift: 0, shiftFrom: 20, progressBarWidth: 300 },
      };
      lineBlock = new LineBlock(options);
      lineBlockNode = document.querySelector(".lineBlock");
    });

    afterEach(() => {
      document.body.innerHTML = `
      <div id="app"></div>
    `;
    });

    test("should have class lineBlock", () => {
      expect(lineBlockNode).not.toBeNull();
      expect(lineBlockNode?.classList[0]).toBe("lineBlock");
    });
    test("should have class lineBlock", () => {
      expect(lineBlockNode).not.toBeNull();
      expect(lineBlockNode?.classList[0]).toBe("lineBlock");
    });
  });

  describe("lineBlock: update horisontal, positive, label, progressbar", () => {
    const iLineBlockOptions: ILineBlockOptions = {
      shift: 80,
      shiftFrom: 70,
      progressBarWidth: 700,
    };
    const model: IModelOptions = {
      min: 0,
      max: 10,
      from: 1,
      to: 8,
      step: 1,
      isVertical: false,
      isInterval: false,
      isLabel: true,
      isScale: true,
      isProgressBar: true,
    };
    beforeEach(() => {
      container = document.getElementById("app");
      options = {
        container: container ? container : document.body,
        observer,
        model,
        options: { shift: 0, shiftFrom: 20, progressBarWidth: 300 },
      };
      lineBlock = new LineBlock(options);
      lineBlockNode = document.querySelector(".lineBlock");
      lineBlock.update(model, iLineBlockOptions);
    });

    afterEach(() => {
      document.body.innerHTML = `
      <div id="app"></div>
    `;
    });
    test("should correct children length", () => {
      expect(lineBlockNode?.childNodes).toHaveLength(2);
    });
    test("should correct lineBlock__active children length", () => {
      const lineBlockActive = document.querySelector(".lineBlock__active");
      expect(lineBlockActive?.children).toHaveLength(2);
    });
    test("handle should correct style left", () => {
      const lineBlockHandler: HTMLDivElement | null = document.querySelector(
        ".lineBlock__handler"
      );
      expect(lineBlockHandler?.style.left).toBe("80%");
    });
    test("label should in DOM", () => {
      const lineBlockLabel: HTMLDivElement | null =
        document.querySelector(".lineBlock__label");
      expect(lineBlockLabel).not.toBeNull();
    });

    test("progressBar should in DOM", () => {
      const lineProgressBar: HTMLDivElement | null = document.querySelector(
        ".lineBlock__progressBar"
      );
      expect(lineProgressBar).not.toBeNull();
    });
  });

  describe("lineBlock: update vertical, negative, interval", () => {
    const iLineBlockOptions: ILineBlockOptions = {
      shift: 80,
      shiftFrom: 70,
      progressBarWidth: 700,
    };
    const model: IModelOptions = {
      min: -8,
      max: -2,
      from: 1,
      to: -2,
      step: 2,
      isVertical: true,
      isInterval: true,
      isLabel: true,
      isScale: true,
      isProgressBar: true,
    };
    beforeEach(() => {
      container = document.getElementById("app");
      options = {
        container: container ? container : document.body,
        observer,
        model,
        options: { shift: 0, shiftFrom: 20, progressBarWidth: 300 },
      };
      lineBlock = new LineBlock(options);
      lineBlockNode = document.querySelector(".lineBlock");
      lineBlock.update(model, iLineBlockOptions);
    });

    afterEach(() => {
      document.body.innerHTML = `
      <div id="app"></div>
    `;
    });
    test("should correct children length", () => {
      expect(lineBlockNode?.childNodes).toHaveLength(2);
    });
    test("should correct lineBlock__active children length", () => {
      const lineBlockActive = document.querySelector(".lineBlock__active");
      expect(lineBlockActive?.children).toHaveLength(4);
    });
    test("first handle should correct style top", () => {
      const lineBlockHandler: NodeListOf<HTMLDivElement> =
        document.querySelectorAll(".lineBlock__handler");
      expect(lineBlockHandler[0]?.style.top).toBe("80%");
    });
    test("second handle should correct style top", () => {
      const lineBlockHandler: NodeListOf<HTMLDivElement> =
        document.querySelectorAll(".lineBlock__handler");
      expect(lineBlockHandler[1]?.style.top).toBe("70%");
    });

    test("both labels should be in DOM", () => {
      const lineBlockLabels: NodeListOf<HTMLDivElement> =
        document.querySelectorAll(".lineBlock__label");
      expect(lineBlockLabels).toHaveLength(2);
    });

    test("progressBar should in DOM", () => {
      const lineProgressBar: HTMLDivElement | null = document.querySelector(
        ".lineBlock__progressBar"
      );
      expect(lineProgressBar).not.toBeNull();
    });
  });
});
