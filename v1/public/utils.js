// -------------------------
// STRUCTS
// -----------------------------------------


class Cursor {
    // Allows extends a basic array allowing easy access to the next and previous elements in a list 
    // according to a pointer in memory

    // EXPECTS INDEXES TO START FROM 1 INSTEAD OF ZERO
    // INDEX OF 0 == "FIRST"
    // INDEX OF length-1 = "LAST"

    // expects callers to add one when using array indexes 
    constructor(array,startingIndex = 1) {
        if (!Array.isArray(array)) 
            throw new Error(`expecting an array you passed ${array}`);
        if (isNaN(startingIndex)) 
            throw new Error(`expecting a number for startingIndex you passed ${startingIndex}`);

        let pointer;
        let items;
        
        if (startingIndex !== 0 && startingIndex < array.length - 1 ) this.pointer = startingIndex;
        if (array.length === 1 || array.length === 0) this.pointer = 1

        this.items = ["first",...array,"last"]

    }

    get first() {
        return this.items[1]
    }
    get last() {
        return this.items[this.items.length - 2]
    }
    get next() {
        return this.items[this.pointer + 1]
    }
    get prev() {
        return this.items[this.pointer - 1]
    }
    get current() {
        return this.items[this.pointer]
    }
    get all() {
        return this.items.filter(index => index !== 'first' && index !== 'last');
    }
    get size() {
        return this.items.length - 2;
    }
    get isEmpty() {
        return this.size === 0
    }

    validIndex(index) {

        if ( isNaN(index) ) 
            return NaN;
            // console.log(`\nskip function was expecting a number... you passed ${index}`)
        
        if (index > this.size || index < 0)
            return undefined;
            // console.log(`\nuh oh....index of ${index} doesn\'t exist\ntry a number from 0 to ${this.size}\n`);

        return true;

    }

    setPointer(index) {
        if (!this.validIndex(index)) return
        
        this.pointer = index
        return this.items[index]
    }

    skipToIndex(index) {
        if (!this.validIndex(index)) return

        return this.setPointer(index)
    }

    getIndexOf(index) {
        if (!this.validIndex(index)) return

        return this.items[index]
    }

    skipToNext() {
        if (this.next == "last") return this.setPointer(1)
        return this.setPointer(this.pointer + 1);
    }

    skipToPrev() {
        if (this.prev == "first") return this.setPointer(this.size);
        return this.setPointer(this.pointer - 1);
    }

    skipToLast() {
        return this.setPointer(this.size);
    }

    skipToFirst() {
        return this.setPointer(1);
    }

    pluck(index) {
        this.items = this.items.splice( index + 1 , 1 );
        return this
    }

    addOne(element) {
        this.items.pop();
        this.items.push(element);
        this.items.push('last');
        return this
    }

    addMany(elements) {
        this.items.pop();
        this.items.push(...elements)
        this.items.push('last');
        return this;
    }

    update( elements , startingIndex = 1) {
        this.pointer = startingIndex;
        this.items = ["first",...elements,"last"];
        return this
    }

    nthSuffix(num) {
        if (!isNaN(num)) {
            let n = num;
            let suff;

            if (num > 20) {
                // convert to string
                let d = num.toString()
                // grab the last digit
                n = d[d.length - 1];
            }

            n == 1 ? suff = 'st'
            : n == 2 ? suff = 'nd'
            : n == 3 ? suff = 'rd'
            : suff = 'th'

            return num.toString() + suff;
        }
        return `this function expects numbers`
    }
}

class Bucket {

    constructor() {
        this.items = new Map();
        this.identity = 'bucket';
        this.idn = 0;
    }

    get size() {
        return this.items.size;
    }
    get keys() {
        return Array.from(this.items.keys());
    }
    get values() {
        return Array.from(this.items.values());
    }
    get copies() {
        return Array.from(this.items.values()).map(structuredClone);
    }

    push( key, value ) {
        
        if (!key) return `item not pushed bucket... invalid key`;
        if (!value) return `item not pushed to bucket... invalid value`;
        if (this.items.has(key)) return `item not pushed to bucket... duplicate key`;

        this.items.set(key,value);
        return 'success';
    }

    pluck(key) {
        return this.items.delete(key);
    }

    has(key) {
        return this.items.has(key);
    }

    use(key) {
        return this.items.get(key);
    }

    useValue(key) {
        return structuredClone(this.items.get(key))
    }

    spread(map) {

        let duplicates = this.compare(map);

        if (duplicates.length > 0) {
            console.error(`${duplicates.length} duplicates found in the keyset. No items were added`,duplicates);
            return duplicates;
        }

        map.forEach((value,key) => this.push(key,value));
        return this;
    }

    compare(map) {
        return Array.from(map.keys()).filter(this.has);
    }

