import { IModelOptions } from "../slider/layers/interfaces/interfaces";
import Presenter from "../slider/layers/presenter/presenter";
import { IControllerProps, ICreateControlPanelProps } from "./interfaces";
import "./demo.scss";

class Controller {
  container: HTMLElement;
  slider: Presenter;
  state: IModelOptions;
  control: HTMLElement;
  constructor({ container, slider }: IControllerProps) {
    this.container = container;
    this.slider = slider;
    this.state = this.slider.getModel().getState();
    this.createControlPanel();
  }

  createControlItem = (type: string, name: string, value: number | boolean) => {
    const elementWrapper = document.createElement("div");
    elementWrapper.classList.add("control__item");

    const minPanel = document.createElement("input");
    minPanel.classList.add("control__input");
    minPanel.type = type;
    minPanel.name = name;
    if (typeof value === "number") {
      minPanel.value = `${value}`;
    } else {
      minPanel.checked = value;
    }

    const minPanelLabel = document.createElement("h3");
    minPanelLabel.classList.add("control__header");
    minPanelLabel.textContent = name;

    elementWrapper.append(minPanelLabel);
    elementWrapper.append(minPanel);

    return elementWrapper;
  };

  createControlPanel = () => {
    const controlWrapper = document.createElement("div");
    controlWrapper.classList.add("control");
    const controlLeft = document.createElement("div");
    controlLeft.classList.add("control__leftBlock");
    const controlRight = document.createElement("div");
    controlRight.classList.add("control__rightBlock");
    const numberValues = ["min", "max", "from", "to", "step", "stepScale"];
    for (const key in this.state) {
      let element;

      if (numberValues.includes(key)) {
        element = this.createControlItem(
          ICreateControlPanelProps.number,
          key,
          this.state[key]
        );
        controlRight.append(element);
      } else {
        element = this.createControlItem(
          ICreateControlPanelProps.checkbox,
          key,
          this.state[key]
        );
        controlLeft.append(element);
      }
    }
    controlWrapper.append(controlLeft);
    controlWrapper.append(controlRight);
    this.container.appendChild(controlWrapper);
    this.control = controlWrapper;
  };
}

export { Controller };
