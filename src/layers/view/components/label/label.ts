class Label {
  private label: HTMLElement;
  constructor() {
    const label = document.createElement("div");
    this.label = label;
    this.update(5);
  }
  render = (container: HTMLElement) => {
    this.label.classList.add("lineBlock__label");
    container.append(this.label);
  };
  update = (value: number) => {
    this.label.textContent = `${value}`;
  };
}

export default Label;
