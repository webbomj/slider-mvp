function getCoords(elem: HTMLElement) {
  const { left, width, top, height } = elem.getBoundingClientRect();

  return {
    left: left + scrollX,
    width,
    top: top + scrollY,
    height,
  };
}

export { getCoords };
