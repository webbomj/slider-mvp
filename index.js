require("./index.css");

let $011f44674abf9d9e$export$b602256c1ce40551;
(function(ModelAction1) {
    ModelAction1[ModelAction1["setMinValue"] = 0] = "setMinValue";
    ModelAction1[ModelAction1["setMaxValue"] = 1] = "setMaxValue";
    ModelAction1[ModelAction1["setFromValue"] = 2] = "setFromValue";
    ModelAction1[ModelAction1["setToValue"] = 3] = "setToValue";
    ModelAction1[ModelAction1["setStep"] = 4] = "setStep";
    ModelAction1[ModelAction1["setIsVertical"] = 5] = "setIsVertical";
    ModelAction1[ModelAction1["setIsInterval"] = 6] = "setIsInterval";
    ModelAction1[ModelAction1["setIsLabel"] = 7] = "setIsLabel";
    ModelAction1[ModelAction1["setIsProgressBar"] = 8] = "setIsProgressBar";
    ModelAction1[ModelAction1["setIsScale"] = 9] = "setIsScale";
})($011f44674abf9d9e$export$b602256c1ce40551 || ($011f44674abf9d9e$export$b602256c1ce40551 = {}));
let $011f44674abf9d9e$export$8e49444f78fbbdb8;
(function(EventName1) {
    EventName1["clickedScaleItem"] = "clickedScaleItem";
    EventName1["modelWasUpdate"] = "modelWasUpdate";
    EventName1["clickedHandle"] = "clickedHandle";
    EventName1["clickedLine"] = "clickedLine";
})($011f44674abf9d9e$export$8e49444f78fbbdb8 || ($011f44674abf9d9e$export$8e49444f78fbbdb8 = {}));
let $011f44674abf9d9e$export$55c970c020dafcca;
(function(HandlePosition1) {
    HandlePosition1["from"] = "from";
    HandlePosition1["to"] = "to";
})($011f44674abf9d9e$export$55c970c020dafcca || ($011f44674abf9d9e$export$55c970c020dafcca = {}));



class $788a056e396713fc$var$Observer {
    constructor(){
        this.subscribers = [];
    }
    subscribe = (subscriber)=>{
        this.subscribers.push(subscriber);
    };
    unsubscribe = (subscriber)=>{
        this.subscribers = this.subscribers.filter((el)=>el !== subscriber);
    };
    notify = (eventObject)=>{
        this.subscribers.forEach((el)=>el.eventName === eventObject.eventName ? el.function(eventObject.eventPayload) : null);
    };
}
var $788a056e396713fc$export$2e2bcd8739ae039 = $788a056e396713fc$var$Observer;


class $c34cf42ef2ac4a49$export$2e2bcd8739ae039 {
    observer = new (0, $788a056e396713fc$export$2e2bcd8739ae039)();
    constructor(options){
        const { min: min , max: max , from: from , to: to , step: step , isVertical: isVertical , isInterval: isInterval , isLabel: isLabel , isScale: isScale , isProgressBar: isProgressBar ,  } = options;
        this.minValue = min;
        this.maxValue = max;
        this.fromValue = from;
        this.toValue = to;
        this.step = step;
        this.isVertical = isVertical;
        this.isInterval = isInterval;
        this.isLabel = isLabel;
        this.isScale = isScale;
        this.isProgressBar = isProgressBar;
    }
    updateState = ({ type: type , payload: payload  })=>{
        if (typeof payload.value === "number") {
            switch(type){
                case (0, $011f44674abf9d9e$export$b602256c1ce40551).setMinValue:
                    this.minValue = payload.value;
                    break;
                case (0, $011f44674abf9d9e$export$b602256c1ce40551).setMaxValue:
                    this.maxValue = payload.value;
                    break;
                case (0, $011f44674abf9d9e$export$b602256c1ce40551).setFromValue:
                    this.fromValue = payload.value;
                    break;
                case (0, $011f44674abf9d9e$export$b602256c1ce40551).setToValue:
                    this.toValue = payload.value;
                    break;
                case (0, $011f44674abf9d9e$export$b602256c1ce40551).setStep:
                    this.step = payload.value;
                    break;
                default:
                    break;
            }
            this.observer.notify({
                eventName: (0, $011f44674abf9d9e$export$8e49444f78fbbdb8).modelWasUpdate,
                eventPayload: this.getState()
            });
        } else if (typeof payload.value === "boolean") {
            switch(type){
                case (0, $011f44674abf9d9e$export$b602256c1ce40551).setIsVertical:
                    this.isVertical = payload.value;
                    break;
                case (0, $011f44674abf9d9e$export$b602256c1ce40551).setIsInterval:
                    this.isInterval = payload.value;
                    break;
                case (0, $011f44674abf9d9e$export$b602256c1ce40551).setIsLabel:
                    this.isLabel = payload.value;
                    break;
                case (0, $011f44674abf9d9e$export$b602256c1ce40551).setIsProgressBar:
                    this.isProgressBar = payload.value;
                    break;
                case (0, $011f44674abf9d9e$export$b602256c1ce40551).setIsScale:
                    this.isScale = payload.value;
                    break;
                default:
                    break;
            }
            this.observer.notify({
                eventName: (0, $011f44674abf9d9e$export$8e49444f78fbbdb8).modelWasUpdate,
                eventPayload: this.getState()
            });
        }
        console.log(type, payload.value);
    };
    subscribe = (subscriber)=>{
        this.observer.subscribe(subscriber);
    };
    getState = ()=>{
        return {
            from: this.fromValue,
            isInterval: this.isInterval,
            isLabel: this.isLabel,
            isProgressBar: this.isProgressBar,
            isScale: this.isScale,
            isVertical: this.isVertical,
            max: this.maxValue,
            min: this.minValue,
            step: this.step,
            to: this.toValue
        };
    };
}





