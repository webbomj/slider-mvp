import "./slider.css";
import $jcTte$jquery from "jquery";


let $fa1e69341aa3f470$export$b602256c1ce40551;
(function(ModelAction1) {
    ModelAction1[ModelAction1["setMinValue"] = 0] = "setMinValue";
    ModelAction1[ModelAction1["setMaxValue"] = 1] = "setMaxValue";
    ModelAction1[ModelAction1["setFromValue"] = 2] = "setFromValue";
    ModelAction1[ModelAction1["setToValue"] = 3] = "setToValue";
    ModelAction1[ModelAction1["setStep"] = 4] = "setStep";
    ModelAction1[ModelAction1["setStepScale"] = 5] = "setStepScale";
    ModelAction1[ModelAction1["setIsVertical"] = 6] = "setIsVertical";
    ModelAction1[ModelAction1["setIsInterval"] = 7] = "setIsInterval";
    ModelAction1[ModelAction1["setIsLabel"] = 8] = "setIsLabel";
    ModelAction1[ModelAction1["setIsProgressBar"] = 9] = "setIsProgressBar";
    ModelAction1[ModelAction1["setIsScale"] = 10] = "setIsScale";
    ModelAction1[ModelAction1["setFullState"] = 11] = "setFullState";
})($fa1e69341aa3f470$export$b602256c1ce40551 || ($fa1e69341aa3f470$export$b602256c1ce40551 = {}));
let $fa1e69341aa3f470$export$8e49444f78fbbdb8;
(function(EventName1) {
    EventName1["clickedScaleItem"] = "clickedScaleItem";
    EventName1["modelWasUpdate"] = "modelWasUpdate";
    EventName1["clickedHandle"] = "clickedHandle";
    EventName1["clickedLine"] = "clickedLine";
    EventName1["sliderChange"] = "sliderChange";
})($fa1e69341aa3f470$export$8e49444f78fbbdb8 || ($fa1e69341aa3f470$export$8e49444f78fbbdb8 = {}));
let $fa1e69341aa3f470$export$55c970c020dafcca;
(function(HandlePosition1) {
    HandlePosition1["from"] = "from";
    HandlePosition1["to"] = "to";
})($fa1e69341aa3f470$export$55c970c020dafcca || ($fa1e69341aa3f470$export$55c970c020dafcca = {}));