    wipe() {
        this.items = new Map();
    }
    
}

class Collection {
    
    constructor() {
        this.bucket = new Bucket();
        this.cursor = new Cursor([]);
        this.indexes = {}
    }

    get size() {
        return this.items.size;
    }

    get keys() {
        return this.bucket.keys;
    }

    get values() {
        return this.bucket.values;
    }

    get items() { 
        return this.bucket.items;
    }
    
    use(key) {
        return this.bucket.use(key)
    }

    useValue(key) {
        return this.bucket.useValue(key)
    }

    add(key,value) {
        let status = this.bucket.push(key,value)
        if (status === 'success') this.cursor.addOne(key)
        return status;
    }

    spread(map) {
        let status = this.bucket.spread(map);
        if (status) this.cursor.spread(Array.from(map.keys()))
        return status;
    }

    has(key) {
        return this.bucket.has(key);
    }

    remove(key) {
        let status = this.bucket.pluck(key);
        if (status) this.cursor.pluck(this.items.useKeys().indexOf(key));
    }

    drop() {
        this.items = new Bucket();
        this.cursor = new Cursor([]);
    }
}




// -------------------------
// OBSERVABLES
// -----------------------------------------


class Observer {
    constructor(target) {
      this.Target = target
      this.subscribers = new Set();
      this.priorities = new Set();
    }
  
    subscribe(...fns) {
      fns.forEach(fn => { 

        if (this.Target) fn = fn.bind(this.Target);

        this.subscribers.add(fn);
        
        })

      return this;
    }
  
    unsubscribe(fn) {
      this.subscribers.delete(fn);
      return this;
    }
  
    prioritize(fn) {
    if (this.Target)
        fn = fn.bind(this.Target)
      this.priorities.add(fn);
    }
  
    unprioritize(fn) {
      this.priorities.delete(fn);
    }
  
    notify(...values) {
      for (const fn of this.priorities) {
        fn(...values);
      }
      for (const fn of this.subscribers) {
        fn(...values);
      }
    }
  
    get isEmpty() {
      return this.subscribers.size === 0;
    }
  
    get hasPriorities() {
      return this.priorities.size > 0;
    }
  
}

class Observable {
    constructor(target) {
      this.observer = new Observer(target);
    }
  
    subscribe(...fns) {
      this.observer.subscribe(...fns);
      return this;
    }
  
    unsubscribe(fn) {
      this.observer.unsubscribe(fn);
      return this;
    }
  
    prioritize(fn) {
      this.observer.prioritize(fn);
      return this;
    }
  
    unprioritize(fn) {
      this.observer.unprioritize(fn);
      return this;
    }
  
    notify(...values) {
      this.observer.notify(...values);
      return this;
    }
  
    get isEmpty() {
      return this.observer.isEmpty;
    }
  
    get hasPriorities() {
      return this.observer.hasPriorities;
    }

    get listeners() {
      return this.observer.listeners;
    }
    get priorities() {
      return this.observer.priorities;
    }

    static create(target) {
        return new Observable(target)
    }

    static observe(obj) {
        if (obj != null) {
            Object.assign(obj, 
            {
                subscribe:this.subscribe.bind(obj),
                unsubscribe:this.unsubscribe.bind(obj),
                prioritize:this.prioritize.bind(obj),
                unprioritize:this.unprioritize.bind(obj),
                notify:this.notify.bind(obj),
                subscribe:this.subscribe.bind(obj),
                get isEmpty() {
                    return this.observer.isEmpty;
                  }, 
                get hasPriorities() {
                return this.observer.hasPriorities;
                }
            })
          return obj
        }
    }
}

class EventEmitter {
    constructor(events) {
        this.events = events || new Map();
    }
    
    on(event, ...listeners) {

      if(!this.events.has(event)) 
          this.events.set(event, new Observable());
    
      listeners.forEach(listener => {
        this.events.get(event).subscribe(listener);
    })

    }

    once(event, listener) {
      const singleton = (...args) => {
        listener(...args);
        this.off(event, singleton);
      };
      this.on(event, singleton);
    }

    off(event, listener) {

      if (!this.events.has(event))
        return

      this.events.get(event).unsubscribe(listener)

    }

    clear(event) {

      if (this.events.has(event))
        return
      
      this.events.set(event,new Observable())

    }

    emit(event,...args) {

      if(!this.events.has(event))
        return

      this.events.get(event).notify(...args)    
    }
}


class Task {
  constructor(promiseFn) {

    this.state = undefined; // [undefined || pending || ready ]
    this.result = undefined;
    this.task = promiseFn;
    this.emitter = new EventEmitter();

  }