class $4ac9eb3ff565d569$var$Handle {
    constructor({ container: container , shift: shift , observer: observer , handlePosition: handlePosition , isVertical: isVertical  }){
        this.container = container;
        this.shift = shift;
        this.observer = observer;
        this.handlePosition = handlePosition;
        this.render();
        this.update(this.shift, isVertical);
    }
    render = ()=>{
        const handle = document.createElement("div");
        handle.classList.add("lineBlock__handler");
        if (this.handlePosition) handle.dataset.handle = this.handlePosition;
        this.handle = handle;
        this.container.append(handle);
        this.handle.addEventListener("pointerdown", (e)=>this.clickHandler(e));
    };
    clickHandler = (event)=>{
        this.observer.notify({
            eventName: (0, $011f44674abf9d9e$export$8e49444f78fbbdb8).clickedHandle,
            eventPayload: event
        });
    };
    update = (value, isVertical = false)=>{
        this.shift = value;
        if (isVertical) this.handle.style.top = `${this.shift}%`;
        else this.handle.style.left = `${this.shift}%`;
    };
}
var $4ac9eb3ff565d569$export$2e2bcd8739ae039 = $4ac9eb3ff565d569$var$Handle;


class $cbbf66bbd2f9abb6$var$Label {
    constructor({ container: container , shift: shift , text: text , observer: observer , isVertical: isVertical  }){
        this.container = container;
        this.shift = shift;
        this.isVertical = isVertical;
        this.observer = observer;
        const label = document.createElement("div");
        this.label = label;
        this.render();
        this.update(text, this.shift);
    }
    render = ()=>{
        this.label.classList.add("lineBlock__label");
        this.container.append(this.label);
    };
    update = (value, shift)=>{
        this.label.textContent = `${value}`;
        this.shift = shift;
        if (this.isVertical) this.label.style.top = `${this.shift}%`;
        else this.label.style.left = `${this.shift}%`;
    };
}
var $cbbf66bbd2f9abb6$export$2e2bcd8739ae039 = $cbbf66bbd2f9abb6$var$Label;


