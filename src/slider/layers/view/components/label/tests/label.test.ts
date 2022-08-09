/**
 * @jest-environment jsdom
 */

import { ILabelProps } from '../../../../interfaces/interfaces';
import Label from '../label';

describe('label', () => {
  let label: Label;
  let container: HTMLElement | null;
  let labelNode: HTMLElement | null;
  let options: ILabelProps;
  document.body.innerHTML = `
    <div id="app"></div>
  `;

  beforeEach(() => {
    container = document.getElementById('app');
    options = {
      container: container || document.body,
      isVertical: true,
      shift: 20,
      text: 20,
    };
    label = new Label(options);
    labelNode = document.querySelector('.label');
  });

  afterEach(() => {
    document.body.innerHTML = `
    <div id="app"></div>
  `;
  });
  test('Should have class label', () => {
    expect(labelNode).not.toBeNull();
    expect(labelNode?.classList[0]).toBe('label');
  });
  test('Update: if shift 25 and vertical position', () => {
    label.update(25, 25);
    expect(labelNode?.style.top).toBe('25%');
  });
  test('Update: if shift 35 and horizontal position', () => {
    document.body.innerHTML = '<div id="app"></div>';
    const container: HTMLElement | null = document.getElementById('app');
    const label = new Label({
      shift: 20,
      text: 20,
      isVertical: false,
      container: container || document.body,
    });
    const labelNode: HTMLElement | null = document.querySelector('.label');
    label.update(35, 35);
    expect(labelNode?.style.left).toBe('35%');
  });
});
