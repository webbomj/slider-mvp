import Presenter from "../slider/layers/presenter/presenter";

interface IControllerProps {
  container: HTMLElement;
  slider: Presenter;
}

enum ICreateControlPanelProps {
  "number" = "number",
  "checkbox" = "checkbox",
}

export { IControllerProps, ICreateControlPanelProps };
