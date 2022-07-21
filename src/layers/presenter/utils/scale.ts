import { ICreateArrScale } from "../../interfaces/interfaces";

const createArrScale = (min: number, max: number, step: number) => {
  let arrayScale = [];
  for (let index = min; index <= max; index += step) {
    arrayScale.push(index);
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

export { arrScaleCreator };