class $d658d5d95c43ecaf$var$Observer {
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
var $d658d5d95c43ecaf$export$2e2bcd8739ae039 = $d658d5d95c43ecaf$var$Observer;


class $695bf388199b8e7c$export$2e2bcd8739ae039 {
    observer = new (0, $d658d5d95c43ecaf$export$2e2bcd8739ae039)();
    constructor(options){
        const { min: min , max: max , from: from , to: to , step: step , stepScale: stepScale , isVertical: isVertical , isInterval: isInterval , isLabel: isLabel , isScale: isScale , isProgressBar: isProgressBar ,  } = options;
        this.minValue = min;
        this.maxValue = max;
        this.fromValue = from;
        this.toValue = to;
        this.step = step;
        this.stepScale = stepScale;
        this.isVertical = isVertical;
        this.isInterval = isInterval;
        this.isLabel = isLabel;
        this.isScale = isScale;
        this.isProgressBar = isProgressBar;
    }
    updateState = ({ type: type , payload: payload  })=>{
        if (typeof payload.value === "number") {
            switch(type){
                case (0, $fa1e69341aa3f470$export$b602256c1ce40551).setMinValue:
                    this.minValue = payload.value;
                    break;
                case (0, $fa1e69341aa3f470$export$b602256c1ce40551).setMaxValue:
                    this.maxValue = payload.value;
                    break;
                case (0, $fa1e69341aa3f470$export$b602256c1ce40551).setFromValue:
                    this.fromValue = payload.value;
                    break;
                case (0, $fa1e69341aa3f470$export$b602256c1ce40551).setToValue:
                    this.toValue = payload.value;
                    break;
                case (0, $fa1e69341aa3f470$export$b602256c1ce40551).setStep:
                    this.step = payload.value;
                    break;
                case (0, $fa1e69341aa3f470$export$b602256c1ce40551).setStepScale:
                    this.stepScale = payload.value;
                    break;
                default:
                    break;
            }
            this.observer.notify({
                eventName: (0, $fa1e69341aa3f470$export$8e49444f78fbbdb8).modelWasUpdate,
                eventPayload: this.getState()
            });
        } else if (typeof payload.value === "boolean") {
            switch(type){
                case (0, $fa1e69341aa3f470$export$b602256c1ce40551).setIsVertical:
                    this.isVertical = payload.value;
                    break;
                case (0, $fa1e69341aa3f470$export$b602256c1ce40551).setIsInterval:
                    this.isInterval = payload.value;
                    break;
                case (0, $fa1e69341aa3f470$export$b602256c1ce40551).setIsLabel:
                    this.isLabel = payload.value;
                    break;
                case (0, $fa1e69341aa3f470$export$b602256c1ce40551).setIsProgressBar:
                    this.isProgressBar = payload.value;
                    break;
                case (0, $fa1e69341aa3f470$export$b602256c1ce40551).setIsScale:
                    this.isScale = payload.value;
                    break;
                default:
                    break;
            }
            this.observer.notify({
                eventName: (0, $fa1e69341aa3f470$export$8e49444f78fbbdb8).modelWasUpdate,
                eventPayload: this.getState()
            });
        } else if (typeof payload.value === "object") {
            switch(type){
                case (0, $fa1e69341aa3f470$export$b602256c1ce40551).setFullState:
                    this.minValue = payload.value.min;
                    this.maxValue = payload.value.max;
                    this.fromValue = payload.value.from;
                    this.toValue = payload.value.to;
                    this.step = payload.value.step;
                    this.stepScale = payload.value.stepScale;
                    this.isVertical = payload.value.isVertical;
                    this.isInterval = payload.value.isInterval;
                    this.isLabel = payload.value.isLabel;
                    this.isScale = payload.value.isScale;
                    this.isProgressBar = payload.value.isProgressBar;
                    break;
                default:
                    break;
            }
            this.observer.notify({
                eventName: (0, $fa1e69341aa3f470$export$8e49444f78fbbdb8).modelWasUpdate,
                eventPayload: this.getState()
            });
        }
    };
    subscribe = (subscriber)=>{
        this.observer.subscribe(subscriber);
    };
    getState = ()=>({
            from: this.fromValue,
            isInterval: this.isInterval,
            isLabel: this.isLabel,
            isProgressBar: this.isProgressBar,
            isScale: this.isScale,
            isVertical: this.isVertical,
            max: this.maxValue,
            min: this.minValue,
            step: this.step,
            stepScale: this.stepScale,
            to: this.toValue
        });
}






class $cabb71a71e884264$var$Handle {
    constructor({ container: container , shift: shift , observer: observer , handlePosition: handlePosition , isVertical: isVertical  }){
        this.container = container;
        this.shift = shift;
        this.observer = observer;
        this.handlePosition = handlePosition;
        this.isVertical = isVertical;
        this.render();
    }
    render = ()=>{
        const handle = document.createElement("div");
        handle.classList.add("handler");
        if (this.handlePosition) handle.dataset.handle = this.handlePosition;
        this.handle = handle;
        this.container.append(handle);
        this.handle.addEventListener("pointerdown", (e)=>this.handleHandleClick(e));
        this.update(this.shift, this.isVertical);
    };
    handleHandleClick = (event)=>{
        this.observer.notify({
            eventName: (0, $fa1e69341aa3f470$export$8e49444f78fbbdb8).clickedHandle,
            eventPayload: event
        });
    };
    update = (value, isVertical = false)=>{
        this.shift = value;
        this.isVertical = isVertical;
        if (this.isVertical) this.handle.style.top = `${this.shift}%`;
        else this.handle.style.left = `${this.shift}%`;
    };
}
var $cabb71a71e884264$export$2e2bcd8739ae039 = $cabb71a71e884264$var$Handle;



class $0eab36f36c7ad585$var$Label {
    constructor({ container: container , shift: shift , text: text , isVertical: isVertical  }){
        this.container = container;
        this.shift = shift;
        this.text = text;
        this.isVertical = isVertical;
        const label = document.createElement("div");
        this.label = label;
        this.render();
    }
    render = ()=>{
        this.label.classList.add("label");
        this.container.append(this.label);
        this.update(this.text, this.shift);
    };
    update = (value, shift)=>{
        this.text = value;
        this.label.textContent = `${this.text}`;
        this.shift = shift;
        if (this.isVertical) this.label.style.top = `${this.shift}%`;
        else this.label.style.left = `${this.shift}%`;
    };
}
var $0eab36f36c7ad585$export$2e2bcd8739ae039 = $0eab36f36c7ad585$var$Label;



class $4fb0487ecb9e1b8c$var$ProgressBar {
    constructor({ container: container , shiftFrom: shiftFrom , width: width , isVertical: isVertical  }){
        this.container = container;
        this.shiftFrom = shiftFrom;
        this.isVertical = isVertical;
        this.width = width;
        this.render(this.container);
    }
    render = (container)=>{
        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
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
        const progressBarNode = this.container.querySelector(".progress-bar");
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
var $4fb0487ecb9e1b8c$export$2e2bcd8739ae039 = $4fb0487ecb9e1b8c$var$ProgressBar;



class $7027396949932dc9$var$LineBlock {
    constructor(lineOptions){
        const { container: container , model: model , observer: observer , options: options  } = lineOptions;
        this.container = container;
        this.state = model;
        this.observer = observer;
        this.init(options);
    }
    init = (options)=>{
        const { progressBarWidth: progressBarWidth , shift: shift , shiftFrom: shiftFrom  } = options;
        const lineBlock = document.createElement("div");
        const activeBlock = document.createElement("div");
        const { to: to , from: from  } = this.state;
        lineBlock.classList.add("line-block");
        this.container.setAttribute("data-isvertical", String(this.state.isVertical));
        activeBlock.classList.add("line-block__active");
        lineBlock.addEventListener("pointerdown", (e)=>this.observer.notify({
                eventName: (0, $fa1e69341aa3f470$export$8e49444f78fbbdb8).clickedLine,
                eventPayload: e
            }));
        if (this.state.isInterval) {
            this.handleTo = new (0, $cabb71a71e884264$export$2e2bcd8739ae039)({
                container: activeBlock,
                shift: shift,
                observer: this.observer,
                handlePosition: (0, $fa1e69341aa3f470$export$55c970c020dafcca).to,
                isVertical: this.state.isVertical
            });
            if (this.state.isLabel) this.labelTo = new (0, $0eab36f36c7ad585$export$2e2bcd8739ae039)({
                container: activeBlock,
                shift: shift,
                text: to,
                isVertical: this.state.isVertical
            });
            this.handleFrom = new (0, $cabb71a71e884264$export$2e2bcd8739ae039)({
                container: activeBlock,
                shift: shiftFrom,
                observer: this.observer,
                handlePosition: (0, $fa1e69341aa3f470$export$55c970c020dafcca).from,
                isVertical: this.state.isVertical
            });
            if (this.state.isLabel) this.labelFrom = new (0, $0eab36f36c7ad585$export$2e2bcd8739ae039)({
                container: activeBlock,
                shift: shiftFrom,
                text: from,
                isVertical: this.state.isVertical
            });
        } else {
            this.handleTo = new (0, $cabb71a71e884264$export$2e2bcd8739ae039)({
                container: activeBlock,
                shift: shift,
                observer: this.observer,
                isVertical: this.state.isVertical
            });
            if (this.state.isLabel) this.labelTo = new (0, $0eab36f36c7ad585$export$2e2bcd8739ae039)({
                container: activeBlock,
                shift: shift,
                text: to,
                isVertical: this.state.isVertical
            });
        }
        lineBlock.append(activeBlock);
        const ProgressBarOptions = {
            container: lineBlock,
            shiftFrom: shiftFrom,
            width: progressBarWidth,
            isVertical: this.state.isVertical
        };
        if (this.state.isProgressBar) this.progressBar = new (0, $4fb0487ecb9e1b8c$export$2e2bcd8739ae039)(ProgressBarOptions);
        if (this.container) this.container.append(lineBlock);
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
        if (this.state.isProgressBar) this.progressBar.update({
            shiftFrom: shiftFrom,
            width: progressBarWidth,
            isVertical: this.state.isVertical
        });
    };
}
var $7027396949932dc9$export$2e2bcd8739ae039 = $7027396949932dc9$var$LineBlock;




class $94668a100972dedd$var$Scale {
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
            eventName: (0, $fa1e69341aa3f470$export$8e49444f78fbbdb8).clickedScaleItem,
            eventPayload: e
        });
    };
    render = ()=>{
        const scale = document.createElement("div");
        scale.classList.add("scale");
        this.arrayScale.forEach((el)=>{
            const scaleNumber = this.createItem();
            if (this.isVertical) scaleNumber.style.top = `${this.shift}`;
            else scaleNumber.style.left = `${this.shift}`;
            scaleNumber.textContent = `${el}`;
            scaleNumber.addEventListener("pointerdown", (e)=>this.notify(e));
            scale.appendChild(scaleNumber);
        });
        this.container.appendChild(scale);
        const scaleNode = this.container.querySelector(".scale");
        if (scaleNode) {
            // eslint-disable-next-line no-undef
            const scaleItemsNode = scaleNode.querySelectorAll(".scale__item");
            let margin = 0;
            for(let index = 0; index < scaleItemsNode.length; index += 1){
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
var $94668a100972dedd$export$2e2bcd8739ae039 = $94668a100972dedd$var$Scale;


class $7dbb4f7a292982bf$var$View {
    constructor({ options: options , container: container , scaleOptions: scaleOptions , lineBlockOptions: lineBlockOptions  }){
        this.container = container;
        this.options = options;
        this.observer = new (0, $d658d5d95c43ecaf$export$2e2bcd8739ae039)();
        this.isVertical = options.isVertical;
        this.init({
            scaleOptions: scaleOptions,
            lineBlockOptions: lineBlockOptions
        });
    }
    init = ({ scaleOptions: scaleOptions , lineBlockOptions: lineBlockOptions  })=>{
        this.slider = new (0, $7027396949932dc9$export$2e2bcd8739ae039)({
            container: this.container,
            model: this.options,
            observer: this.observer,
            options: lineBlockOptions
        });
        if (this.options.isScale) {
            const scaleProps = {
                container: this.container,
                arrayScale: scaleOptions.scale,
                shift: scaleOptions.shift,
                observer: this.observer,
                isVertical: this.isVertical
            };
            this.scale = new (0, $94668a100972dedd$export$2e2bcd8739ae039)(scaleProps);
        }
    };
    updateView = ({ model: model , scaleProps: scaleProps , lineBlockOptions: lineBlockOptions  })=>{
        this.slider.update(model, lineBlockOptions);
        if (model.isScale) this.scale.update(scaleProps);
    };
    subscribe = (subscriber)=>{
        this.observer.subscribe(subscriber);
    };
}
var $7dbb4f7a292982bf$export$2e2bcd8739ae039 = $7dbb4f7a292982bf$var$View;



const $cc66fd65ef2963b6$export$bccc105a1ec089d2 = (step)=>{
    const valuesEndNumber = String(step).split(".")[1];
    const valueFix = valuesEndNumber ? valuesEndNumber.length : 0;
    return valueFix;
};
const $cc66fd65ef2963b6$export$3a55dc44caeb213a = (min, max, step)=>{
    const arrayScale = [];
    for(let index = min; index <= max; index += step){
        const valuesFix = $cc66fd65ef2963b6$export$bccc105a1ec089d2(step);
        const fixedValue = Number(index.toFixed(valuesFix));
        if (index === min || index === max) arrayScale.push(index);
        else arrayScale.push(fixedValue);
    }
    if ((max - min) % step !== 0) arrayScale.push(max);
    return arrayScale;
};
const $cc66fd65ef2963b6$export$2189da21f90e62b8 = ({ min: min , max: max , step: step  })=>{
    const scale = $cc66fd65ef2963b6$export$3a55dc44caeb213a(min, max, step);
    const shift = 100 / (max - min) * step;
    return {
        scale: scale,
        shift: shift
    };
};


function $405f68f2ea1f0eac$export$39e042fd83f1b62e(elem) {
    const { left: left , width: width , top: top , height: height  } = elem.getBoundingClientRect();
    return {
        left: left + scrollX,
        width: width,
        top: top + scrollY,
        height: height
    };
}


// рассчитываем начальный отступ
const $beedda9cb4bde3a6$export$9b30f0cdb0686178 = ({ min: min , current: current , max: max , step: step , isInterval: isInterval , handle: handle  })=>{
    if (!isInterval && handle === "from") return 0;
    const stepPercent = $beedda9cb4bde3a6$export$c530c4cf008ea486({
        step: step,
        max: max,
        min: min
    });
    return (current - min) / step * stepPercent;
};
// рассчитываем шаг в процентах
const $beedda9cb4bde3a6$export$c530c4cf008ea486 = ({ step: step , max: max , min: min  })=>100 / ((max - min) / step);
// расчитываем ширину прогрессбара
const $beedda9cb4bde3a6$export$a48c3925cf87ae41 = ({ step: step , max: max , min: min , to: to , from: from , isInterval: isInterval  })=>{
    const stepPercent = $beedda9cb4bde3a6$export$c530c4cf008ea486({
        max: max,
        min: min,
        step: step
    });
    if (!isInterval) return (to - min) / step * stepPercent;
    return Math.abs(to - from) / step * stepPercent;
};
const $beedda9cb4bde3a6$export$518720270a8efe11 = (model)=>{
    const { from: from , max: max , min: min , step: step , to: to , isInterval: isInterval  } = model;
    const shiftFrom = $beedda9cb4bde3a6$export$9b30f0cdb0686178({
        current: from,
        max: max,
        min: min,
        step: step,
        isInterval: isInterval,
        handle: "from"
    });
    const shiftTo = $beedda9cb4bde3a6$export$9b30f0cdb0686178({
        current: to,
        max: max,
        min: min,
        step: step,
        isInterval: isInterval,
        handle: "to"
    });
    const progressWidth = $beedda9cb4bde3a6$export$a48c3925cf87ae41({
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


const $ddecd9c9a59745c6$var$defaultOptions = {
    min: 0,
    max: 100,
    from: 20,
    to: 30,
    step: 1,
    stepScale: 1,
    isVertical: false,
    isInterval: false,
    isLabel: true,
    isScale: true,
    isProgressBar: true
};
const $ddecd9c9a59745c6$export$235a19972c8b27b4 = (model)=>{
    const fullModel = {
        ...$ddecd9c9a59745c6$var$defaultOptions,
        ...model
    };
    const { max: max , min: min , step: step , from: from , to: to  } = fullModel;
    const validateWidthMoreThenStep = Math.abs(max - min) >= step;
    const validateFromLessThenMin = from >= min;
    const validateToLessThenMax = to <= max;
    const validateFromLessTo = from <= to;
    const stepMoreThenZero = step > 0;
    let isValid = false;
    let errorMessage = "";
    try {
        if (!validateWidthMoreThenStep) throw Error("The difference between the maximum and minimum value must be equal to or greater than the step");
        if (!validateFromLessThenMin) throw Error("The starting point of the start slider must be less than or equal to the slider's minimum value");
        if (!validateToLessThenMax) throw Error("The ending point of the start slider must be less than or equal to the slider's maximum value");
        if (!validateFromLessTo) throw Error("From point must be less or equal To point");
        if (!stepMoreThenZero) throw Error("Step should be more then 0");
        isValid = true;
    } catch (e) {
        errorMessage = e.message;
        isValid = false;
    } finally{
        return [
            isValid,
            errorMessage
        ];
    }
};


class $21ffd6a8b67d9721$var$Presenter {
    constructor({ options: options , container: container  }){
        this.observer = new (0, $d658d5d95c43ecaf$export$2e2bcd8739ae039)();
        const defaultOptions = {
            min: 0,
            max: 100,
            from: 20,
            to: 30,
            step: 1,
            stepScale: 1,
            isVertical: false,
            isInterval: false,
            isLabel: true,
            isScale: true,
            isProgressBar: true
        };
        this.container = container;
        this.container.classList.add("js-slider");
        this.state = {
            ...defaultOptions,
            ...options
        };
        this.model = new (0, $695bf388199b8e7c$export$2e2bcd8739ae039)(this.state);
        this.createView();
        this.subscribeView();
        this.subscribeModel();
    }
    createLineBlock = ()=>{
        const { progressWidth: progressWidth , shiftFrom: shiftFrom , shiftTo: shiftTo  } = (0, $beedda9cb4bde3a6$export$518720270a8efe11)(this.state);
        return {
            progressBarWidth: progressWidth,
            shift: shiftTo,
            shiftFrom: shiftFrom
        };
    };
    createArrScale = ()=>{
        const { max: max , min: min , stepScale: stepScale  } = this.state;
        const { scale: scale , shift: shift  } = (0, $cc66fd65ef2963b6$export$2189da21f90e62b8)({
            max: max,
            min: min,
            step: stepScale
        });
        return {
            scale: scale,
            shift: shift
        };
    };
    handleScaleItemClick = (e)=>{
        if (!(e.target instanceof HTMLElement)) return;
        const newValue = Number(e.target?.textContent);
        this.updateModel(newValue);
    };
    handleLineBlockClick = (event)=>{
        const slider = this.container.querySelector(".line-block");
        const progressbar = this.container.querySelector(".progress-bar");
        if (event.target !== progressbar && event.target !== slider) return;
        if (!slider) return;
        const value = this.countValueForModel(slider, event);
        this.updateModel(value);
    };
    handleHandleClick = (event)=>{
        if (!(event.target instanceof HTMLElement)) return;
        const { min: min , isVertical: isVertical , to: to , from: from  } = this.state;
        let sliderSpan = event.target;
        const slider = this.container.querySelector(".line-block");
        if (to === min && from === min) {
            const sliderSpanNode = this.container.querySelector("[data-handle=to]");
            if (!sliderSpanNode) return;
            sliderSpan = sliderSpanNode;
        }
        const position = sliderSpan?.dataset.handle;
        if (!slider || !sliderSpan) return;
        const sliderSpanCoords = (0, $405f68f2ea1f0eac$export$39e042fd83f1b62e)(sliderSpan);
        let shift = event.pageX - sliderSpanCoords.left;
        if (isVertical) // eslint-disable-next-line no-unused-vars
        shift = event.pageY - sliderSpanCoords.top;
        const handleHandlerMouseMove = (evt)=>{
            if (slider) this.handleHandleMove(evt, slider, position);
        };
        document.addEventListener("pointermove", handleHandlerMouseMove);
        // Начнем движение ползунка
        document.addEventListener("pointerup", ()=>{
            document.removeEventListener("pointermove", handleHandlerMouseMove);
        });
    };
    modelWasUpdate = (model)=>{
        this.state = model;
        const scaleProps = this.createArrScale();
        const lineBlockOptions = this.createLineBlock();
        this.view.updateView({
            model: model,
            scaleProps: scaleProps,
            lineBlockOptions: lineBlockOptions
        });
        this.observer.notify({
            eventName: (0, $fa1e69341aa3f470$export$8e49444f78fbbdb8).sliderChange,
            eventPayload: this.state
        });
    };
    subscribeView = ()=>{
        this.view.subscribe({
            eventName: (0, $fa1e69341aa3f470$export$8e49444f78fbbdb8).clickedScaleItem,
            function: this.handleScaleItemClick
        });
        this.view.subscribe({
            eventName: (0, $fa1e69341aa3f470$export$8e49444f78fbbdb8).clickedHandle,
            function: this.handleHandleClick
        });
        this.view.subscribe({
            eventName: (0, $fa1e69341aa3f470$export$8e49444f78fbbdb8).clickedLine,
            function: this.handleLineBlockClick
        });
    };
    subscribeModel = ()=>{
        this.model.subscribe({
            eventName: (0, $fa1e69341aa3f470$export$8e49444f78fbbdb8).modelWasUpdate,
            function: this.modelWasUpdate
        });
    };
    getModel = ()=>this.model;
    getState = ()=>this.state;
    createView = ()=>{
        const scaleOptions = this.createArrScale();
        const lineBlockOptions = this.createLineBlock();
        this.view = new (0, $7dbb4f7a292982bf$export$2e2bcd8739ae039)({
            options: this.state,
            container: this.container,
            scaleOptions: scaleOptions,
            lineBlockOptions: lineBlockOptions
        });
    };
    fullUpdate = (options)=>{
        const newState = {
            ...this.state,
            ...options
        };
        const [isOptionsValid, message] = (0, $ddecd9c9a59745c6$export$235a19972c8b27b4)(newState);
        if (isOptionsValid) {
            this.state = newState;
            this.container.innerHTML = "";
            this.createView();
            this.subscribeView();
            this.model.updateState({
                type: (0, $fa1e69341aa3f470$export$b602256c1ce40551).setFullState,
                payload: {
                    value: newState
                }
            });
        }
        if (message) throw Error(message);
    };
    handleHandleMove = (evt, slider, position)=>{
        const { isInterval: isInterval  } = this.state;
        let value = this.countValueForModel(slider, evt);
        if (isInterval) {
            if (position === (0, $fa1e69341aa3f470$export$55c970c020dafcca).to) {
                if (value < this.state.from) value = this.state.from;
                this.model.updateState({
                    type: (0, $fa1e69341aa3f470$export$b602256c1ce40551).setToValue,
                    payload: {
                        value: value
                    }
                });
            } else if (position === (0, $fa1e69341aa3f470$export$55c970c020dafcca).from) {
                if (value > this.state.to) value = this.state.to;
                this.model.updateState({
                    type: (0, $fa1e69341aa3f470$export$b602256c1ce40551).setFromValue,
                    payload: {
                        value: value
                    }
                });
            }
        } else this.model.updateState({
            type: (0, $fa1e69341aa3f470$export$b602256c1ce40551).setToValue,
            payload: {
                value: value
            }
        });
    };
    updateModel = (newValue)=>{
        const { from: from , to: to , isInterval: isInterval  } = this.state;
        if (isInterval) {
            const difFromNewValue = Math.abs(from - newValue);
            const difToNewValue = Math.abs(to - newValue);
            if (difToNewValue < difFromNewValue) this.model.updateState({
                type: (0, $fa1e69341aa3f470$export$b602256c1ce40551).setToValue,
                payload: {
                    value: newValue
                }
            });
            else if (difToNewValue > difFromNewValue) this.model.updateState({
                type: (0, $fa1e69341aa3f470$export$b602256c1ce40551).setFromValue,
                payload: {
                    value: newValue
                }
            });
            else if (difFromNewValue === difToNewValue) {
                if (newValue < to) this.model.updateState({
                    type: (0, $fa1e69341aa3f470$export$b602256c1ce40551).setFromValue,
                    payload: {
                        value: newValue
                    }
                });
                else this.model.updateState({
                    type: (0, $fa1e69341aa3f470$export$b602256c1ce40551).setToValue,
                    payload: {
                        value: newValue
                    }
                });
            }
        } else this.model.updateState({
            type: (0, $fa1e69341aa3f470$export$b602256c1ce40551).setToValue,
            payload: {
                value: newValue
            }
        });
    };
    countValueForModel = (slider, event)=>{
        const { isVertical: isVertical , max: max , min: min , step: step  } = this.state;
        const sliderCoords = (0, $405f68f2ea1f0eac$export$39e042fd83f1b62e)(slider);
        let left = (event.pageY - sliderCoords.top) / sliderCoords.height * 100;
        if (!isVertical) left = (event.pageX - sliderCoords.left) / sliderCoords.width * 100;
        if (left < 0) left = 0;
        if (left > 100) left = 100;
        const stepCount = (max - min) / step;
        const stepPercent = 100 / stepCount;
        let stepLeft = Math.ceil(left / stepPercent) * stepPercent;
        if (stepLeft < 0) stepLeft = 0;
        if (stepLeft > 100) stepLeft = 100;
        const valueFix = (0, $cc66fd65ef2963b6$export$bccc105a1ec089d2)(step);
        const result = Number((stepLeft / stepPercent * step).toFixed(valueFix));
        const value = Number((result + min).toFixed(valueFix));
        return value;
    };
    subscribe = (fn1)=>{
        const subscriber = {
            eventName: (0, $fa1e69341aa3f470$export$8e49444f78fbbdb8).sliderChange,
            function: fn1
        };
        this.observer.subscribe(subscriber);
    };
    unsubscribe = (fn2)=>{
        const subscriber = {
            eventName: (0, $fa1e69341aa3f470$export$8e49444f78fbbdb8).sliderChange,
            function: fn2
        };
        this.observer.unsubscribe(subscriber);
    };
}
var $21ffd6a8b67d9721$export$2e2bcd8739ae039 = $21ffd6a8b67d9721$var$Presenter;




(function sliderMVP($1) {
    $1.fn.slider = function JQuerySlider(options) {
        if (!this[0]) return;
        const isValid = (0, $ddecd9c9a59745c6$export$235a19972c8b27b4)(options);
        if (isValid) return new (0, $21ffd6a8b67d9721$export$2e2bcd8739ae039)({
            options: options,
            container: this[0]
        });
        throw Error("Options is not valid");
    };
})((0, $jcTte$jquery));


//# sourceMappingURL=slider.js.map