    async run (...args) {

      try {

        this.state = 'pending';
        this.emit('pending');
        this.result = await promiseFn.call(...args);
        this.state = 'ready';
        this.emit('ready', this.result);

      } catch (error) {

        console.error(error);
        this.state = 'error';
        this.result = error;
        this.emit('error', error);

      }

    };

    register(event, listener) {
      this.emitter.on(event, listener);
      return this
    }

    remove(event, listener) {
      this.emitter.off(event, listener);
      return this
    }

    emit (event, ...args) {
      this.emitter.emit(event, ...args);
      return this
    }

}




// -------------------------
// COMPONENTS
// -----------------------------------------


class MenuList {

    constructor(listOfNames, classList, dataset) {

        this.element = document.createElement('ul');
        this.element.classList.add(...classList);
        this.items = [];

        listOfNames.forEach(name => this.addItem(name));

    }
    
    get clone() {
        return this.element.cloneNode(true);
    }

    addItem(name) {

        const newLink = new MenuListItem(name);
        // console.log('adding menu item ',name, ' to ', this);
        this.element.append(newLink.element);
        this.items.push(newLink);

        return newLink;

    }
    
    render(container) {
        container.innerHTML = '';
        container.append(this.element);
    }

    append(container) {
        container.append(this.clone)
    }

    replaceItems(listOfNames) {
        this.innerHTML = '';
        this.items = [];
        listOfNames.forEach(this.addItem);
    }

    updateItem(element,callback) {
        this.items.forEach( MenuListItem => { 
            if( MenuListItem.element == element) callback(MenuListItem)
        })
    }

    updateItemName(element, name) {
        this.items.forEach(MenuListItem => {
            if(MenuListItem.element == element) MenuListItem.name = name;
        })
    }

}

class MenuListItem {

    constructor( 
        name, 
        classNames = [], 
        contentClassNames = []
    ) {

        this.name = name;
        this.element = document.createElement('li');
        this.content = document.createElement('span');
        
        this.element.append(this.content);

        this.element.classList.add(...classNames);
        this.content.classList.add(...contentClassNames);

        this.element.dataset.tab = name;
        this.content.textContent = name;

    }

    setName(newName) {
        this.content.textContent = newName;
        this.element.dataset.tab = newName
        this.name = newName;
    }

}

class Modal {
    
    // basic modal class that handles open / close / toggle / methods
    // also hooks into the tabber interface to ensure only one modal of a group is open at once

    constructor(element,toggleClass = 'active') {

        this.element = element;

        this.openTimeLine = Observable.create(this);

        this.closeTimeLine = Observable.create(this);

        this.togglers = new Set();

        this.openers = new Set();

        this.closers = new Set();

        this.status = 'inactive';

        this.toggleClass = toggleClass || 'active';

    }

    set state({status,event}) {

        // console.log(status,this.status)
        if (status == 'inactive') this.close(event);

        else if (status == 'active') this.open(event);

        else console.log('active and inactive are the only two states needed here',status)
    
    }

    get state() {
        return this.status;
    }

    // delegates sideEffects to the onOpen observer then changes the "status"
    open(e) {
        this.element.classList.add(this.toggleClass);
        if (!this.openTimeLine.isEmpty && this.state !== 'active') this.openTimeLine.notify(e);
        this.status = 'active'
    }

    // close modal
        // change [ status ]
    close(e) {
        this.element.classList.remove(this.toggleClass);
        if (!this.closeTimeLine.isEmpty && this.state !== 'inactive') this.closeTimeLine.notify(e);
        this.status = 'inactive'
    }

    // open - close modal
        // change status
    toggle(event) {

        if (this.state == 'inactive') this.state = {status:'active', event};

        else if (this.state == 'active') this.state = {status:'inactive', event};
        
        else console.log('err something went wrong with the modal toggler');
        
        return this;

    }

    // register DOM Element event listener that calls this toggle method
    bindToggler(...elements) {
        // console.dir('BINDING toggle element(s)', elements)
            elements.forEach(element => {
                if (this.togglers.has(element)) return `${element} is already bound as a toggler`
            
                this.togglers.add(element)
                element.addEventListener('click',(e) => this.toggle.call(this,e))

        });
        
        return this
    
    }

    // register DOM Element event listener that calls this open method
    bindOpener(...elements) {

        elements.forEach(element => {

            // console.log(element)
            if (this.openers.has(element)) return `${element} is already bound as a opener`
            
            this.openers.add(element)
            element.addEventListener('click',(e) => this.open.call(this,e,true))

        });

        return this

    }

    // register DOM Element event listener that calls this close method
    bindCloser(...elements) {

        elements.forEach(element => {

            // console.log(element)
            if (this.closers.has(element)) return `${element} is already bound as a closer`
            
            this.closers.add(element)
            element.addEventListener('click',(e) => this.close.call(this,e))
        
        });

        return this

    }

