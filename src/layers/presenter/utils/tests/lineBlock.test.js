const {
  countStepPercent,
  countShiftFrom,
  countShiftTo,
  countProgressWidth,
  lineBlockCreator,
} = require("../lineBlock");
describe("lineBlock: countStepPercent function", () => {
  const options = { step: 3, max: 10, min: 1 };
  test("should return correct value", () => {
    expect(countStepPercent(options)).toBeCloseTo(33.33);
  });
  test("should return correct value with negative min", () => {
    const options = { step: 2, max: 10, min: -4 };
    expect(countStepPercent(options)).toBeCloseTo(14.28, 1);
  });
  test("should return correct value with negative min and max", () => {
    const options = { step: 1, max: -1, min: -4 };
    expect(countStepPercent(options)).toBeCloseTo(33.33, 1);
  });
});

describe("lineBlock: countShiftFrom", () => {
  test("should return 0, then isInterval true", () => {
    const options = {
      min: 0,
      from: 0,
      max: 10,
      step: 1,
      isInterval: true,
    };
    expect(countShiftFrom(options)).toBe(0);
  });
  test("should return 0, then isInterval false", () => {
    const options = { min: 0, from: 0, max: 10, step: 1, isInterval: false };
    expect(countShiftFrom(options)).toBe(0);
  });
  test("should return correct value", () => {
    const options = { min: 0, from: 0, max: 10, step: 1, isInterval: true };
    expect(countShiftFrom(options)).toBe(0);
  });
  test("should return correct value", () => {
    const options = { min: 2, from: 6, max: 10, step: 2, isInterval: true };
    expect(countShiftFrom(options)).toBe(50);
  });
  test("should return correct value with min negative value", () => {
    const options = { min: -6, from: 6, max: 10, step: 2, isInterval: true };
    expect(countShiftFrom(options)).toBe(75);
  });
  test("should return correct value with min, max, from negative value", () => {
    const options = {
      min: -60,
      from: -40,
      max: -20,
      step: 2,
      isInterval: true,
    };
    expect(countShiftFrom(options)).toBe(50);
  });
});

describe("lineBlock: countShiftTo", () => {
  test("should return correct value", () => {
    const options = { min: 0, to: 5, max: 10, step: 1 };
    expect(countShiftTo(options)).toBe(50);
  });
  test("should return correct value", () => {
    const options = { min: 2, to: 6, max: 10, step: 2 };
    expect(countShiftTo(options)).toBe(50);
  });
  test("should return correct value with min negative value", () => {
    const options = { min: -6, to: 6, max: 10, step: 2 };
    expect(countShiftTo(options)).toBe(75);
  });
  test("should return correct value with min, max, from negative value", () => {
    const options = {
      min: -60,
      to: -40,
      max: -20,
      step: 2,
    };
    expect(countShiftTo(options)).toBe(50);
  });
});

describe("lineBlock: countProgressWidth", () => {
  test("should return 40, then isInterval false", () => {
    const options = {
      step: 2,
      max: 10,
      min: 0,
      to: 4,
      from: 0,
      isInterval: false,
    };
    expect(countProgressWidth(options)).toBe(40);
  });
  test("should return 20, then isInterval true", () => {
    const options = {
      step: 2,
      max: 10,
      min: 0,
      to: 4,
      from: 2,
      isInterval: true,
    };
    expect(countProgressWidth(options)).toBe(20);
  });
  test("should return 25, then isInterval false, and negative values", () => {
    const options = {
      step: 2,
      max: -2,
      min: -10,
      to: -8,
      from: -4,
      isInterval: false,
    };
    expect(countProgressWidth(options)).toBe(25);
  });
  test("should return 50, then isInterval true, and negative values", () => {
    const options = {
      step: 2,
      max: -2,
      min: -10,
      to: -8,
      from: -4,
      isInterval: true,
    };
    expect(countProgressWidth(options)).toBe(50);
  });
});

describe("lineBlock: lineBlockCreator", () => {
  test("should return correct value with positive values and interval false", () => {
    const options = {
      from: 0,
      max: 10,
      min: 0,
      step: 2,
      to: 4,
      isInterval: false,
    };
    expect(lineBlockCreator(options)).toEqual({
      progressWidth: 40,
      shiftFrom: 0,
      shiftTo: 40,
    });
  });
  test("should return correct value with positive values and interval true", () => {
    const options = {
      from: 2,
      max: 10,
      min: 0,
      step: 2,
      to: 4,
      isInterval: true,
    };
    expect(lineBlockCreator(options)).toEqual({
      progressWidth: 20,
      shiftFrom: 20,
      shiftTo: 40,
    });
  });
  test("should return correct value with negative values and interval false", () => {
    const options = {
      from: -2,
      max: -2,
      min: -10,
      step: 2,
      to: -8,
      isInterval: false,
    };
    expect(lineBlockCreator(options)).toEqual({
      progressWidth: 25,
      shiftFrom: 0,
      shiftTo: 25,
    });
  });
  test("should return correct value with negative values and interval true", () => {
    const options = {
      from: -2,
      max: -2,
      min: -10,
      step: 2,
      to: -8,
      isInterval: true,
    };
    expect(lineBlockCreator(options)).toEqual({
      progressWidth: 75,
      shiftFrom: 100,
      shiftTo: 25,
    });
  });
});
