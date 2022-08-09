import {
  EventName,
  HandlePosition,
  ILineBlockOptions,
  ILineBlockProps,
  IModelOptions,
  IProgressBarOptions,
} from '../../../interfaces/interfaces';
import Observer from '../../../observer/observer';
import Handle from '../handle/handle';
import Label from '../label/label';
import ProgressBar from '../progressBar/progressBar';
import './lineBlock.scss';

class lineBlock {
  private container: HTMLElement;
  private state;
  private progressBar: ProgressBar;
  private labelTo: Label;
  private labelFrom: Label;
  private handleTo: Handle;
  private handleFrom: Handle;
  private observer: Observer;

  constructor(lineOptions: ILineBlockProps) {
    const { container, model, observer, options } = lineOptions;
    this.container = container;
    this.state = model;
    this.observer = observer;
    this.init(options);
  }

  private init = (options: ILineBlockOptions) => {
    const { progressBarWidth, shift, shiftFrom } = options;
    const lineBlock = document.createElement('div');
    const activeBlock = document.createElement('div');

    const { to, from } = this.state;

    lineBlock.classList.add('line-block');
    this.container.setAttribute(
      'data-isvertical',
      String(this.state.isVertical),
    );
    activeBlock.classList.add('line-block__active');
    lineBlock.addEventListener('pointerdown', (e) =>
      this.observer.notify({
        eventName: EventName.clickedLine,
        eventPayload: e,
      }),
    );

    if (this.state.isInterval) {
      this.handleTo = new Handle({
        container: activeBlock,
        shift: shift,
        observer: this.observer,
        handlePosition: HandlePosition.to,
        isVertical: this.state.isVertical,
      });
      if (this.state.isLabel) {
        this.labelTo = new Label({
          container: activeBlock,
          shift: shift,
          text: to,
          isVertical: this.state.isVertical,
        });
      }

      this.handleFrom = new Handle({
        container: activeBlock,
        shift: shiftFrom,
        observer: this.observer,
        handlePosition: HandlePosition.from,
        isVertical: this.state.isVertical,
      });

      if (this.state.isLabel) {
        this.labelFrom = new Label({
          container: activeBlock,
          shift: shiftFrom,
          text: from,
          isVertical: this.state.isVertical,
        });
      }
    } else {
      this.handleTo = new Handle({
        container: activeBlock,
        shift: shift,
        observer: this.observer,
        isVertical: this.state.isVertical,
      });
      if (this.state.isLabel) {
        this.labelTo = new Label({
          container: activeBlock,
          shift: shift,
          text: to,
          isVertical: this.state.isVertical,
        });
      }
    }

    lineBlock.append(activeBlock);

    const ProgressBarOptions: IProgressBarOptions = {
      container: lineBlock,
      shiftFrom: shiftFrom,
      width: progressBarWidth,
      isVertical: this.state.isVertical,
    };
    if (this.state.isProgressBar) {
      this.progressBar = new ProgressBar(ProgressBarOptions);
    }

    if (this.container) {
      this.container.append(lineBlock);
    }
  };

  public update = (model: IModelOptions, options: ILineBlockOptions) => {
    const { from, to, isInterval, isLabel, isVertical } = model;
    const { progressBarWidth, shift, shiftFrom } = options;

    if (isLabel) {
      this.labelTo.update(to, shift);
    }
    if (isInterval) {
      this.handleFrom.update(shiftFrom, isVertical);
      if (isLabel) {
        this.labelFrom.update(from, shiftFrom);
      }
    }
    if (isVertical) {
      this.handleTo.update(shift, isVertical);
    } else {
      this.handleTo.update(shift);
    }
    if (this.state.isProgressBar) {
      this.progressBar.update({
        shiftFrom: shiftFrom,
        width: progressBarWidth,
        isVertical: this.state.isVertical,
      });
    }
  };
}

export default lineBlock;
