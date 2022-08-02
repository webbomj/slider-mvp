/**
 * @jest-environment jsdom
 */

import { ILabelProps } from "../../../../interfaces/interfaces";
import Observer from "../../../../observer/observer";
import Label from "../label";

describe("label", () => {
  let label: Label;
  let container: HTMLElement | null;
  let labelNode: HTMLElement | null;
  let options: ILabelProps;
  const observer = new Observer();
  document.body.innerHTML = `
    <div id="app"></div>
  `;

  beforeEach(() => {
    container = document.getElementById("app");
    options = {
      container: container ? container : document.body,
      isVertical: true,
      observer,
      shift: 20,
      text: 20,
    };
    label = new Label(options);
    labelNode = document.querySelector(".lineBlock__label");
  });

  afterEach(() => {
    document.body.innerHTML = `
    <div id="app"></div>
  `;
  });
  test("Should have class lineBlock__label", () => {
    expect(labelNode).not.toBeNull();
    expect(labelNode?.classList[0]).toBe("lineBlock__label");
  });
  test("Update: if shift 25 and vertical position", () => {
    label.update(25, 25);
    expect(labelNode?.style.top).toBe("25%");
  });
  test("Update: if shift 35 and horisontal position", () => {
    document.body.innerHTML = '<div id="app"></div>';
    let container: HTMLElement | null = document.getElementById("app");
    let label = new Label({
      observer,
      shift: 20,
      text: 20,
      isVertical: false,
      container: container ? container : document.body,
    });
    let labelNode: HTMLElement | null =
      document.querySelector(".lineBlock__label");
    label.update(35, 35);
    expect(labelNode?.style.left).toBe("35%");
  });
});
