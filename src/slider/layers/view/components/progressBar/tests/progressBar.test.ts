/**
 * @jest-environment jsdom
 */

import Observer from '../../../../observer/observer';
import ProgressBar from '../progressBar';

describe('progressBar', () => {
  document.body.innerHTML = `
    <div id="app"></div>
  `;
  let container: HTMLElement | null;
  const observer = new Observer();
  let progressBar: ProgressBar;
  let progressBarNode: HTMLElement | null;
  beforeEach(() => {
    container = document.getElementById('app');
    const options = {
      container: container || document.body,
      shiftFrom: 20,
      isVertical: false,
      observer,
      width: 200,
    };
    progressBar = new ProgressBar(options);
    progressBarNode = document.querySelector('.progress-bar');
  });
  afterEach(() => {
    document.body.innerHTML = `
    <div id="app"></div>
  `;
  });
  test('Should have class: progressBar', () => {
    expect(progressBarNode).not.toBeNull();
    expect(progressBarNode?.classList[0]).toBe('progress-bar');
  });
  test('Update: should width 400, shiftFrom: 70, isVertical: false', () => {
    progressBar.update({ shiftFrom: 70, width: 400, isVertical: false });
    expect(progressBarNode?.style.width).toBe('400%');
    expect(progressBarNode?.style.left).toBe('70%');
  });
  test('Update: should width 500, shiftFrom: 75, isVertical: true', () => {
    progressBar.update({ shiftFrom: 75, width: 500, isVertical: true });
    expect(progressBarNode?.style.height).toBe('500%');
    expect(progressBarNode?.style.top).toBe('75%');
  });
});
