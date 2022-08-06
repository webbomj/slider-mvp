import { IModelOptions } from "../../interfaces/interfaces";

const defaultOptions: IModelOptions = {
  min: 0,
  max: 100,
  from: 20,
  to: 100,
  step: 1,
  stepScale: 1,
  isVertical: false,
  isInterval: false,
  isLabel: true,
  isScale: true,
  isProgressBar: true,
};

const validateModel = (model: IModelOptions) => {
  const fullModel = { ...defaultOptions, ...model };
  const { max, min, step, from, to } = fullModel;
  const validateWidthMoreThenStep = Math.abs(max - min) >= step;
  const validateFromLessThenMin = from >= min;
  const validateToLessThenMax = to <= max;
  const validateFromLessTo = from <= to;
  const stepMoreThenZero = step > 0;

  if (!validateWidthMoreThenStep) {
    console.log(
      "The difference between the maximum and minimum value must be equal to or greater than the step"
    );
    return false;
  }
  if (!validateFromLessThenMin) {
    console.log(
      "The starting point of the start slider must be less than or equal to the slider's minimum value"
    );
    return false;
  }
  if (!validateToLessThenMax) {
    console.log(
      "The ending point of the start slider must be less than or equal to the slider's maximum value"
    );
    return false;
  }
  if (!validateFromLessTo) {
    console.log("From point must be less or equal To point");
    return false;
  }
  if (!stepMoreThenZero) {
    console.log("Step should be more then 0");
    return false;
  }

  return true;
};

export { validateModel };
