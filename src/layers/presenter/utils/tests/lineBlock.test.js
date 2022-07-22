const { countStepPercent } = require("../lineBlock");
describe("lineBlock", () => {
  const options = { step: 3, max: 10, min: 1 };
  test("countStepPercent should return correct value", () => {
    expect(countStepPercent(options)).toBeCloseTo(33.33);
  });
  test("countStepPercent should return correct value with negative min", () => {
    const options = { step: 2, max: 10, min: -4 };
    expect(countStepPercent(options)).toBeCloseTo(14.28, 1);
  });
  test("countStepPercent should return correct value with negative min and max", () => {
    const options = { step: 1, max: -1, min: -4 };
    expect(countStepPercent(options)).toBeCloseTo(33.33, 1);
  });
});
