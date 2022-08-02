import { ICreateArrScale } from "../../interfaces/interfaces";

const createArrScale = (min: number, max: number, step: number) => {
  let arrayScale = [];
  for (let index = min; index <= max; index += step) {
    const valuesFix = countValueRounding(step);
    const fixedValue = Number(index.toFixed(valuesFix));
    if (index === min || index === max) {
      arrayScale.push(index);
    } else {
      arrayScale.push(fixedValue);
    }
  }
  if ((max - min) % step !== 0) {
    arrayScale.push(max);
  }
  return arrayScale;
};

const arrScaleCreator = ({ min, max, step }: ICreateArrScale) => {
  const scale = createArrScale(min, max, step);
  const shift = (100 / (max - min)) * step;
  return { scale, shift };
};

const countValueRounding = (step: number) => {
  const valuesEndNumber = String(step).split(".")[1];
  let valueFix;
  valueFix = valuesEndNumber ? valuesEndNumber.length : 0;

  return valueFix;
};

export { arrScaleCreator, createArrScale, countValueRounding };
