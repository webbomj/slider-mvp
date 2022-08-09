import { EventName } from '../../interfaces/interfaces';
import Observer from '../observer';

describe('observer', () => {
  jest.mock('../observer');
  const subscriber1Fn = jest.fn(() => 'start');
  let observer: Observer;
  const subscriber = {
    eventName: EventName.clickedHandle,
    function: subscriber1Fn,
  };
  const subscriber2Fn = jest.fn(() => 'start');
  const subscriber2 = {
    eventName: EventName.clickedLine,
    function: subscriber2Fn,
  };

  const model = {
    min: 10,
    max: 10,
    from: 0,
    to: 2,
    step: 2,
    stepScale: 2,
    isVertical: true,
    isInterval: true,
    isLabel: true,
    isScale: true,
    isProgressBar: true,
  };

  beforeEach(() => {
    observer = new Observer();
  });

  test('should has subscribers value', () => {
    expect(observer.subscribers).toEqual([]);
  });

  test('should subscribe', () => {
    observer.subscribe(subscriber);
    expect(observer.subscribers).toEqual([subscriber]);
  });

  test('should unsubscribe', () => {
    observer.unsubscribe(subscriber);
    expect(observer.subscribers).toEqual([]);
  });

  test('should notify', () => {
    observer.subscribe(subscriber2);
    observer.notify({
      eventName: EventName.clickedLine,
      eventPayload: model,
    });

    expect(subscriber2Fn).toBeCalled();
  });
});