    // registers a common Tab Interface between modals of a group 
    bindTabber(reference) {
        
        this.Tabber = reference;
        this.openTimeLine.prioritize(() => this.Tabber.setActive(this))
        return this
    }

    onOpen(...fns) {
        this.openTimeLine.subscribe(...fns);
        return this;
    }
    onClose(...fns) {
        this.closeTimeLine.subscribe(...fns);
        return this;
    }
    
}

class DynamicModal extends Modal {
    
    // adds functionality to handle a modals loader/suspense component
    // open/close observers will prioritize async fetching/showing data
    // comes with a render method that defines the static HTML as opposed to a basic modal with predefined HTML
    constructor( element, config = { 
        type:'lazy', 
        endpoint:undefined,
        dataHandler:undefined,
        requestHandler:undefined, 
        responseHandler:undefined,
        hydrationHandler:undefined,
    } ) {
        super(element);

        this.type = config.type || 'lazy';
        this.endpoint = config.endpoint;

        this.suspense = `<div class="loading-container"><span class="loader"></span></div>`;
        this.errRes = `<div>Error Fetching Resources</div>`

        this.handleData = config.dataHandler;
        this.handleRequest = config.requestHandler;
        this.handleResponse = config.responseHandler;
        this.handleHydration = config.hydrationHandler;
        this.ready = false
        this.pending = false
        this.hasChanged = false
        
        this.initial = true;

        this.value = ''

        // super
        this.openTimeLine.prioritize(this.checkForUpdatesToRender.bind(this))
        
        if (config.type === 'eager')
            this.update();

    }

    // set flags for next call to getData()
    setReady() {
        // console.log(`setting state to ready for ${this.element}`)
        this.pending = false;
        this.ready = true;
        if (this.initial)
            this.inital = false;
        return;
    }

    // set flags for next call to getData()
    setPending() {
        // console.log(`setting state to pending for ${this.element}`)

        this.pending = true;
        this.ready = false;
        return
    }

    async update() {
        // console.log('triggering update')
        // set flags && result/value for getData to "bounce"
        this.value = this.suspense;
        this.setPending();
        this.renderSuspense()

        // call predefined request handler callback (DOM method) with suspense HTML string
        // if (handleRequest) handleRequest(this.suspense);

        
        // fetch resources from predefined endpoint
        // console.log(this.endpoint)
        const res = await axios.get(this.endpoint)
        // console.log(res.data)
        if (res){
            // if res.ok call predifined request handler (DOM methods/tranformer) with the data and a flag
            // this.value = handleResponse('success', data)
            
            this.renderComponent(res.data)
            this.setReady();

        } else {
            // if !res.ok handle call response with an error flag 
            // this.value = handleResponse('error', data)
            
            this.renderError()
            this.setReady();
        }
        return this.value;
    }

    getData() {

        // if data is ready and hasn't changed || data is pending result will be an html string
        // return the html string
        if ( (this.ready && !this.hasChanged) || this.pending )
            return this.value
        // if not it means the data has changed or has never been fetched
        // so start the process of fetching data then return the loader

        this.update() // sets result to `<loading>` then returns a thenable
        return this.value

    }

    notifyChange() {

            if (this.type === 'lazy') {
                console.log('flagging change -- type lazy')
                this.hasChanged = true;
            }
            if (this.type === 'eager') {
                console.log('flagging change -- type eager')
                this.update();
            }

    }

    checkForUpdatesToRender() {
        console.log('checking for updates')
        if ( (this.ready && !this.hasChanged) || this.pending ){
            console.log('everything still checks out')
            return true;
        }
        if (this.hasChanged) {
            console.log('data has changed fetching changes')
            this.update();
            this.hasChanged = false;
            return false;
        }
        else if (this.initial) {
            console.log('rendering initial state')
            this.update();
            return false;
        }
    }

    
    renderSuspense() {
        this.element.innerHTML = this.suspense
    }
    renderError() {
        this.element.innerHTML = this.errRes
    }
    renderComponent(data) {
        this.element.innerHTML = this.handleData(data)
        if(this.handleHydration) {
            // console.log('hydrating component')
            this.handleHydration(this.element)
        }
    }

}

class Toggler {
    constructor(button,modal,state) {
        this.state = state || 'inactive'
        this.modal = modal;
        this.button = button;
        // button.addEventListener('click', this.toggle.bind(this))
    }
    enable() {
        this.modal.classList.add('active');
        this.button.classList.add('active');
        this.state = 'active';
    }
    disable() {
        this.modal.classList.remove('active');
        this.button.classList.remove('active');
        this.state = 'inactive';
    }
    toggle() {
        if (this.state === 'active') {
            this.disable();
            return;
        }
        if (this.state === 'inactive') {
            this.enable();
            return;
        }
    }
}

