import { countValueRounding } from '../scale';

const { createArrScale, arrScaleCreator } = require('../scale');

describe('Scale: createArrScale', () => {
  test('Should return validate array', () => {
    const result = [0, 2, 4, 6, 8, 10];
    expect(createArrScale(0, 10, 2)).toEqual(result);
  });
  test('Should return validate array with negative max min value', () => {
    const result = [-8, -6, -4, -2];
    expect(createArrScale(-8, -2, 2)).toEqual(result);
  });
  test('Should return validate array with (max-min) % step != 0', () => {
    const result = [2, 4, 5];
    expect(createArrScale(2, 5, 2)).toEqual(result);
  });
});

describe('Scale: arrScaleCreator', () => {
  test('Should return validate object value', () => {
    const result = { scale: [0, 2, 4, 6, 8, 10], shift: 20 };
    expect(arrScaleCreator({ min: 0, max: 10, step: 2 })).toEqual(result);
  });
  test('Should return validate object value with negative min max value', () => {
    const result = { scale: [-10, -8, -6, -4, -2], shift: 25 };
    expect(arrScaleCreator({ min: -10, max: -2, step: 2 })).toEqual(result);
  });
  test('Should return validate object value with float min max value', () => {
    const result = {
      scale: [0.1, 0.4, 0.7, 1, 1.3, 1.6, 1.9, 2.2, 2.5, 2.8, 3.1, 3.3],
      shift: 9.375,
    };
    expect(arrScaleCreator({ min: 0.1, max: 3.3, step: 0.3 })).toEqual(result);
  });
});

describe('Scale countValueRounding', () => {
  test('Should return validate number', () => {
    expect(countValueRounding(1)).toBe(0);
    expect(countValueRounding(1.1)).toBe(1);
    expect(countValueRounding(1.52)).toBe(2);
    expect(countValueRounding(1.523)).toBe(3);
  });
});
