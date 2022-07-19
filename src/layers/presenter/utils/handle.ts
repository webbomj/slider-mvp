function getCoords(elem: HTMLElement) {
  let boxLeft = elem.getBoundingClientRect().left;
  let boxRight = boxLeft + elem.offsetWidth;

  return {
    left: boxLeft + pageXOffset,
    width: boxRight - boxLeft,
  };
}

export { getCoords };
