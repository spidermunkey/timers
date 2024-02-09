const root = document.documentElement;
const docStyle = root.style;
function getRoot(element) {
    return element.documentElement.style;
}
function getVar(variableName) {
    return getComputedStyle(root).getPropertyValue(variableName);
}
function setVar(variableName, value) {
    return root.style.setProperty(variableName, value);
}
function addClass(element, classToAdd) {
    element.classList.add(classToAdd);
}
function removeClass(element, classToRemove) {
    element.classList.remove(classToRemove);
}
function $(arg, context = document) {
    const element = context.querySelector(arg);
    if (!element || !(element instanceof Element)) return null;
    element.listen = function(callback, listener = "click", capture = false) {
        element.addEventListener(listener, callback, capture);
        return element;
    };
    return element;
}
function $$(arg, element = document) {
    const array = Array.from(element.querySelectorAll(arg));
    return array;
}
function log() {
    console.log.apply(this, arguments);
}
function err() {
    console.log.apply(this, arguments);
}
function each(argList, callback) {
    return argList.map(callback);
}
function listenAll(elements, callback, listener = "click") {
    each(elements, (element)=>listen(element, callback, listener));
    return elements;
}
function listen(element = document, callback, listener = "click", capture = false) {
    if (!element) return;
    element.addEventListener(listener, function(event) {
        callback.apply(callback, [
            event,
            ...arguments,
            element
        ]);
    }, capture);
}
function responseOk(response) {
    // axios
    return response.status === 200 && response.statusText === "OK";
}
function nextTick(fn) {
    setTimeout(fn, 0);
}
function toDecimal(num) {
    return num / 100;
}
function focusInput(input, value) {
    if (!!value) input.value = value;
    input.select();
    return input;
}
function followMouseFromEventTarget(event) {
    const { currentTarget: target } = event;
    const rect = target.getBoundingClientRect(), mouseXFromTarget = e.clientX - rect.left, mouseYFromTarget = e.clientY - rect.top;
    return {
        x: mouseXFromTarget,
        y: mouseYFromTarget,
        mouseX: e.clientX,
        mouseY: e.clientY
    };
}
function followMouseFromCoords(coords) {
    return function(event) {
        const { clientX, clientY } = event;
        const { x, y } = coords;
        return {
            x: clientX - x,
            y: clientY - y,
            mouseX: clientX,
            mouseY: clientY
        };
    };
}
function createToggleList(elements, classList = [
    "active"
]) {
    // console.log('creating a toggle list with elements',elements,'toggling between the class(s)',classList)
    function toggle(element) {
        elements.forEach((element)=>element.classList.remove(...classList));
        element.classList.add(...classList);
    }
    elements.forEach((element)=>{
        // console.log(element)
        element.addEventListener("click", toggle);
    });
    return {
        classList,
        elements: [
            ...elements
        ],
        toggle,
        add: function(element) {
            this.elements.push(element);
        }
    };
}
function frag() {
    return document.createDocumentFragment();
}
function div(classList = [], styleProps = {}, attrs = {}, children) {
    const div = document.createElement("div");
    if (classList.length > 0) div.classList.add(...classList);
    if (styleProps) for(prop in styleProps){
        console.log(prop);
        console.log(styleProps[prop]);
        div.style[prop] = styleProps[prop];
    }
    if (children) children.forEach(div.appendChild);
    return div;
}
function ul() {
    return document.createElement("ul");
}
function li() {
    return document.createElement("li");
}
function span() {
    return document.createElement("span");
}
function input() {
    return document.createElement("input");
}
function appendElement(parent, child) {
    parent.append(child);
}
function wipeElement(element) {
    element.innerHTML = "";
    return element;
}
function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}
function uppercase(str) {
    return [
        ...str
    ].map((x)=>x = x.toUpperCase()).join("");
}
function lowercase(str) {
    return [
        ...str
    ].map((x)=>x = x.toLowerCase()).join("");
}
function exclaim(str) {
    return str + "!";
}
function first(value) {
    return value[0];
}
function last(value) {
    return value[value.length - 1];
}
function clearField(input) {
    input.value = "";
    return input;
}
function clearForm(form) {
    $$("input", form).map(clearField);
    return form;
}
function focusInputOnClick(event, placholder) {
    let input = event.target;
    if (input.nodeName !== "INPUT") return;
    if (placholder && typeof placholder == "string") input.value = placholder;
    // console.log(placholder)
    input.select();
    return input;
}
function allChecked(inputGroup) {
    return inputGroup.every((inp)=>inp.checked == true);
}
function noneChecked(inputGroup) {
    return inputGroup.every((inp)=>inp.checked == false);
}
function oneChecked(inputGroup) {
    return inputGroup.some((inp)=>inp.checked == true);
}
function oneUnchecked(inputGroup) {
    return inputGroup.some((inp)=>inp.checked == false);
}
function disable(submitInput) {
    submitInput.disabled = true;
}
function enable(submitInput) {
    submitInput.disabled = false;
}
function throttleInput(input, time) {
    /* 
        https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled
        The disabled attribute is supported by 
        <button>, <fieldset>, <optgroup>, <option>, <select>, <textarea> and <input>.
    */ input.disabled = true;
    setTimeout(()=>input.disabled = false, time);
    return;
}
function check(input) {
    input.checked = true;
}
function uncheck(input) {
    input.checked = false;
}
function checkAll(inputGroup) {
    inputGroup.forEach((inp)=>inp.checked = true);
}
function uncheckAll(inputGroup) {
    inputGroup.forEach((inp)=>inp.checked = false);
}
function currentTime() {
    return new Date().toLocaleTimeString();
}
function mouseClickRight(event) {
    return event.button === 2;
}
function mouseClickLeft(event) {
    return event.button === 0;
}
function isNumberKey(event) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
}
function highlightInput(input) {
    input.focus();
    input.select();
    return input;
}
function isBackspaceKey(event) {
    return event.keyCode == 8;
}
function isEmptyNumberInput(input) {
    return input.value === 0 || input.value === "0" || input.value === "";
}
function elementClicked(elementClass, event) {
    return event.target.closest(elementClass);
}
function toClipboard(value, message) {
    window.navigator.clipboard.writeText(value);
    if (message) console.log("message from clipboard", message);
}
function mergeObj(targetObj, mergingObj) {
    return {
        ...structuredClone(targetObj),
        ...structuredClone(mergingObj)
    };
}
function uuid() {
    let timmy = Date.now().toString(36).toLocaleLowerCase();
    // random high number
    let randy = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
    // random high num to hex => "005EIPQUTQ64" => add 0s to make sure its 12digits
    randy = randy.toString(36).slice(0, 12).padStart(12, "0").toLocaleUpperCase();
    // coerce into a string
    return "".concat(timmy, "-", randy);
}

//# sourceMappingURL=index.482c837e.js.map
