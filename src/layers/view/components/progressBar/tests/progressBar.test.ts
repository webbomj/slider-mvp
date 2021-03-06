/**
 * @jest-environment jsdom
 */

import Observer from "../../../../observer/observer";
import ProgressBar from "../progressBar";

describe("progressBar", () => {
  document.body.innerHTML = `
    <div id="app"></div>
  `;
  let container: HTMLElement | null;
  let observer = new Observer();
  let progressBar: ProgressBar;
  let progressBarNode: HTMLElement | null;
  beforeEach(() => {
    container = document.getElementById("app");
    let options = {
      container: container ? container : document.body,
      shiftFrom: 20,
      isVertical: false,
      observer,
      width: 200,
    };
    progressBar = new ProgressBar(options);
    progressBarNode = document.querySelector(".lineBlock__progressBar");
  });
  afterEach(() => {
    document.body.innerHTML = `
    <div id="app"></div>
  `;
  });
  test("Should have class: lineBlock__progressBar", () => {
    expect(progressBarNode).not.toBeNull();
    expect(progressBarNode?.classList[0]).toBe("lineBlock__progressBar");
  });
  test("Update: should width 400, shiftFrom: 70, isVertical: false", () => {
    progressBar.update({ shiftFrom: 70, width: 400, isVertical: false });
    expect(progressBarNode?.style.width).toBe("400%");
    expect(progressBarNode?.style.left).toBe("70%");
  });
  test("Update: should width 500, shiftFrom: 75, isVertical: true", () => {
    progressBar.update({ shiftFrom: 75, width: 500, isVertical: true });
    expect(progressBarNode?.style.height).toBe("500%");
    expect(progressBarNode?.style.top).toBe("75%");
  });
});
