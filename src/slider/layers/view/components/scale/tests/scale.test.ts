/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import Observer from '../../../../observer/observer';
import Scale from '../scale';

describe('Scale', () => {
  document.body.innerHTML = `<div id="app"></div>`;
  let scale: Scale;
  let container: HTMLElement | null;
  const observer = new Observer();
  let scaleNode: HTMLElement | null;
  let itemsNode: NodeListOf<HTMLDivElement>;
  beforeEach(() => {
    container = document.getElementById('app');
    let options = {
      container: container ? container : document.body,
      arrayScale: [1, 2, 3, 4, 5],
      isVertical: false,
      observer,
      shift: 20,
    };
    scale = new Scale(options);
    scaleNode = document.querySelector('.scale');
    itemsNode = document.querySelectorAll('.scale__item');
  });

  afterEach(() => {
    document.body.innerHTML = `<div id="app"></div>`;
  });
  test('Should have class scale', () => {
    expect(scaleNode).not.toBeNull();
    expect(scaleNode?.classList[0]).toBe('scale');
  });
  test('Should 6 items in scale', () => {
    expect(itemsNode).toHaveLength(5);
  });
  test('Should items have correct text', () => {
    expect(itemsNode[0].textContent).toBe('1');
    expect(itemsNode[2].textContent).toBe('3');
    expect(itemsNode[4].textContent).toBe('5');
  });
  test('Should items have correct margin left in horisontal position', () => {
    expect(itemsNode[0].style.left).toBe('0%');
    expect(itemsNode[2].style.left).toBe('40%');
    expect(itemsNode[4].style.left).toBe('80%');
  });
  test('Should items have correct margin top in vertical position', () => {
    document.body.innerHTML = `<div id="app"></div>`;
    container = document.getElementById('app');
    let options = {
      container: container ? container : document.body,
      arrayScale: [1, 2, 3, 4, 5],
      isVertical: true,
      observer,
      shift: 25,
    };
    scale = new Scale(options);
    scaleNode = document.querySelector('.scale');
    itemsNode = document.querySelectorAll('.scale__item');
    expect(itemsNode[0].style.top).toBe('0%');
    expect(itemsNode[1].style.top).toBe('25%');
    expect(itemsNode[2].style.top).toBe('50%');
    expect(itemsNode[3].style.top).toBe('75%');
    expect(itemsNode[4].style.top).toBe('100%');
  });
  test('Update: should correct number', () => {
    scale.update({ scale: [1, 2, 3, 4, 5, 6], shift: 20 });
    const scaleItem: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('.scale__item');
    expect(scaleItem[3].style.left).toBe('60%');
    expect(scaleItem[5].style.left).toBe('100%');
    expect(scaleItem[2].textContent).toBe('3');
    expect(scaleItem[4].textContent).toBe('5');
  });
});