class $bc1b31fc4af19562$var$ProgressBar {
    constructor({ container: container , shiftFrom: shiftFrom , width: width , observer: observer , isVertical: isVertical  }){
        this.container = container;
        this.shiftFrom = shiftFrom;
        this.isVertical = isVertical;
        this.width = width;
        this.observer = observer;
        this.render(this.container);
    }
    render = (container)=>{
        const progressBar = document.createElement("div");
        progressBar.classList.add("lineBlock__progressBar");
        container.appendChild(progressBar);
        this.update({
            shiftFrom: this.shiftFrom,
            width: this.width,
            isVertical: this.isVertical
        });
    };
    update = ({ shiftFrom: shiftFrom , width: width , isVertical: isVertical  })=>{
        this.shiftFrom = shiftFrom;
        this.width = width;
        const progressBarNode = this.container.querySelector(".lineBlock__progressBar");
        if (progressBarNode) {
            if (isVertical) {
                progressBarNode.style.top = `${this.shiftFrom}%`;
                progressBarNode.style.height = `${this.width}%`;
            } else {
                progressBarNode.style.left = `${this.shiftFrom}%`;
                progressBarNode.style.width = `${this.width}%`;
            }
        }
    };
}
var $bc1b31fc4af19562$export$2e2bcd8739ae039 = $bc1b31fc4af19562$var$ProgressBar;



class $90252634f4780cbf$var$lineBlock {
    constructor(lineOptions){
        const { container: container , model: model , observer: observer , options: options  } = lineOptions;
        this.container = container;
        this.state = model;
        this.observer = observer;
        this.init(options);
    }
    init = (options)=>{
        const { progressBarWidth: progressBarWidth , shift: shift , shiftFrom: shiftFrom  } = options;
        const lineBlock1 = document.createElement("div");
        const activeBlock = document.createElement("div");
        const { to: to , from: from  } = this.state;
        lineBlock1.classList.add("lineBlock");
        lineBlock1.setAttribute("data-isvertical", String(this.state.isVertical));
        activeBlock.classList.add("lineBlock__active");
        lineBlock1.addEventListener("pointerdown", (e)=>this.observer.notify({
                eventName: (0, $011f44674abf9d9e$export$8e49444f78fbbdb8).clickedLine,
                eventPayload: e
            }));
        if (this.state.isInterval) {
            this.handleTo = new (0, $4ac9eb3ff565d569$export$2e2bcd8739ae039)({
                container: activeBlock,
                shift: shift,
                observer: this.observer,
                handlePosition: (0, $011f44674abf9d9e$export$55c970c020dafcca).to,
                isVertical: this.state.isVertical
            });
            if (this.state.isLabel) this.labelTo = new (0, $cbbf66bbd2f9abb6$export$2e2bcd8739ae039)({
                container: activeBlock,
                shift: shift,
                text: to,
                observer: this.observer,
                isVertical: this.state.isVertical
            });
            this.handleFrom = new (0, $4ac9eb3ff565d569$export$2e2bcd8739ae039)({
                container: activeBlock,
                shift: shiftFrom,
                observer: this.observer,
                handlePosition: (0, $011f44674abf9d9e$export$55c970c020dafcca).from,
                isVertical: this.state.isVertical
            });
            if (this.state.isLabel) this.labelFrom = new (0, $cbbf66bbd2f9abb6$export$2e2bcd8739ae039)({
                container: activeBlock,
                shift: shiftFrom,
                text: from,
                observer: this.observer,
                isVertical: this.state.isVertical
            });
        } else {
            this.handleTo = new (0, $4ac9eb3ff565d569$export$2e2bcd8739ae039)({
                container: activeBlock,
                shift: shift,
                observer: this.observer,
                isVertical: this.state.isVertical
            });
            if (this.state.isLabel) this.labelTo = new (0, $cbbf66bbd2f9abb6$export$2e2bcd8739ae039)({
                container: activeBlock,
                shift: shift,
                text: to,
                observer: this.observer,
                isVertical: this.state.isVertical
            });
        }
        lineBlock1.append(activeBlock);
        const ProgressBarOptions = {
            container: lineBlock1,
            shiftFrom: shiftFrom,
            width: progressBarWidth,
            observer: this.observer,
            isVertical: this.state.isVertical
        };
        this.progressBar = new (0, $bc1b31fc4af19562$export$2e2bcd8739ae039)(ProgressBarOptions);
        if (this.container) this.container.append(lineBlock1);
    };
    update = (model, options)=>{
        const { from: from , to: to , isInterval: isInterval , isLabel: isLabel , isVertical: isVertical  } = model;
        const { progressBarWidth: progressBarWidth , shift: shift , shiftFrom: shiftFrom  } = options;
        if (isLabel) this.labelTo.update(to, shift);
        if (isInterval) {
            this.handleFrom.update(shiftFrom, isVertical);
            if (isLabel) this.labelFrom.update(from, shiftFrom);
        }
        if (isVertical) this.handleTo.update(shift, isVertical);
        else this.handleTo.update(shift);
        this.progressBar.update({
            shiftFrom: shiftFrom,
            width: progressBarWidth,
            isVertical: this.state.isVertical
        });
    };
}
var $90252634f4780cbf$export$2e2bcd8739ae039 = $90252634f4780cbf$var$lineBlock;




