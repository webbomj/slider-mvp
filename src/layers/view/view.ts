import { IModelOptions, IViewOptions } from "../interfaces/interfaces";
import lineBlock from "./components/lineBlock/lineBlock";
import Scale from "./components/scale/scale";

class View {
  private container: HTMLElement;
  private options: IModelOptions;
  private slide;

  constructor({ options, container }: IViewOptions) {
    this.container = container;
    this.options = options;
    this.init();
  }

  init = () => {
    const slide = new lineBlock({
      container: this.container,
      options: this.options,
    });
    this.slide = slide;
    const scale = new Scale().render(this.container);
  };
}

export default View;
