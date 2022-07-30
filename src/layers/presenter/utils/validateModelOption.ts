import { IModelOptions } from "../../interfaces/interfaces";

const validateModel = (model: IModelOptions) => {
  const { max, min, step, from, to } = model;
  const validateWidthMoreThenStep = Math.abs(max - min) >= step;
  const validateFromLessThenMin = from >= min;
  const validateToLessThenMax = to <= max;

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

  return true;
};

export { validateModel };