class $68615544c87dd0c7$var$Scale {
    constructor({ arrayScale: arrayScale , container: container , shift: shift , observer: observer , isVertical: isVertical  }){
        this.arrayScale = arrayScale;
        this.container = container;
        this.shift = shift;
        this.observer = observer;
        this.isVertical = isVertical;
        this.render();
    }
    notify = (e)=>{
        this.observer.notify({
            eventName: (0, $011f44674abf9d9e$export$8e49444f78fbbdb8).clickedScaleItem,
            eventPayload: e
        });
    };
    render = ()=>{
        const scale = document.createElement("div");
        scale.classList.add("scale");
        this.arrayScale.forEach((el)=>{
            let scaleNumber = this.createItem();
            if (this.isVertical) scaleNumber.style.top = `${this.shift}`;
            else scaleNumber.style.left = `${this.shift}`;
            scaleNumber.textContent = `${el}`;
            scaleNumber.addEventListener("pointerdown", (e)=>this.notify(e));
            scale.appendChild(scaleNumber);
        });
        this.container.appendChild(scale);
        const scaleNode = this.container.querySelector(".scale");
        if (scaleNode) {
            const scaleItemsNode = scaleNode.querySelectorAll(".scale__item");
            let margin = 0;
            for(let index = 0; index < scaleItemsNode.length; index++){
                if (margin > 100) margin = 100;
                if (this.isVertical) scaleItemsNode[index].style.top = `${margin}%`;
                else scaleItemsNode[index].style.left = `${margin}%`;
                margin += this.shift;
            }
            margin = 0;
        }
    };
    update = ({ scale: scale , shift: shift  })=>{
        this.arrayScale = scale;
        this.shift = shift;
        const scaleContainer = this.container.querySelector(".scale");
        if (scaleContainer) scaleContainer.remove();
        this.render();
    };
    createItem = ()=>{
        const scale = document.createElement("div");
        scale.classList.add("scale__item");
        return scale;
    };
}
var $68615544c87dd0c7$export$2e2bcd8739ae039 = $68615544c87dd0c7$var$Scale;


class $be7a4f0e0e2425a2$var$View {
    constructor({ options: options , container: container , scaleOptions: scaleOptions , lineBlockOptions: lineBlockOptions  }){
        this.container = container;
        this.options = options;
        this.observer = new (0, $788a056e396713fc$export$2e2bcd8739ae039)();
        this.isVertical = options.isVertical;
        this.init({
            scaleOptions: scaleOptions,
            lineBlockOptions: lineBlockOptions
        });
    }
    init = ({ scaleOptions: scaleOptions , lineBlockOptions: lineBlockOptions  })=>{
        this.slide = new (0, $90252634f4780cbf$export$2e2bcd8739ae039)({
            container: this.container,
            model: this.options,
            observer: this.observer,
            options: lineBlockOptions
        });
        if (this.options.isScale) {
            let scaleProps = {
                container: this.container,
                arrayScale: scaleOptions.scale,
                shift: scaleOptions.shift,
                observer: this.observer,
                isVertical: this.isVertical
            };
            this.scale = new (0, $68615544c87dd0c7$export$2e2bcd8739ae039)(scaleProps);
        }
    };
    updateView = ({ model: model , scaleProps: scaleProps , lineBlockOptions: lineBlockOptions  })=>{
        this.slide.update(model, lineBlockOptions);
        if (model.isScale) this.scale.update(scaleProps);
    };
    subscribe = (subscriber)=>{
        this.observer.subscribe(subscriber);
    };
}
var $be7a4f0e0e2425a2$export$2e2bcd8739ae039 = $be7a4f0e0e2425a2$var$View;


