import { IViewOptions } from "../../../interfaces/interfaces";

class Scale {
  constructor() {}
  render = (container: HTMLElement) => {
    const scale = document.createElement("div");
    scale.id = "scale";
    container.append(scale);
  };
}

export default Scale;
