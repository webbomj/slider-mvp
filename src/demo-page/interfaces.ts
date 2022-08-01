import Presenter from "../layers/presenter/presenter";

interface IControllerProps {
  container: HTMLElement;
  slider: Presenter;
}

enum ICreateControlPanelProps {
  "number" = "number",
  "checkbox" = "checkbox",
}

export { IControllerProps, ICreateControlPanelProps };