const $99722c52069e64ac$var$createArrScale = (min, max, step)=>{
    let arrayScale = [];
    for(let index = min; index <= max; index += step)arrayScale.push(index);
    if ((max - min) % step !== 0) arrayScale.push(max);
    return arrayScale;
};
const $99722c52069e64ac$export$2189da21f90e62b8 = ({ min: min , max: max , step: step  })=>{
    const scale = $99722c52069e64ac$var$createArrScale(min, max, step);
    const shift = 100 / (max - min) * step;
    return {
        scale: scale,
        shift: shift
    };
};


function $def6ce2d4bbf2cb9$export$39e042fd83f1b62e(elem) {
    let { left: left , width: width , top: top , height: height  } = elem.getBoundingClientRect();
    return {
        left: left + scrollX,
        width: width,
        top: top + scrollY,
        height: height
    };
}


//рассчитываем начальный отступ
const $9abda2e714fa50fc$export$9b30f0cdb0686178 = ({ min: min , current: current , max: max , step: step , isInterval: isInterval , handle: handle  })=>{
    if (!isInterval && handle === "from") return 0;
    const stepPercent = $9abda2e714fa50fc$export$c530c4cf008ea486({
        step: step,
        max: max,
        min: min
    });
    return (current - min) / step * stepPercent;
};
//рассчитываем шаг в процентах
const $9abda2e714fa50fc$export$c530c4cf008ea486 = ({ step: step , max: max , min: min  })=>{
    return 100 / ((max - min) / step);
};
//расчитываем ширину прогрессбара
const $9abda2e714fa50fc$export$a48c3925cf87ae41 = ({ step: step , max: max , min: min , to: to , from: from , isInterval: isInterval  })=>{
    const stepPercent = $9abda2e714fa50fc$export$c530c4cf008ea486({
        max: max,
        min: min,
        step: step
    });
    if (!isInterval) return (to - min) / step * stepPercent;
    return Math.abs(to - from) / step * stepPercent;
};
const $9abda2e714fa50fc$export$518720270a8efe11 = (model)=>{
    const { from: from , max: max , min: min , step: step , to: to , isInterval: isInterval  } = model;
    const shiftFrom = $9abda2e714fa50fc$export$9b30f0cdb0686178({
        current: from,
        max: max,
        min: min,
        step: step,
        isInterval: isInterval,
        handle: "from"
    });
    const shiftTo = $9abda2e714fa50fc$export$9b30f0cdb0686178({
        current: to,
        max: max,
        min: min,
        step: step,
        isInterval: isInterval,
        handle: "to"
    });
    const progressWidth = $9abda2e714fa50fc$export$a48c3925cf87ae41({
        from: from,
        max: max,
        min: min,
        step: step,
        to: to,
        isInterval: isInterval
    });
    return {
        shiftFrom: shiftFrom,
        shiftTo: shiftTo,
        progressWidth: progressWidth
    };
};


