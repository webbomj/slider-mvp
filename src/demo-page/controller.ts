import { IModelOptions } from "../layers/interfaces/interfaces";
import Presenter from "../layers/presenter/presenter";
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

  createControlItem = (type: string, name: string) => {
    const elementWrapper = document.createElement("div");
    elementWrapper.classList.add("control__item");
    const minPanel = document.createElement("input");
    minPanel.classList.add("control__input");
    minPanel.type = type;
    minPanel.name = name;
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
    const numberValues = ["min", "max", "from", "to", "step", "stepScale"];
    for (const key in this.state) {
      let element;
      if (numberValues.includes(key)) {
        element = this.createControlItem(ICreateControlPanelProps.number, key);
      } else {
        element = this.createControlItem(
          ICreateControlPanelProps.checkbox,
          key
        );
      }
      controlWrapper.append(element);
    }
    this.container?.parentElement?.appendChild(controlWrapper);
    this.control = controlWrapper;
  };
}

export { Controller };
