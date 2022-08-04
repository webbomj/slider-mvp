import { IModelOptions } from "../slider/layers/interfaces/interfaces";
import Presenter from "../slider/layers/presenter/presenter";
import {
  IControllerProps,
  ICreateControlPanelProps,
  NumberInputs,
} from "./interfaces";
import "./demo.scss";

class Controller {
  container: HTMLElement;
  slider: Presenter;
  state: IModelOptions;
  control: HTMLElement;
  numberInputs: string[];
  constructor({ container, slider }: IControllerProps) {
    this.container = container;
    this.slider = slider;
    this.state = this.slider.getModel().getState();
    this.numberInputs = ["min", "max", "from", "to", "step", "stepScale"];
    this.createControlPanel();
    this.setListeners();
  }

  private createControlItem = (
    type: string,
    name: string,
    value: number | boolean
  ) => {
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

  private createControlPanel = () => {
    const controlWrapper = document.createElement("div");
    controlWrapper.classList.add("control");
    const controlLeft = document.createElement("div");
    controlLeft.classList.add("control__leftBlock");
    const controlRight = document.createElement("div");
    controlRight.classList.add("control__rightBlock");

    for (const key in this.state) {
      let element;

      if (this.numberInputs.includes(key as keyof NumberInputs)) {
        element = this.createControlItem(
          ICreateControlPanelProps.number,
          key,
          this.state[key as keyof IModelOptions]
        );
        controlRight.append(element);
      } else {
        element = this.createControlItem(
          ICreateControlPanelProps.checkbox,
          key,
          this.state[key as keyof IModelOptions]
        );
        controlLeft.append(element);
      }
    }
    controlWrapper.append(controlLeft);
    controlWrapper.append(controlRight);
    this.container.appendChild(controlWrapper);
    this.control = controlWrapper;
  };

  private setListeners = () => {
    const rightBlockInputs = this.container.querySelectorAll(
      ".control__rightBlock .control__input"
    );
    rightBlockInputs?.forEach((el) =>
      el.addEventListener("blur", (e) => {
        this.inputsHandler(e);
      })
    );

    const leftBlock = this.container.querySelector(".control__leftBlock");
    leftBlock?.addEventListener("click", (e) => {
      this.inputsHandler(e);
    });
  };

  inputsHandler = (e: Event) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    let value: number | boolean;
    const name = e.target.name as keyof NumberInputs;

    if (this.numberInputs.includes(name)) {
      value = Number(e.target.value);
      console.log("number", name, value);
    } else {
      value = e.target.checked;
      console.log("number", name, value);
    }

    this.slider.fullUpdate({ [name]: value });
  };
}

export { Controller };