class $32b76c5f9c328857$var$Presenter {
    constructor({ options: options , container: container  }){
        const defaultOptions = {
            min: 0,
            max: 100,
            from: 20,
            to: 0,
            step: 1,
            isVertical: false,
            isInterval: false,
            isLabel: true,
            isScale: true,
            isProgressBar: true
        };
        this.container = container;
        const joinOptions = {
            ...defaultOptions,
            ...options
        };
        this.model = new (0, $c34cf42ef2ac4a49$export$2e2bcd8739ae039)(joinOptions);
        this.getState();
        const scaleOptions = this.createArrScale();
        const lineBlockOptions = this.createLineBlock();
        this.view = new (0, $be7a4f0e0e2425a2$export$2e2bcd8739ae039)({
            options: joinOptions,
            container: this.container,
            scaleOptions: scaleOptions,
            lineBlockOptions: lineBlockOptions
        });
        this.subscribe();
    }
    getState = ()=>{
        this.state = this.model.getState();
    };
    createLineBlock = ()=>{
        this.getState();
        const { progressWidth: progressWidth , shiftFrom: shiftFrom , shiftTo: shiftTo  } = (0, $9abda2e714fa50fc$export$518720270a8efe11)(this.state);
        return {
            progressBarWidth: progressWidth,
            shift: shiftTo,
            shiftFrom: shiftFrom
        };
    };
    createArrScale = ()=>{
        const { max: max , min: min , step: step  } = this.state;
        const { scale: scale , shift: shift  } = (0, $99722c52069e64ac$export$2189da21f90e62b8)({
            max: max,
            min: min,
            step: step
        });
        return {
            scale: scale,
            shift: shift
        };
    };
    clickedScaleItemHandler = (e)=>{
        this.getState();
        const newValue = +e.target?.textContent;
        const { from: from , to: to , isInterval: isInterval  } = this.state;
        if (isInterval) {
            const difFromNewValue = Math.abs(Math.abs(from) - Math.abs(newValue));
            const difToNewValue = Math.abs(Math.abs(to) - Math.abs(newValue));
            if (difToNewValue < difFromNewValue) this.model.updateState({
                type: (0, $011f44674abf9d9e$export$b602256c1ce40551).setToValue,
                payload: {
                    value: newValue
                }
            });
            else if (difToNewValue > difFromNewValue) this.model.updateState({
                type: (0, $011f44674abf9d9e$export$b602256c1ce40551).setFromValue,
                payload: {
                    value: newValue
                }
            });
            else if (difFromNewValue === difToNewValue) {
                if (newValue < to) this.model.updateState({
                    type: (0, $011f44674abf9d9e$export$b602256c1ce40551).setFromValue,
                    payload: {
                        value: newValue
                    }
                });
                else this.model.updateState({
                    type: (0, $011f44674abf9d9e$export$b602256c1ce40551).setToValue,
                    payload: {
                        value: newValue
                    }
                });
            }
        } else this.model.updateState({
            type: (0, $011f44674abf9d9e$export$b602256c1ce40551).setToValue,
            payload: {
                value: newValue
            }
        });
    };
    clickedLineHandler = (event)=>{
        const { max: max , min: min , step: step , isInterval: isInterval , isVertical: isVertical , to: to , from: from  } = this.state;
        let slider = this.container.querySelector(".lineBlock");
        let progressbar = this.container.querySelector(".lineBlock__progressBar");
        if (event.target !== progressbar && event.target !== slider) return false;
        let sliderCoords = (0, $def6ce2d4bbf2cb9$export$39e042fd83f1b62e)(slider);
        let left = (event.pageY - sliderCoords.top) / sliderCoords.height * 100;
        if (!isVertical) left = (event.pageX - sliderCoords.left) / sliderCoords.width * 100;
        if (left < 0) left = 0;
        if (left > 100) left = 100;
        let stepCount = (max - min) / step;
        let stepPercent = 100 / stepCount;
        let stepLeft = left / stepPercent * stepPercent;
        if (stepLeft < 0) stepLeft = 0;
        if (stepLeft > 100) stepLeft = 100;
        let result = Number((stepLeft / stepPercent * step).toFixed());
        let value = result + min;
        if (isInterval) {
            const difFromNewValue = Math.abs(Math.abs(from) - Math.abs(value));
            const difToNewValue = Math.abs(Math.abs(to) - Math.abs(value));
            if (difToNewValue < difFromNewValue) this.model.updateState({
                type: (0, $011f44674abf9d9e$export$b602256c1ce40551).setToValue,
                payload: {
                    value: value
                }
            });
            else if (difToNewValue > difFromNewValue) this.model.updateState({
                type: (0, $011f44674abf9d9e$export$b602256c1ce40551).setFromValue,
                payload: {
                    value: value
                }
            });
            else if (difFromNewValue === difToNewValue) {
                if (value < to) this.model.updateState({
                    type: (0, $011f44674abf9d9e$export$b602256c1ce40551).setFromValue,
                    payload: {
                        value: value
                    }
                });
                else this.model.updateState({
                    type: (0, $011f44674abf9d9e$export$b602256c1ce40551).setToValue,
                    payload: {
                        value: value
                    }
                });
            }
        } else this.model.updateState({
            type: (0, $011f44674abf9d9e$export$b602256c1ce40551).setToValue,
            payload: {
                value: value
            }
        });
    };
    clickedHandleHandler = (event)=>{
        const { max: max , min: min , step: step , isInterval: isInterval , isVertical: isVertical , to: to , from: from  } = this.state;
        let sliderSpan = event.target;
        let slider = this.container.querySelector(".lineBlock");
        if (to === min && from === min) {
            sliderSpan = this.container.querySelector("[data-handle=to]");
            console.log(sliderSpan);
        }
        let position = sliderSpan?.dataset.handle;
        let sliderCoords = (0, $def6ce2d4bbf2cb9$export$39e042fd83f1b62e)(slider);
        let sliderSpanCoords = (0, $def6ce2d4bbf2cb9$export$39e042fd83f1b62e)(sliderSpan);
        let shift = event.pageX - sliderSpanCoords.left;
        if (isVertical) shift = event.pageY - sliderSpanCoords.top;
        const mouseMoveHandler = (evt)=>handleMove(evt);
        document.addEventListener("pointermove", mouseMoveHandler);
        //Начнем движение ползунка
        const handleMove = (evt)=>{
            let left = (evt.pageX - shift - sliderCoords.left) / sliderCoords.width * 100;
            if (isVertical) left = (evt.pageY - shift - sliderCoords.top) / sliderCoords.height * 100;
            if (left < 0) left = 0;
            if (left > 100) left = 100;
            //Шаг слайдера
            let stepCount = (max - min) / step;
            let stepPercent = 100 / stepCount;
            let stepLeft = left / stepPercent * stepPercent;
            if (stepLeft < 0) stepLeft = 0;
            if (stepLeft > 100) stepLeft = 100;
            //Расчитаем значение равное шагу слайдера
            let result = Number((stepLeft / stepPercent * step).toFixed());
            let value = result + min;
            if (isInterval) {
                if (position === (0, $011f44674abf9d9e$export$55c970c020dafcca).to) {
                    if (value < this.state.from) value = this.state.from;
                    this.model.updateState({
                        type: (0, $011f44674abf9d9e$export$b602256c1ce40551).setToValue,
                        payload: {
                            value: value
                        }
                    });
                } else if (position === (0, $011f44674abf9d9e$export$55c970c020dafcca).from) {
                    if (value > this.state.to) value = this.state.to;
                    this.model.updateState({
                        type: (0, $011f44674abf9d9e$export$b602256c1ce40551).setFromValue,
                        payload: {
                            value: value
                        }
                    });
                }
            } else this.model.updateState({
                type: (0, $011f44674abf9d9e$export$b602256c1ce40551).setToValue,
                payload: {
                    value: value
                }
            });
        };
        document.addEventListener("pointerup", function() {
            document.removeEventListener("pointermove", mouseMoveHandler);
        });
    };
    modelWasUpdate = (model)=>{
        this.getState();
        const scaleProps = this.createArrScale();
        const lineBlockOptions = this.createLineBlock();
        this.view.updateView({
            model: model,
            scaleProps: scaleProps,
            lineBlockOptions: lineBlockOptions
        });
    };
    subscribe = ()=>{
        this.view.subscribe({
            eventName: (0, $011f44674abf9d9e$export$8e49444f78fbbdb8).clickedScaleItem,
            function: this.clickedScaleItemHandler
        });
        this.view.subscribe({
            eventName: (0, $011f44674abf9d9e$export$8e49444f78fbbdb8).clickedHandle,
            function: this.clickedHandleHandler
        });
        this.view.subscribe({
            eventName: (0, $011f44674abf9d9e$export$8e49444f78fbbdb8).clickedLine,
            function: this.clickedLineHandler
        });
        // model sub
        this.model.subscribe({
            eventName: (0, $011f44674abf9d9e$export$8e49444f78fbbdb8).modelWasUpdate,
            function: this.modelWasUpdate
        });
    };
}
var $32b76c5f9c328857$export$2e2bcd8739ae039 = $32b76c5f9c328857$var$Presenter;


const $882b6d93070905b3$var$defaultOptions = {
    min: 0,
    max: 19,
    from: 3,
    to: 9,
    step: 3,
    isVertical: false,
    isInterval: true,
    isLabel: true,
    isScale: true,
    isProgressBar: true
};
const $882b6d93070905b3$var$container = document.getElementById("app");
if ($882b6d93070905b3$var$container) {
    const app = new (0, $32b76c5f9c328857$export$2e2bcd8739ae039)({
        container: $882b6d93070905b3$var$container,
        options: $882b6d93070905b3$var$defaultOptions
    });
    console.log(app);
}


//# sourceMappingURL=index.js.map
