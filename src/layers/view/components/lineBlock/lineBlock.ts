import {
  ICountProgressWidthProps,
  ICountShiftFromProps,
  ICountShiftToProps,
  ICountStepPixelProps,
  ILineBlockOptions,
  IModelOptions,
  IProgressBarOptions,
} from "../../../interfaces/interfaces";
import Observer from "../../../observer/observer";
import Handle from "../handle/handle";
import Label from "../label/label";
import ProgressBar from "../progressBar/progressBar";
import "./lineBlock.scss";

class lineBlock {
  private container: HTMLElement;
  private options;
  private progressBar: ProgressBar;
  private labelTo: Label;
  private handleTo: Handle;
  private observer: Observer;

  constructor(lineOptions: ILineBlockOptions) {
    const { container, options, observer } = lineOptions;
    this.container = container;
    this.options = options;
    this.observer = observer;
    this.init();
    // this.mode();
  }

  init = () => {
    const lineBlock = document.createElement("div");
    const activeBlock = document.createElement("div");

    const { min, max, step, from, to } = this.options;

    lineBlock.classList.add("lineBlock");
    activeBlock.classList.add("lineBlock__active");

    const shift = this.countShiftTo({ to, min, max, step });
    this.handleTo = new Handle({
      container: activeBlock,
      shift: shift,
      observer: this.observer,
    });
    this.labelTo = new Label({
      container: activeBlock,
      shift: shift,
      text: to,
      observer: this.observer,
    });

    lineBlock.append(activeBlock);

    const shiftFrom = this.countShiftFrom({ from, min, max, step });
    const progressBarWidth = this.countProgressWidth({
      from,
      max,
      step,
      min,
      to,
    });
    const ProgressBarOptions: IProgressBarOptions = {
      container: lineBlock,
      shiftFrom: shiftFrom,
      width: progressBarWidth,
      observer: this.observer,
    };

    this.progressBar = new ProgressBar(ProgressBarOptions);
    if (this.container) {
      this.container.append(lineBlock);
    }
  };
  update = (model: IModelOptions) => {
    const { from, max, min, step, to, isInterval } = model;
    const shiftFrom = this.countShiftFrom({ to, max, min, step });
    this.handleTo.update(shiftFrom);
    this.labelTo.update(to, shiftFrom);
    if (!isInterval) {
      this.progressBar.update({
        shiftFrom: from,
        width: this.countProgressWidth({ step, from, max, min, to }),
      });
    }

    // this.labelTo.update()
  };

  // mode() {
  //   let sliderSpan: HTMLDivElement | null = document.querySelector(
  //     ".lineBlock__handler"
  //   );
  //   let slider = document.querySelector(".lineBlock");
  //   let label: HTMLDivElement | null =
  //     this.container.querySelector(".lineBlock__label");

  //   const { min, max, step: stepSize, from, to } = this.options;
  //   const shiftFrom = this.countShiftFrom({
  //     from,
  //     min,
  //     max,
  //     step: stepSize,
  //   });
  //   const widthProgressBar = this.countProgressWidth({
  //     from,
  //     max,
  //     step: stepSize,
  //     min,
  //     to,
  //   });

  //   // $("p.result").html(min);
  //   if (sliderSpan) {
  //     sliderSpan.addEventListener("mousedown", function (event: MouseEvent) {
  //       let sliderCoords = getCoords(slider);
  //       let sliderSpanCoords = getCoords(sliderSpan);
  //       let shift = event.pageX - sliderSpanCoords.left;
  //       console.log(event.pageX);

  //       //Начнем движение ползунка
  //       const moveSlider = (event: MouseEvent) => {
  //         let left =
  //           ((event.pageX - shift - sliderCoords.left) / sliderCoords.width) *
  //           100;
  //         if (left < 0) left = 0;
  //         if (left > 100) left = 100;
  //         console.log("left", event.pageX, shift, sliderCoords.left);

  //         //Шаг слайдера
  //         let stepCount = (max - min) / stepSize;
  //         let stepPercent = 100 / stepCount;
  //         let stepLeft = Math.round(left / stepPercent) * stepPercent;
  //         if (stepLeft < 0) stepLeft = 0;
  //         if (stepLeft > 100) stepLeft = 100;
  //         if (sliderSpan) {
  //           sliderSpan.style.left = `${stepLeft}%`;
  //         }

  //         //Расчитаем значение равное шагу слайдера
  //         let result = Number(((stepLeft / stepPercent) * stepSize).toFixed());
  //         let values = result + min;
  //         if (label) {
  //           label.style.left = `${stepLeft}%`;
  //           label.textContent = `${values}`;
  //         }
  //       };

  //       const moveSliderFn = (event: MouseEvent) => moveSlider(event);

  //       //Начнем движение ползунка
  //       document.addEventListener("mousemove", moveSliderFn);

  //       //Остановим движение ползунка
  //       document.addEventListener("mouseup", function () {
  //         document.removeEventListener("mousemove", moveSliderFn);
  //       });

  //       return false;
  //     });
  //   }
  //   // Найдем координаты
  //   function getCoords(elem: HTMLElement) {
  //     let boxLeft = elem.getBoundingClientRect().left;

  //     let boxRight = boxLeft + elem.offsetWidth;
  //     console.log(
  //       "getCoords",
  //       `${elem}`,
  //       boxLeft,
  //       boxRight,
  //       elem.offsetWidth,
  //       pageXOffset
  //     );
  //     return {
  //       left: boxLeft + pageXOffset,
  //       width: boxRight - boxLeft,
  //     };
  //   }
  // }
  //рассчитываем начальный отступ
  countShiftFrom = ({ min, to, max, step }: ICountShiftFromProps) => {
    const stepPercent = this.countStepPercent({ step, max, min });
    return ((to - min) / step) * stepPercent;
  };
  countShiftTo = ({ min, max, step, to }: ICountShiftToProps) => {
    const stepPercent = this.countStepPercent({ step, max, min });
    return ((to - min) / step) * stepPercent;
  };

  //рассчитываем шаг в пикселях
  countStepPixel = ({ step, max, min }: ICountStepPixelProps) => {
    const sliderWidth = this.countContainerOptions().width;
    return Math.floor(sliderWidth / ((max - min) / step));
  };
  //рассчитываем шаг в процентах
  countStepPercent = ({ step, max, min }: ICountStepPixelProps) => {
    return 100 / ((max - min) / step);
  };
  //получаем размеры встроенного контейнера
  countContainerOptions = (): DOMRect => {
    return this.container.getBoundingClientRect();
  };

  //расчитываем ширину прогрессбара
  countProgressWidth = ({
    step,
    max,
    min,
    to,
    from,
  }: ICountProgressWidthProps): number => {
    const stepPercent = this.countStepPercent({ max, min, step });
    return ((to - from) / step) * stepPercent;
  };
}

export default lineBlock;
