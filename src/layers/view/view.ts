import { IModelOptions, IViewOptions } from "../interfaces/interfaces";
import lineBlock from "./components/lineBlock/lineBlock";
import Scale from "./components/scale/scale";

class View {
  private container: HTMLElement;
  private options: IModelOptions;
  private wrapper;

  constructor({ options, container }: IViewOptions) {
    this.container = container;
    this.options = options;
    this.init();
  }

  init = () => {
    const wrapper = new lineBlock({
      container: this.container,
      options: this.options,
    });
    this.wrapper = wrapper;
    const scale = new Scale().render(this.container);
  };
}

export default View;
