import { IModelOptions } from '../../../interfaces/interfaces';
import { validateModel } from '../validateModelOption';

describe('validateModelOption', () => {
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

  const stepLesserThenZero: IModelOptions = {
    min: 0,
    max: 10,
    from: 8,
    to: 9,
    step: -1,
    stepScale: 2,
    isVertical: true,
    isInterval: true,
    isLabel: true,
    isScale: true,
    isProgressBar: true,
  };

  test('Should return true', () => {
    expect(validateModel(trueModel)).toEqual([true, '']);
  });
  test('Should return false, because step more then width', () => {
    expect(validateModel(widthLesserThenStep)).toEqual([
      false,
      'The difference between the maximum and minimum value must be equal to or greater than the step',
    ]);
  });
  test('Should return false, because from greater then min', () => {
    expect(validateModel(fromValueGreaterThenMinValue)).toEqual([
      false,
      "The starting point of the start slider must be less than or equal to the slider's minimum value",
    ]);
  });
  test('Should return false, because to greater then max', () => {
    expect(validateModel(toValueGreaterThenMinValue)).toEqual([
      false,
      "The ending point of the start slider must be less than or equal to the slider's maximum value",
    ]);
  });
  test('Should return false, because from greater then to', () => {
    expect(validateModel(fromValueGreaterThenToValue)).toEqual([
      false,
      'From point must be less or equal To point',
    ]);
  });
  test('Should return false, because step lesser then 0', () => {
    expect(validateModel(stepLesserThenZero)).toEqual([false, 'Step should be more then 0']);
  });
});
