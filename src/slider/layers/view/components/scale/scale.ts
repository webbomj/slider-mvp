import {
  EventName,
  IScaleOptions,
  IScaleProps,
} from '../../../interfaces/interfaces';
import Observer from '../../../observer/observer';
import './scale.scss';

class Scale {
  private arrayScale: number[];
  private container: HTMLElement;
  private shift: number;
  private observer: Observer;
  private isVertical: boolean;
  constructor({
    arrayScale,
    container,
    shift,
    observer,
    isVertical,
  }: IScaleOptions) {
    this.arrayScale = arrayScale;
    this.container = container;
    this.shift = shift;
    this.observer = observer;
    this.isVertical = isVertical;

    this.render();
  }

  private notify = (e: PointerEvent) => {
    this.observer.notify({
      eventName: EventName.clickedScaleItem,
      eventPayload: e,
    });
  };

  private render = () => {
    const scale = document.createElement('div');
    scale.classList.add('scale');
    this.arrayScale.forEach((el) => {
      let scaleNumber = this.createItem();
      if (this.isVertical) {
        scaleNumber.style.top = `${this.shift}`;
      } else {
        scaleNumber.style.left = `${this.shift}`;
      }
      scaleNumber.textContent = `${el}`;
      scaleNumber.addEventListener('pointerdown', (e) => this.notify(e));
      scale.appendChild(scaleNumber);
    });

    this.container.appendChild(scale);
    const scaleNode = this.container.querySelector('.scale');
    if (scaleNode) {
      // eslint-disable-next-line no-undef
      let scaleItemsNode: NodeListOf<HTMLDivElement> =
        scaleNode.querySelectorAll('.scale__item');
      let margin = 0;
      for (let index = 0; index < scaleItemsNode.length; index++) {
        if (margin > 100) {
          margin = 100;
        }
        if (this.isVertical) {
          scaleItemsNode[index].style.top = `${margin}%`;
        } else {
          scaleItemsNode[index].style.left = `${margin}%`;
        }

        margin += this.shift;
      }
      margin = 0;
    }
  };

  public update = ({ scale, shift }: IScaleProps) => {
    this.arrayScale = scale;
    this.shift = shift;
    const scaleContainer = this.container.querySelector('.scale');
    if (scaleContainer) {
      scaleContainer.remove();
    }
    this.render();
  };

  private createItem = () => {
    const scale = document.createElement('div');
    scale.classList.add('scale__item');
    return scale;
  };
}

export default Scale;
