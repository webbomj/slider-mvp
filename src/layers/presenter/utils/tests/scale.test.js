const { createArrScale, arrScaleCreator } = require("../scale");

describe("Scale: createArrScale", () => {
  test("Should return valide array", () => {
    const result = [0, 2, 4, 6, 8, 10];
    expect(createArrScale(0, 10, 2)).toEqual(result);
  });
  test("Should return valide array with negative max min value", () => {
    const result = [-8, -6, -4, -2];
    expect(createArrScale(-8, -2, 2)).toEqual(result);
  });
  test("Should return valide array with (max-min) % step != 0", () => {
    const result = [2, 4, 5];
    expect(createArrScale(2, 5, 2)).toEqual(result);
  });
});

describe("Scale: arrScaleCreator", () => {
  test("Should return validate object value", () => {
    const result = { scale: [0, 2, 4, 6, 8, 10], shift: 20 };
    expect(arrScaleCreator({ min: 0, max: 10, step: 2 })).toEqual(result);
  });
  test("Should return validate object value with negative min max value", () => {
    const result = { scale: [-10, -8, -6, -4, -2], shift: 25 };
    expect(arrScaleCreator({ min: -10, max: -2, step: 2 })).toEqual(result);
  });
});
