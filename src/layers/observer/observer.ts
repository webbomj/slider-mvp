import { IEventObject, IObserver, ISubscriber } from "../interfaces/interfaces";

class Observer implements IObserver {
  public subscribers: ISubscriber[];
  constructor() {
    this.subscribers = [];
  }
  subscribe = (subscriber: ISubscriber): void => {
    this.subscribers.push(subscriber);
  };
  unsubscribe = (subscriber: ISubscriber): void => {
    this.subscribers = this.subscribers.filter((el) => el !== subscriber);
  };
  notify = (eventObject: IEventObject): void => {
    this.subscribers.forEach((el) =>
      el.eventName === eventObject.eventName
        ? el.function(eventObject.eventPayload)
        : null
    );
  };
}

export default Observer;
