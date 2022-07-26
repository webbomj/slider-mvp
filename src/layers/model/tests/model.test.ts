import { EventName, ModelAction } from "../../interfaces/interfaces";
import Model from "../model";

describe("Model", () => {
  const options = {
    min: -10,
    max: -2,
    from: -10,
    to: -8,
    step: 2,
    isVertical: true,
    isInterval: true,
    isLabel: true,
    isScale: true,
    isProgressBar: true,
  };
  const model = new Model(options);
  const state = () => model.getState();

  const sub = {
    eventName: EventName.modelWasUpdate,
    function: (e: PointerEvent) => console.log(e),
  };

  test("getState should return state", () => {
    expect(model.getState()).toEqual(options);
  });
  test("getState should update MIN value", () => {
    const action = { type: ModelAction.setMinValue, payload: { value: 2 } };
    model.updateState(action);
    expect(state().min).toBe(2);
  });
  test("getState should update MAX value", () => {
    const action = { type: ModelAction.setMaxValue, payload: { value: 4 } };
    model.updateState(action);
    expect(state().max).toBe(4);
  });
  test("getState should update FROM value", () => {
    const action = { type: ModelAction.setFromValue, payload: { value: 6 } };
    model.updateState(action);
    expect(state().from).toBe(6);
  });
  test("getState should update TO value", () => {
    const action = { type: ModelAction.setToValue, payload: { value: 2 } };
    model.updateState(action);
    expect(state().to).toBe(2);
  });
  test("getState should update STEP value", () => {
    const action = { type: ModelAction.setStep, payload: { value: 1 } };
    model.updateState(action);
    expect(state().step).toBe(1);
  });
  test("getState should update INTERVAL value", () => {
    const action = {
      type: ModelAction.setIsInterval,
      payload: { value: false },
    };
    model.updateState(action);
    expect(state().isInterval).toBe(false);
  });
  test("getState should update LABEL value", () => {
    const action = { type: ModelAction.setIsLabel, payload: { value: false } };
    model.updateState(action);
    expect(state().isLabel).toBe(false);
  });
  test("getState should update ProgressBar value", () => {
    const action = {
      type: ModelAction.setIsProgressBar,
      payload: { value: false },
    };
    model.updateState(action);
    expect(state().isProgressBar).toBe(false);
  });
  test("getState should update Scale value", () => {
    const action = { type: ModelAction.setIsScale, payload: { value: false } };
    model.updateState(action);
    expect(state().isScale).toBe(false);
  });
  test("getState should update Vertical value", () => {
    const action = {
      type: ModelAction.setIsVertical,
      payload: { value: true },
    };
    model.updateState(action);
    expect(state().isVertical).toBe(true);
  });
  test("should subscribe to observer", () => {
    model.observer.subscribe = jest.fn((sub) => console.log(sub));
    model.subscribe = jest.fn((sub) => model.observer.subscribe(sub));
    model.subscribe(sub);
    expect(model.observer.subscribe).toBeCalled();
  });
  test("should notify to observer", () => {
    const action = {
      type: ModelAction.setIsVertical,
      payload: { value: true },
    };
    model.observer.notify = jest.fn((sub) => console.log(sub));
    model.updateState(action);

    expect(model.observer.notify).toBeCalled();
  });
});
