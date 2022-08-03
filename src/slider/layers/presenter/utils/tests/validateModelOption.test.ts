import { IModelOptions } from "../../../interfaces/interfaces";
import { validateModel } from "../validateModelOption";

describe("validateModelOption", () => {
  const trueModel: IModelOptions = {
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

  const widthLesserThenStep: IModelOptions = {
    min: 0,
    max: 10,
    from: 1,
    to: 3.3,
    step: 12,
    stepScale: 2,
    isVertical: true,
    isInterval: true,
    isLabel: true,
    isScale: true,
    isProgressBar: true,
  };

  const fromValueGreaterThenMinValue: IModelOptions = {
    min: 0,
    max: 10,
    from: -1,
    to: 3.3,
    step: 1,
    stepScale: 2,
    isVertical: true,
    isInterval: true,
    isLabel: true,
    isScale: true,
    isProgressBar: true,
  };

  const toValueGreaterThenMinValue: IModelOptions = {
    min: 0,
    max: 10,
    from: 1,
    to: 11,
    step: 1,
    stepScale: 2,
    isVertical: true,
    isInterval: true,
    isLabel: true,
    isScale: true,
    isProgressBar: true,
  };

  const fromValueGreaterThenToValue: IModelOptions = {
    min: 0,
    max: 10,
    from: 10,
    to: 9,
    step: 1,
    stepScale: 2,
    isVertical: true,
    isInterval: true,
    isLabel: true,
    isScale: true,
    isProgressBar: true,
  };

  test("Should return true", () => {
    expect(validateModel(trueModel)).toBe(true);
  });
  test("Should return false, because step more then width", () => {
    expect(validateModel(widthLesserThenStep)).toBe(false);
  });
  test("Should return false, because from greater then min", () => {
    expect(validateModel(fromValueGreaterThenMinValue)).toBe(false);
  });
  test("Should return false, because to greater then max", () => {
    expect(validateModel(toValueGreaterThenMinValue)).toBe(false);
  });
  test("Should return false, because from greater then to", () => {
    expect(validateModel(fromValueGreaterThenToValue)).toBe(false);
  });
});
