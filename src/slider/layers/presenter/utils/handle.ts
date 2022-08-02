function getCoords(elem: HTMLElement) {
  let { left, width, top, height } = elem.getBoundingClientRect();

  return {
    left: left + scrollX,
    width: width,
    top: top + scrollY,
    height: height,
  };
}

export { getCoords };