class Tabber {
    constructor() {
        this.current = undefined
        this.previous = undefined
    }

    setActive(value,event) {
        // console.log(value,this.current)
        if (this.current != value) {
            // console.log(this.current == value)
            if (this.current) this.current.close(event)

            this.previous = this.current
            this.current = value
            // console.log(value,this.current)
            
        }
    }

    closeActive(event) {
        if (this.current && this.current.state !== 'inactive') this.current.close(event);
    }

}

class Slider {
    constructor( targetElement , actions = {} ) {

        const self = this;
        this.container = targetElement;
        this.track = targetElement.querySelector('.slider-track') || targetElement;
        this.handle = targetElement.querySelector('.slider-handle') || targetElement.querySelector('.slider-handle');
        console.log('container',targetElement,'container',this.container,'track',this.track)

        this.onMouseDown = actions.onMouseDown || function(state) { console.log('mouse down',state)};

        this.onMouseUp = actions.onMouseUp || function(state) { console.log('mouse up', state)};

        this.onMouseMove = function(...args) { requestAnimationFrame(actions.onMouseMove.bind(this,...args)) } 
                || function(state) { console.log('mouse moving',state)};


        this.coords = {
            get max() {
                return this.track.width - this.handleMidpoint;
            },
            get min() {
                return 0 + this.handleMidpoint;
            },
            get handleSize() {
                return this.handle.width;
            },
            get handleMidpoint() {
                return this.handleSize / 2;
            },
            get handlePosition() {
                return this.handle.x + this.handleMidpoint;
            },
            get distanceTraveled() {
                return this.handlePosition - this.trackStart;
            },
            get trackWidth() {
                return this.track.width - this.handleSize;
            },
            get trackStart() {
                return this.trackLeft + this.handleMidpoint;
            },
            get trackLeft() {
                return this.track.x;
            },
            get track() {
                return self.track.getBoundingClientRect();
            },
            get handle() {
                return self.handle.getBoundingClientRect();
            },
            clamp(val) {

                let x;
                let max = this.max;
                let min = this.min;

                if (isNaN(val)) throw new Error(`clamp function expects a number...you passed ${val}`);

                if (val >= max) x = max;
                
                else if (val <= min) x = min;
                
                else x = val;

                return x;
            },
        };

        this.MAX = {
            px: this.coords.track.width,
            pct: 100,
            deg: 360,
        };

        this.MIN = {
            px: 0,
            pct: 0,
            deg: 0,
        };

        this.state = {
            px: undefined,
            deg: undefined,
            pct: undefined,
        };

        this.handle.addEventListener( 'mousedown', this.handleDrag.bind(this), true );
        this.track.addEventListener( 'click', this.handleClick.bind(this), true );

    }

    handleDrag(event) {

        event.stopImmediatePropagation();

        let initialMouseUpIfAny = document.onmouseup;
        let controller = new AbortController();
        let state;
        
        document.addEventListener('mousemove', update.bind(this) , { capture: true, signal: controller.signal });

        document.onmouseup = abort.bind(this)

        function update(event) {

            state = this.update(event);
            this.onMouseMove(state);
        
        }

        function cleanup() {

            document.removeEventListener('mousemove', update.bind(this),  { capture: true, signal: controller.signal } )
            document.onmouseup = initialMouseUpIfAny;
        
        }

        function abort() {

            controller.abort();
            this.onMouseUp(state);
            nextTick(cleanup);
        
        }
    
    }

    handleClick(event) {

        if (event.target == this.handle)
            return;

        let state = this.update(event);
        this.onMouseDown(state);
        this.onMouseUp(state);

    }

    update(event) {
        this.state = this.setHandle(this.getDistanceTraveled(event));
        return this.state;
    }

    setHandle (distanceTraveled) {
        
        let clamped = this.coords.clamp(distanceTraveled);

        this.handle.style.transform = `translateX(${clamped - this.coords.handleMidpoint}px)`;

        if (distanceTraveled <= 0)
            return {
                px: 0,
                pct: 0,
                deg: 0,
            };

        if (distanceTraveled >= this.coords.track.width)
            return {
                px: this.coords.track.width,
                pct: 100,
                deg: 360,
            };
    

        let distance = Math.trunc(distanceTraveled);
        let distanceInPercent = Math.trunc((distanceTraveled / this.coords.track.width) * 100);
        let distanceInDegrees = Math.trunc((distanceTraveled / this.coords.track.width) * 360);

        let values = {
            px: distance,
            pct: distanceInPercent,
            deg: distanceInDegrees,
        };

        return values;
    }





    reset() {
        return this.update(0);
    }

