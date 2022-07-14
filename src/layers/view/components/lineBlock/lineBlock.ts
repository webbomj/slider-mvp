import {
  ILineBlockOptions,
  IScaleOptions,
} from "../../../interfaces/interfaces";
import Handle from "../handle/handle";
import Label from "../label/label";
import ProgressBar from "../progressBar/progressBar";
import Scale from "../scale/scale";
import "./lineBlock.scss";

class lineBlock {
  private container: HTMLElement;
  private options;
  private progressBar;

  constructor(lineOptions: ILineBlockOptions) {
    const { container, options } = lineOptions;
    this.container = container;
    this.options = options;
    this.init();
    this.mode();
  }

  init = () => {
    const lineBlock = document.createElement("div");
    const activeBlock = document.createElement("div");

    const { min, max, step } = this.options;

    lineBlock.classList.add("lineBlock");
    activeBlock.classList.add("lineBlock__active");

    new Handle().render(activeBlock);
    new Label().render(activeBlock);

    lineBlock.append(activeBlock);

    this.progressBar = new ProgressBar().render(lineBlock);
    if (this.container) {
      this.container.append(lineBlock);
    }
  };
  mode() {
    let sliderSpan: HTMLDivElement | null = document.querySelector(
      ".lineBlock__handler"
    );
    let slider = document.querySelector(".lineBlock");
    let label: HTMLDivElement | null =
      this.container.querySelector(".lineBlock__label");

    const { min, max, step: stepSize } = this.options;

    // $("p.result").html(min);
    if (sliderSpan) {
      sliderSpan.addEventListener("mousedown", function (event) {
        let sliderCoords = getCoords(slider);
        let sliderSpanCoords = getCoords(sliderSpan);
        let shift = event.pageX - sliderSpanCoords.left;
        console.log(event.pageX);

        //Начнем движение ползунка
        const moveSlider = (event) => {
          let left =
            ((event.pageX - shift - sliderCoords.left) / sliderCoords.width) *
            100;
          if (left < 0) left = 0;
          if (left > 100) left = 100;
          console.log("left", left);

          //Шаг слайдера
          let stepCount = (max - min) / stepSize;
          let stepPercent = 100 / stepCount;
          let stepLeft = Math.round(left / stepPercent) * stepPercent;
          if (stepLeft < 0) stepLeft = 0;
          if (stepLeft > 100) stepLeft = 100;
          if (sliderSpan) {
            sliderSpan.style.left = `${stepLeft}%`;
          }

          //Расчитаем значение равное шагу слайдера
          let result = Number(((stepLeft / stepPercent) * stepSize).toFixed());
          let values = result + min;
          if (label) {
            label.style.left = `${stepLeft}%`;
            label.textContent = `${values}`;
          }
        };

        const moveSliderFn = (event) => moveSlider(event);

        //Начнем движение ползунка
        document.addEventListener("mousemove", moveSliderFn);

        //Остановим движение ползунка
        document.addEventListener("mouseup", function () {
          document.removeEventListener("mousemove", moveSliderFn);
        });

        return false;
      });
    }
    // Найдем координаты
    function getCoords(elem) {
      let boxLeft = elem.getBoundingClientRect().left;

      let boxRight = boxLeft + elem.offsetWidth;
      console.log(
        "getCoords",
        `${elem}`,
        boxLeft,
        boxRight,
        elem.offsetWidth,
        pageXOffset
      );
      return {
        left: boxLeft + pageXOffset,
        width: boxRight - boxLeft,
      };
    }
  }
}

export default lineBlock;
