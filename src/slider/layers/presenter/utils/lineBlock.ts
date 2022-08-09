import {
  ICountProgressWidthProps,
  ICountShiftFromProps,
  ICountStepPixelProps,
  IModelOptions,
} from "../../interfaces/interfaces";

// рассчитываем начальный отступ
const countShiftHandle = ({
  min,
  current,
  max,
  step,
  isInterval,
  handle,
}: ICountShiftFromProps) => {
  if (!isInterval && handle === "from") {
    return 0;
  }
  const stepPercent = countStepPercent({ step, max, min });
  return ((current - min) / step) * stepPercent;
};

// рассчитываем шаг в процентах
const countStepPercent = ({ step, max, min }: ICountStepPixelProps) => 100 / ((max - min) / step);

// расчитываем ширину прогрессбара
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
  return (Math.abs(to - from) / step) * stepPercent;
};

const lineBlockCreator = (model: IModelOptions) => {
  const { from, max, min, step, to, isInterval } = model;

  const shiftFrom = countShiftHandle({
    current: from,
    max,
    min,
    step,
    isInterval,
    handle: "from",
  });
  const shiftTo = countShiftHandle({
    current: to,
    max,
    min,
    step,
    isInterval,
    handle: "to",
  });
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

export {
  lineBlockCreator,
  countStepPercent,
  countShiftHandle,
  countProgressWidth,
};
