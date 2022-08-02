import { IModelOptions } from "../slider/layers/interfaces/interfaces";
import Presenter from "../slider/layers/presenter/presenter";

interface IControllerProps {
  container: HTMLElement;
  slider: Presenter;
}

enum ICreateControlPanelProps {
  "number" = "number",
  "checkbox" = "checkbox",
}

type NumberInputs = Omit<
  IModelOptions,
  "isVertical" | "isInterval" | "isScale" | "isLabel" | "isProgressBar"
>;

export { IControllerProps, ICreateControlPanelProps, NumberInputs };
