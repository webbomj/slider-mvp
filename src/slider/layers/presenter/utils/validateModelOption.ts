import { IModelOptions } from '../../interfaces/interfaces';

const defaultOptions: IModelOptions = {
  min: 0,
  max: 100,
  from: 20,
  to: 30,
  step: 1,
  stepScale: 1,
  isVertical: false,
  isInterval: false,
  isLabel: true,
  isScale: true,
  isProgressBar: true,
};

const validateModel = (model: IModelOptions): [boolean, string] => {
  const fullModel = { ...defaultOptions, ...model };
  const { max, min, step, from, to } = fullModel;
  const validateWidthMoreThenStep = Math.abs(max - min) >= step;
  const validateFromLessThenMin = from >= min;
  const validateToLessThenMax = to <= max;
  const validateFromLessTo = from <= to;
  const stepMoreThenZero = step > 0;
  let isValid = false;
  let errorMessage = '';
  try {
    if (!validateWidthMoreThenStep) {
      throw Error(
        'The difference between the maximum and minimum value must be equal to or greater than the step',
      );
    }
    if (!validateFromLessThenMin) {
      throw Error(
        "The starting point of the start slider must be less than or equal to the slider's minimum value",
      );
    }
    if (!validateToLessThenMax) {
      throw Error(
        "The ending point of the start slider must be less than or equal to the slider's maximum value",
      );
    }
    if (!validateFromLessTo) {
      throw Error('From point must be less or equal To point');
    }
    if (!stepMoreThenZero) {
      throw Error('Step should be more then 0');
    }
    isValid = true;
  } catch (e) {
    errorMessage = (e as Error).message;
    isValid = false;
  } finally {
    return [isValid, errorMessage];
  }
};

export { validateModel };
