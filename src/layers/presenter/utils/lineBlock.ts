import {
  ICountProgressWidthProps,
  ICountShiftFromProps,
  ICountShiftToProps,
  ICountStepPixelProps,
  IModelOptions,
} from "../../interfaces/interfaces";

//рассчитываем начальный отступ
const countShiftFrom = ({ min, from, max, step }: ICountShiftFromProps) => {
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
}: ICountProgressWidthProps): number => {
  const stepPercent = countStepPercent({ max, min, step });
  return ((to - from) / step) * stepPercent;
};

const lineBlockCreator = (model: IModelOptions) => {
  const { from, max, min, step, to } = model;

  const shiftFrom = countShiftFrom({ from, max, min, step });
  const shiftTo = countShiftTo({ to, max, min, step });
  const progressWidth = countProgressWidth({ from, max, min, step, to });

  return {
    shiftFrom,
    shiftTo,
    progressWidth,
  };
};

export { lineBlockCreator };