    disable () {
        this.handle.removeEventListener('mousedown', this.handleDrag.bind(this), true );
        this.track.removeEventListener('mousedown', this.handleClick.bind(this), true );
        return this.state;
    }

    getDistanceTraveled (event) {
        return event.clientX - this.coords.trackLeft;
    }

    convertValue (type, value) {
        
        let max = this.coords.track.width;

        if (type === 'pct') return max * (value/100);
        if (type === 'deg') return max * (value/360);
        if (type === undefined) {
            console.warn('you passed an invalid type to the sliders conver function',type,value);
            return undefined; 
        }

        console.error('something went wrong in the convert value function',type,value);
        return;
    }

    setFrom (type, value) {
        this.state = this.setHandle(this.convertValue(type, value));
        // console.log('state', state, 'slider state', this.state)
        return this.state;
    }

    setDegrees(value) {
        return this.setFrom('deg', value);
    }

    setPercent(value) {
        return this.setFrom('pct', value);
    }

    setPixels(value) {
        this.state = this.setHandle(value);
        return this.state;
    }


}

class MouseTrackingSlider {

    constructor( targetElement, actions = {}) {

        this.initialPosition_x = null;
        this.initialPosition_y = null;

        this.targetElement = targetElement;

        this.onMouseMove = actions.onMouseMove || function() { console.log( targetElement, 'triggering mouseMove' ) };
        this.onMouseDown = actions.onMouseDown || function() { console.log( targetElement, 'triggered mouseDown' )};
        this.onMouseUp = actions.onMouseUp     || function() { console.log( targetElement, 'triggered mouseUp' ) };

        targetElement.addEventListener( 'mousedown', this.track.bind(this), true )
        targetElement.addEventListener( 'click', this.handleClick.bind(this))
    }

    track(event) {

        if (event.button !== 0)
            return

        if (!this.initialPosition_x) this.initialPosition_x = event.pageX;

        if (!this.initialPosition_y) this.initialPosition_y = event.pageY;

        let controller = new AbortController();

        document.addEventListener( 'mousemove', this.handleDrag.bind(this) , { signal: controller.signal }, true )

        document.addEventListener( 'mouseup' , () => {

            controller.abort();
        
            this.initialPosition_x = null;
            this.initialPosition_y = null;
        
            event.stopImmediatePropagation();
        
        })
    }

    handleDrag(event) {

        let distanceFromInitialPosition_x = event.clientX - this.initialPosition_x;
        let distanceFromInitialPosition_y = event.clientY - this.initialPosition_y;

        let debounced_x = Math.floor(distanceFromInitialPosition_x / 3);
        let debounced_y = Math.floor(distanceFromInitialPosition_y / 3);

        this.onMouseMove( { x: Number(debounced_x), y: Number(debounced_y), event } )

    }

    handleClick(event) {

        if (!this.initialPosition_x) this.initialPosition_x = event.pageX;

        if (!this.initialPosition_y) this.initialPosition_y = event.pageY;

        let x = event.clientX - this.initialPosition_x;
        let y = event.clientY - this.initialPosition_y;

        this.onMouseUp({x,y,event});
    }
}


// -------------------------
// DATE & TIME
// -----------------------------------------


class DateTime {
    constructor() {

    }

    static mns = 1/1000;
    static snm = 1/60;
    static mnh = 1/60; 
    static hnd = 1/24;
    static dny = 1/365;
    static mny = 1/12;

    static msns = 1000;
    static msnMinute = 60000;
    static msnHour = 3600000;
    static msnDay = 86400000;
    static msnYear = DateTime.msnDay * 365;
    
    // static thisYear() {
    //     let d = new Date()
    //     console.log(d.getFullYear())
    // }

    static daysIn(month){
        const abbrv = month.slice(0,3);

        if (DateTime.monthMap[month])
            return DateTime.monthMap[month]

        else if (DateTime.monthMap[abbrv])
            return DateTime.monthMap[abbrv]

    }

    static dayMap = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thurday',
        5: 'Friday',
        6: 'Saturday',
        7: null,

