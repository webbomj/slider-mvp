/**
 * @jest-environment jsdom
 */
import { HandlePosition } from '../../../../interfaces/interfaces';
import Observer from '../../../../observer/observer';
import Handle from '../handle';

describe('Handle', () => {
  document.body.innerHTML = `
    <div id="app"></div>
  `;

  const shift = 40;
  const observer = new Observer();
  const isVertical = false;
  const handlePosition = HandlePosition.from;
  let container: HTMLElement | null;
  let handle: Handle | null;
  let handleNode: HTMLElement | null;

  beforeEach(() => {
    container = document.getElementById('app');
    handle = new Handle({
      container: container || document.body,
      shift,
      observer,
      isVertical,
      handlePosition,
    });
    handleNode = document.querySelector('.handler');
  });

  afterEach(() => {
    document.body.innerHTML = `
    <div id="app"></div>
    `;
  });
  test('Should have handler', () => {
    expect(handleNode).not.toBeNull();
  });
  test('Should have a class: handler', () => {
    expect(handleNode?.classList['0']).toBe('handler');
  });
  test('Should have a dataset: from', () => {
    expect(handleNode?.dataset.handle).toBe('from');
  });

  test('Should have shift 20 to horizontal position', () => {
    handle?.update(20, false);
    expect(handleNode?.style.left).toBe('20%');
  });
  test('Should have shift 30 to vertical position', () => {
    handle?.update(30, true);
    expect(handleNode?.style.top).toBe('30%');
  });
});
