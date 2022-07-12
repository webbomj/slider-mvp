class Handle {
  constructor() {}
  render = (container: HTMLElement) => {
    const handle = document.createElement("div");
    handle.id = "handle";
    container.append(handle);
  };
}

export default Handle;
