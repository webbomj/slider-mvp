class Handle {
  constructor() {}
  render = (container: HTMLAreaElement) => {
    const handle = document.createElement("div");
    handle.classList.add("lineBlock__handler");
    container.append(handle);
  };
}

export default Handle;
