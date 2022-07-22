import {
  ICountProgressWidthProps,
  ICountShiftFromProps,
  ICountShiftToProps,
  ICountStepPixelProps,
  IModelOptions,
} from "../../interfaces/interfaces";

//рассчитываем начальный отступ
const countShiftFrom = ({
  min,
  from,
  max,
  step,
  isInterval,
}: ICountShiftFromProps) => {
  if (!isInterval) {
    return 0;
  }
  const stepPercent = countStepPercent({ step, max, min });
  return ((from - min) / step) * stepPercent;
};
const countShiftTo = ({ min, max, step, to }: ICountShiftToProps) => {
  const stepPercent = countStepPercent({ step, max, min });
  return ((to - min) / step) * stepPercent;
};

//рассчитываем шаг в процентах
const countStepPercent = ({ step, max, min }: ICountStepPixelProps) => {
  return 100 / ((max - min) / step);
};

//расчитываем ширину прогрессбара
const countProgressWidth = ({
  step,
  max,
  min,
  to,
  from,
  isInterval,
}: ICountProgressWidthProps): number => {
  const stepPercent = countStepPercent({ max, min, step });
  if (!isInterval) {
    return ((to - min) / step) * stepPercent;
  }
  return ((to - from) / step) * stepPercent;
};

const lineBlockCreator = (model: IModelOptions) => {
  const { from, max, min, step, to, isInterval } = model;

  const shiftFrom = countShiftFrom({ from, max, min, step, isInterval });
  const shiftTo = countShiftTo({ to, max, min, step });
  const progressWidth = countProgressWidth({
    from,
    max,
    min,
    step,
    to,
    isInterval,
  });
  return {
    shiftFrom,
    shiftTo,
    progressWidth,
  };
};

export { lineBlockCreator, countStepPercent };
