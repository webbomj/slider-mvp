class ProgressBar {
  constructor() {}
  render = (container: HTMLElement) => {
    const progressBar = document.createElement("div");
    progressBar.id = "progressBar";
    container.appendChild(progressBar);
  };
}

export default ProgressBar;
