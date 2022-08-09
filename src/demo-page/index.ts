import $ from 'jquery';
import { IModelOptions } from '../slider/layers/interfaces/interfaces';
import { Controller } from './controller';
import '../slider/slider';

const options: Partial<IModelOptions>[] = [
  {
    min: 2,
    max: 20,
    from: 2,
    to: 4,
    step: 2,
    stepScale: 2,
    isVertical: true,
    isInterval: true,
    isLabel: true,
    isScale: true,
    isProgressBar: true,
  },
  {
    min: 20,
    max: 40,
    from: 20,
    to: 30,
    step: 2.3,
    stepScale: 5,
    isVertical: false,
    isInterval: false,
    isLabel: true,
    isScale: false,
    isProgressBar: true,
  },
  {
    stepScale: 20,
    isVertical: true,
    isInterval: false,
    isLabel: false,
    isScale: true,
    isProgressBar: false,
  },
  {
    min: -20,
    max: 20,
    from: -2,
    to: 4,
    step: 2,
    stepScale: 2,
    isVertical: false,
    isInterval: true,
    isLabel: true,
    isScale: true,
    isProgressBar: true,
  },
];

type typeData = [string, Partial<IModelOptions>, string];

const dataArray: typeData[] = [
  ['#slider1 .app__slider', options[0], '#slider1 .app__control'],
  ['#slider2 .app__slider', options[1], '#slider2 .app__control'],
  ['#slider3 .app__slider', options[2], '#slider3 .app__control'],
  ['#slider4 .app__slider', options[3], '#slider4 .app__control'],
];

dataArray.forEach((data) => {
  const slider = $(`${data[0]}`).slider(data[1]);
  const firstContainer = $(`${data[2]}`)[0];
  if (slider) {
    new Controller({
      container: firstContainer,
      slider: slider,
    });
  }
});
