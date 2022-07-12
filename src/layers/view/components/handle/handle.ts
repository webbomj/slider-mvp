class Handle {
  constructor() {}
  render = (container: HTMLElement, className: string) => {
    const handle = document.createElement("div");
    handle.classList.add(className);
    container.append(handle);
  };
}

export default Handle;
