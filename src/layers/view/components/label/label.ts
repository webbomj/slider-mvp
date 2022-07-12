class Label {
  constructor() {}
  render = (container: HTMLElement) => {
    const label = document.createElement("div");
    label.id = "label";
    container.append(label);
  };
}

export default Label;