        toArray() {
            const arr = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
            arr.abbrv = arr.abbreviate = () => arr.map(slice.bind(months,[0,3]));
            return arr;
        }
    }

    static get days() {
        return DateTime.dayMap.toArray();
    }

    static get monthMap() {
        return {
            'january': 31,
            get 'february'(){
                if (DateTime.thisYearIsLeap()) return 29
                return 28;
            },
            'march': 31,
            'april': 30,
            'may': 31,
            'june': 30,
            'july': 31,
            'august': 31,
            'september': 30,
            'october': 31,
            'november': 30,
            'december': 31,
        }
    }

    static get months() {
        const arr = ['january','february','march','april','may','june','july','august','september','october','november','december']
        arr.abbrv = arr.abbreviate = () => arr.map(slice.bind(arr,[0,3]));
    }

    static date = {

        standard: undefined,
        default: undefined,
        universal: undefined,
        east: undefined,
        west: undefined,
        central: undefined,
        leap: DateTime.thisYearIsLeap(),

        dayMap: {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thurday',
            5: 'Friday',
            6: 'Saturday',
            7: null,
        },

        get monthMap() {
            return {
                'January': 31,
                get 'February'(){
                    if (DateTime.date.leap) return 29
                    return 28;
                },

                'March': 31,
                'April': 30,
                'May': 31,
                'June': 30,
                'July': 31,
                'August': 31,
                'September': 30,
                'October': 31,
                'November': 30,
                'December': 31,
            }
        },

        days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',null],
        
        daysABRV: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat', null],
        
        months: ['January','February','March','April','May','June','July','August','September','October','November','December', null],
        
        monthsABRV: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Nov', 'Dec', null],
        

    }

    static now() {
        return new Date();
    }

    static stamp() {

        return {

            day: DateTime.today(),
            month: DateTime.thisMonth(),
            year: DateTime.thisYear(),
            date: DateTime.currentDate(),
            time: DateTime.currentTime(),
            isLeap: DateTime.thisYearIsLeap(),
            ms: Date.now(),

        }
    }
    
    static compareStamps(current,prev){
        return DateTime.from( current.ms , prev.ms )
    }

    static today() {
        return DateTime.date.days[ (new Date()).getDay() ];
    }

    static currentTime() {
        return (new Date()).toLocaleTimeString();
    }

    static currentDate() {
        return (new Date()).getDate();
    }

    static thisMonth() {
        return DateTime.date.months[(new Date()).getMonth()];
    }
    
    static thisYear() {
        return ((new Date())).getFullYear();
    }

    static thisYearIsLeap() {
        return DateTime.isLeap(DateTime.thisYear())
    }
    
    static isLeap(year) {
        return ((year % 4 == 0) && (year % 100 !=0)) || (year % 400 == 0)     
    }

    static getLeaps(to,from) {
        function countFrom(lowest,highest) {
            let leapSince = 0;
            for (let i = lowest; i <= highest; i++) {
                if (Datetdate.isLeap(i))
                    leapSince++;
            }
            return leapSince;
        }
        return to < from ? countFrom(to,from) : countFrom(from,to);
    }

    static daysInMonth(month,year) {
        let days = date.monthMap[month];
        if (date.isLeap(year && (month == "February" || month == "Feb")))
            days = 29;
        return days;
    }
    
    static msnMonth(month,year) {
        let days = daysInMonth(month, year)
        let msInMonth = days * DateTime.msnDay;
        return msInMonth;
    }
    
    static hoursAgo(stamp) {
        const then = toHours(stamp);
        const now = toHours(Date.now());
        const diffy = now - then; 
        return diffy;
    }
    
    static secondsAgo(stamp) {
        const then = toSecondsFloat(stamp);
        const now = toSecondsFloat(Date.now());
        const diffy = now - then;
        const ago = {
            seconds: Math.floor(diffy),
            milliseconds: null,
        }
        return ago;
    }
    
    static secondsLeft(milliseconds) {
        const minutes = toMinutesFloat(milliseconds);
        return minutes;
    }
    
    static toSeconds(milliseconds) {
        const seconds = Math.floor(milliseconds / 1000);
        return seconds;
    }
    static toSecondsFloat(milliseconds) {
        const seconds = milliseconds / 1000;
        return seconds;
    }
    
    static toMinutes(milliseconds) {
        let seconds = toSeconds(milliseconds);
        let minutes = Math.floor(seconds / 60);
        return minutes;
    }
    
    static toMinutesFloat(milliseconds) {
        const minutes = toSecondsFloat(milliseconds) / 60;
        const floored = Math.floor(minutes);
        const seconds = Math.floor((minutes - floored) / snm);
    
        const ago = {
            floored: floored,
            minutes: minutes,
            seconds: seconds,
            string: `${minutes} : minutes, and ${seconds} : seconds ago`,
        }
        return ago;
    }
    
    static minutesAgo(stamp) {
        const now = toMinutesFloat(Date.now()).minutes;
        const then = toMinutesFloat(stamp).minutes;
        const minutes = Math.floor(now - then);
        const seconds = Math.floor(((now - then) - Math.floor(now - then)) / snm);
    
        const ago = {
            minutes: minutes,
            seconds: seconds,
            string: `${minutes} minutes, and ${seconds} seconds ago`,
        }
        return ago;
    }
    
    static toHours(milliseconds) {
        let minutes = toMinutes(milliseconds);
        let hours = Math.floor(minutes / 60);
        return hours;
    }
    
    static toHoursFloat(milliseconds) {
        let minutes = toMinutesFloat(milliseconds);
        let hours = minutes / 60;
        return hours;
    }
    
    static toDays(milliseconds) {
        let hours = toHours(milliseconds);
        let days = Math.floor(hours / 24);
        return days;
    }
    
    static toDaysFloat(milliseconds) {
        let hours = toHoursFloat(milliseconds);
        let days = hours / 24;
        return days;
    }
    
    static toMonths(milliseconds) {
    
    }
    
    static toMonthsFloat(milliseconds) {
    
    }
    
    static toYears(milliseconds) {
        let days = toDays(milliseconds);
        let years = Math.floor(days / 365);
        return years;
    }
    
    // const minutesInYear = msnYear;
    
    static from( since, compare = Date.now()) {
        const now = compare;
        const then = since.getTime();
        
        const monthsInYear = 1/12;
        const msInWeek = 604800000;
        const msInDay = 86400000;
        const msInHour = 3600000;
        const msInMin = 60000;
        const msInSec = 1000;
        
        const monthOf = date.months[since.getMonth()]
    
        const daysIn = date.monthMap[monthOf];
        const dayOf = since.getDate();
        const days = daysIn - dayOf;
    
        const leapSince = date.getLeaps(since.getFullYear(), new Date(now).getFullYear())
        let msAgo = now - then;
        let context = 'ago'
        if (msAgo < 0) {
            context = 'til'
        }
    
        msAgo = Math.abs(msAgo);
    
        const years = msAgo / msnYear;
        const monthsAgo = getRemainder(years);
        const months = monthsAgo / monthsInYear;
    
        // const weeks = monthsAgo / weeksInYear;
    
        const weeksAgo = Math.floor(msAgo / msInWeek);
        const daysAgo = (Math.floor(msAgo / msInDay) + leapSince);
        const hoursAgo = Math.floor(msAgo / msInHour);
        const minutesAgo = Math.floor(msAgo / msInMin);
        const secondsAgo = Math.floor(msAgo / msInSec);
    
        const ago = {
            since: new Date(now),
            then: new Date(then),
    
            years: Math.floor(years),
            months: Math.floor(months),
            days: days,
    
            yearsAgo: years,
            weeksAgo: weeksAgo,
            daysAgo: daysAgo,
            hoursAgo: hoursAgo,
            minutesAgo: minutesAgo,
            secondsAgo: secondsAgo,
    
            leaps: leapSince,
            string: undefined,
        };
        
        if (ago.yearsAgo >= 1) {
            if (ago.months >= 1) 
                ago.string = `${ago.years} Years, ${ago.months} Months ${context}`
            else if (ago.months < 1 ) 
                ago.string = `${ago.years} Years ${context}`
        }
    
        else if (ago.weeksAgo < 4 && ago.weeksAgo > 2) {
            ago.string = `${ago.weeksAgo} Weeks ${context}`
        }
    
        else if (ago.daysAgo < 14 && ago.daysAgo > 2) {
            ago.string = `${ago.daysAgo} Days ${context}`
        }
        else if (ago.hoursAgo <= 48 && ago.hoursAgo >= 1) {
            if (ago.hoursAgo < 2 && ago.hoursAgo >=1) {
                ago.string = `${ago.hoursAgo} Hour ${context}`
            } else {
                ago.string = `${ago.hoursAgo} Hours ${context}`
            }
        }
        else if (ago.minutesAgo < 59 && ago.minutesAgo > 1) {
            ago.string = `${ago.minutesAgo} Minutes ${context}`
        }
        else if (ago.secondsAgo < 60 && ago.secondsAgo > 30) {
            ago.string = `${ago.secondsAgo} Seconds ${ago}`
        }
        else if (ago.secondsAgo < 30) {
            ago.string = `Just Now`
        }
        else {
            return ago;
        }
        ago.time = ago.string.split(' ')[0];
        ago.suffix = ago.string.split(' ')[1];
        ago['context'] = context;
    
        return ago;
    }
    
    static getRemainder(float) {
        return float - Math.floor(float);
    }
    
}

// refactor timer to be used without the dom.
// add TimerElement and TrackerElements to build on top of refactor

class Time {
    constructor() {
        // current time
        //      -time.in(ms,hms,hm)
    }

    static get current() {
        return (new Date()).toLocaleTimeString();
    }

    static setTimer(start,end) {
        
    }

    static in(format){
        switch (format) {
            case('ms' || 'miliseconds'):{

            }
            case('hms' || 'hourminutesseconds'):{

            }
            case('hm' || 'hoursminutes'):{

            }
        }
    }

    static get current() {
        return {

        }
    }

}