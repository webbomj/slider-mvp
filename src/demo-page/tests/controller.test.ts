/**
 * @jest-environment jsdom
 */

import $ from 'jquery';

import Presenter from '../../slider/layers/presenter/presenter';
import { Controller } from '../controller';

describe('Controller', () => {
  document.body.innerHTML = `
    <div id="slider"></div>
    <div id="controller"></div>
    `;
  const container: HTMLElement | null = document.querySelector('#slider');
  const options = {
    min: 0,
    max: 100,
    from: 20,
    to: 100,
    step: 1,
    stepScale: 1,
    isVertical: false,
    isInterval: false,
    isLabel: true,
    isScale: true,
    isProgressBar: true,
  };
  let slider: Presenter;
  if (container) {
    slider = new Presenter({ options, container });
  }
  let controller: Controller;

  beforeEach(() => {
    const container: HTMLElement | null = document.querySelector('#controller');
    if (container && slider) {
      controller = new Controller({ container, slider });
    }
  });

  afterEach(() => {
    const controllerNode: HTMLElement | null =
      document.querySelector('controller');
    if (controllerNode) {
      controllerNode.innerHTML = '';
    }
  });

  test('Should return 11 inputs (6 number input, 5 checkbox input)', () => {
    const inputs = document.querySelectorAll('#controller input');
    const inputsNumber = document.querySelectorAll(
      "#controller input[type='number']",
    );
    const inputsCheckbox = document.querySelectorAll(
      "#controller input[type='checkbox']",
    );
    expect(inputs).toHaveLength(11);
    expect(inputsNumber).toHaveLength(6);
    expect(inputsCheckbox).toHaveLength(5);
  });

  test('Should change checked for input', () => {
    const intervalInput: HTMLInputElement | null = document.querySelector(
      '.control__input[name="isInterval"]',
    );
    expect(intervalInput?.checked).toBe(false);

    const event = $.Event('click');
    $(`.control__leftBlock`).trigger(event);
    $(`.control__leftBlock [name="isInterval"]`).trigger(event);

    expect(intervalInput?.checked).toBe(true);
  });

  test('Should change value for input', () => {
    controller.inputsHandler = jest.fn(() => {});
    const fromInput: HTMLInputElement | null = document.querySelector(
      '.control__rightBlock .control__input[name="from"]',
    );

    expect(fromInput?.value).toBe(`20`);
    const event = $.Event('click');
    const event2 = $.Event('blur');

    const $fromInput = $(`.control__rightBlock .control__input[name="from"]`);
    $fromInput.trigger(event);
    if (fromInput) {
      fromInput.stepUp();
    }
    $fromInput.trigger(event2);
    $(`.control__leftBlock`).trigger(event);

    expect(fromInput?.value).toBe(`21`);
    expect(controller.inputsHandler).toBeCalled();
  });

  test('Should inputsHandler called', () => {
    const inputsHandler = jest.spyOn(controller, 'inputsHandler');
    const fullUpdate = jest.spyOn(slider, 'fullUpdate');

    let event2 = new Event('click');
    controller.inputsHandler(event2);

    expect(inputsHandler).toBeCalled();

    $('[name="isProgressBar"]').trigger($.Event('click'));
    const progressBar: HTMLInputElement | null = document.querySelector(
      '[name="isProgressBar"]',
    );
    let value;
    if (progressBar) {
      value = progressBar.checked;
    }
    slider.fullUpdate({ isProgressBar: value });

    expect(fullUpdate).toBeCalledWith({ isProgressBar: false });
  });
});
