/* 
    TODO 

    REFACTOR TO ACCEPT PROPERTIES
    ADD DAYS TO SHOW
    ADD DELETE/DESTROY FUNCTION
    CREATE TIME TRACKER CLASS

*/

// export class Timer {
//     constructor(title,time) {
//         this.currentInterval = null;
//         this.title = title;
//         this.time = this.initial = (() => {
//             let {hours,minutes,seconds} = time;
//             // convert all to ms
//             const msInSeconds = 1000;
//             const msInMinutes = 60000;
//             const msInHours = 3600000;

//             const total = (hours * msInHours) + (seconds * msInSeconds) + (minutes * msInMinutes);
//             return {
//                 hours,
//                 minutes,
//                 seconds,
//                 total
//             }

//         })();

//         console.log(this.time, Timer.formatMs(this.time.total))
//         this.uuid = uuid();


//     }

//     get element(){
            
//     }

//     parseNum(num) {
//         if (Array.isArray(num)) 
//             return num.join('');
//     }

//     padNum(num) {
//         if (num.toString().length == 1) return num.toString().padStart(2,'0');
//         else return num.toString();
//     }
    
//     play() {
//         if(this.currentInterval)
//             return
//         let t = Timer.formatMs(this.time.total - 1000);
//         if (Math.round(t.total) < 0)
//             this.reset();
//         this.currentInterval = setInterval(this.decer.bind(this),1000)

//     }

//     decer() {
//         let t = Timer.formatMs(this.time.total - 1000);
        
//         if (Math.round(t.total) < 0) {
//             this.time = Timer.formatMs(0);
//             console.log(this.time,this.initial);

//             clearInterval(this.currentInterval);
//             this.currentInterval = null;
//             return;
//         }

//         this.time = t;
//         this.update();
//     }

//     pause(){
//         clearInterval(this.currentInterval);
//         this.currentInterval = null;
//         return;
//     }

//     stop(){
//         clearInterval(this.currentInterval)
//         this.currentInterval = null;
//     }

//     reset() {
//         clearInterval(this.currentInterval)
//         this.currentInterval = null;
//         this.time = structuredClone(this.initial);
//         this.update();
//         $(`[data-id="${this.uuid}"] .play`).classList.add('current')
//         $(`[data-id="${this.uuid}"] .pause`).classList.remove('current')
//     }


//     create() {

//         let {hours,minutes,seconds} = this.time;
//         console.log(hours,minutes,seconds);

//         hours = this.padNum(hours);
//         minutes = this.padNum(minutes);
//         seconds = this.padNum(seconds);

//         let html = this.createTimerElement(this.title, hours, minutes ,seconds );
//         let fragment = frag();
//         let element = div();

//         element.innerHTML = html;
//         element.dataset.id = this.uuid;
//         fragment.appendChild(element);
//         console.log(element);
//         console.log(fragment)
//         return fragment;
//     }

//     render(destination){
//         const frag = this.create();
//         destination.appendChild(frag);
//         listen($(`[data-id="${this.uuid}"] .ctrl-wrapper`),() => {
//             if (!this.currentInterval){
//                 this.play();
//                 $(`[data-id="${this.uuid}"] .pause`).classList.add('current')
//                 $(`[data-id="${this.uuid}"] .play`).classList.remove('current')
//             }
//             else if (this.currentInterval) {
//                 this.pause();
//                 $(`[data-id="${this.uuid}"] .play`).classList.add('current')
//                 $(`[data-id="${this.uuid}"] .pause`).classList.remove('current')
//             }

//         })
//     }

//     update() {
//         let {hours,minutes,seconds} = this.time
//         hours = this.padNum(hours);
//         minutes = this.padNum(minutes);
//         seconds = this.padNum(seconds);

//         $(`[data-id="${this.uuid}"] .time-slot-wrapper`).innerHTML = this.createTimeSlot({hours,minutes,seconds})
//     }


//     static timeInMs({hours,minutes,seconds}) {
//             // convert all to ms
//             secondsInMS = seconds * 1000;
//             minutesInMs = minutes * 60000;
//             hoursInMs = hours * 3600000;

//             return hours + seconds + minutes

//     }

//     static formatMs(ms) {

//         const msInSeconds = 1000;
//         const msInMinutes = 60000;
//         const msInHours = 3600000;

//         const approxHour = ms / 3600000;
//         const hours = Math.floor(approxHour);
//         const hoursFloat = approxHour - hours;
        
//         const approxMinutes = hoursFloat * msInHours / msInMinutes;
//         const minutes = Math.floor(approxMinutes);
//         const minutesFloat = approxMinutes - minutes;

//         const seconds = Math.round(minutesFloat * msInMinutes / msInSeconds)
        
//         return {
//             hours,
//             minutes,
//             seconds,
//             total:ms,
//         }
//     }

//     createTimerElement(title,hours,minutes,seconds) {
//         return `
//         <div class="timer">
//             <div class="timer--header">
//                 <div class="timer--header-title">
//                     <span class="label">${title}</span>
//                 </div>
//                 <div class="timer--header-options">
//                     <div class="timer--header-options__icon">
//                         <span class="label">show options</span>
//                     </div>
//                 </div>
//             </div>
//             <div class="timer--clock">
//                 <div class="timer--clock-controls">
//                     <div class="ctrl-wrapper">
//                         <div class="play ctrl current">
//                             <span class="control">play</span>
//                         </div>
//                         <div class="pause ctrl">
//                             <span class="control">pause</span>
//                         </div>
//                     </div>
//                     <div class="reset">reset</div>
    
//                 </div>
    
//                 <div class="timer--clock-times">
//                     <div class="time-slot-wrapper">
//                         <div class="hours time-slot">
//                             <span class="tenth-hour">${hours[0] || 0}</span>
//                             <span class="zero-hour">${hours[1] || 0}</span>
//                             <span class="label">h</span>
//                         </div>
//                         <div class="minutes time-slot">
//                             <div class="tenth-minute">${minutes[0] || 0}</div>
//                             <div class="zero-minute">${minutes[1] || 0}</div>
//                             <span class="label">m</span>
//                         </div>
//                         <div class="seconds time-slot">
//                             <div class="tenth-second">${seconds[0] || 0}</div>
//                             <div class="zero-second">${seconds[1] || 0}</div>
//                             <span class="label">s</span>
//                         </div>
//                     </div>
    
//                 </div>
//             </div>
//         </div>`
//     }
    
//     createTimeSlot({hours,minutes,seconds}) {
//         return `
//         <div class="hours time-slot">
//             <span class="tenth-hour">${hours[0] || 0}</span>
//             <span class="zero-hour">${hours[1] || 0}</span>
//             <span class="label">h</span>
//         </div>
//         <div class="minutes time-slot">
//             <div class="tenth-minute">${minutes[0] || 0}</div>
//             <div class="zero-minute">${minutes[1] || 0}</div>
//             <span class="label">m</span>
//         </div>
//         <div class="seconds time-slot">
//             <div class="tenth-second">${seconds[0] || 0}</div>
//             <div class="zero-second">${seconds[1] || 0}</div>
//             <span class="label">s</span>
//         </div>`
//     }
// }

export class Timer {
    constructor({props}) {

        console.log(props)
        this.currentInterval = null;

        this.title = props.title;

        this.time = props.time;

        this.initial = props.initial || structuredClone(props.time);

        this.id = props.id || uuid();

        this.element = undefined;

    }

    padNum(num) {
        if (num.toString().length == 1) return num.toString().padStart(2,'0')
        else return num.toString();
    }
    
    play() {
        if (this.currentInterval) return;

        let t = Timer.formatMs(this.time.total - 1000);

        if (Math.round(t.total) < 0) this.reset();

        this.currentInterval = setInterval(this.decer.bind(this),1000);

        $('.pause',this.element).classList.add('current');
        $('.play',this.element).classList.remove('current');

    }

    decer() {
        let t = Timer.formatMs(this.time.total - 1000);
        console.log(t)
        if (Math.round(t.total) < 0) {
            this.time = Timer.formatMs(0);
            console.log(this.time,this.initial);

            clearInterval(this.currentInterval);
            this.currentInterval = null;
            return;
        }

        this.time = t;
    
        this.update();
    }

    pause(){

        clearInterval(this.currentInterval);
        this.currentInterval = null;

        $('.play',this.element).classList.add('current');
        $('.pause',this.element).classList.remove('current');

        return;
    }

    stop(){
        clearInterval(this.currentInterval);
        this.currentInterval = null;
    }

    reset() {
        console.log('reset')
        clearInterval(this.currentInterval);
        this.currentInterval = null;
        this.time = structuredClone(this.initial);
        this.update();
        $(`[data-id="${this.id}"] .play`).classList.add('current');
        $(`[data-id="${this.id}"] .pause`).classList.remove('current');
    }


    create() {

        let html = this.createTimerElement();
        let fragment = frag();
        let element = div();

        element.innerHTML = html;
        element.dataset.id = this.id;
        fragment.appendChild(element);

        return fragment;
    }

    render(destination){
        const frag = this.create();
        this.element = $(`[data-id="${this.id}"]`,frag);
        destination.appendChild(frag);

        listen($('.ctrl-wrapper',this.element),() => {
            if (!this.currentInterval){
                this.play();
            }
            else if (this.currentInterval) {
                this.pause();
            }
        });
        listen($('.reset',this.element), this.reset.bind(this));
        listen($('.delete',this.element),this.delete.bind(this))
    }

    update() {
        $('.time-slot-wrapper',this.element).innerHTML = this.createTimeSlot();
    }

    delete() {
        console.log(api,'delete');
    }


    static timeInMs({hours,minutes,seconds}) {
            // convert all to ms
            let
                msSeconds = seconds * 1000,
                msMinutes = minutes * 60000,
                msHours = hours * 3600000;

            return msHours + msSeconds + msMinutes;

    }

    static formatMs(ms) {

        const msInSeconds = 1000;
        const msInMinutes = 60000;
        const msInHours = 3600000;

        const approxHour = ms / 3600000;
        const hours = Math.floor(approxHour);
        const hoursFloat = approxHour - hours;
        
        const approxMinutes = hoursFloat * msInHours / msInMinutes;
        const minutes = Math.floor(approxMinutes);
        const minutesFloat = approxMinutes - minutes;

        const seconds = Math.round(minutesFloat * msInMinutes / msInSeconds)
        
        return {
            hours,
            minutes,
            seconds,
            total:ms,
        }
    }

    createTimerElement() {
        return `
        <div class="timer">
            <div class="timer--options">
                <div class="option delete">
                    <span class="label">delete</span>
                </div>
                <div class="option edit">
                    <span class="label">edit</span>
                </div>
            </div>
            <div class="timer--header">
                <div class="timer--header-title">
                    <span class="label">${this.title}</span>
                </div>
                <div class="timer--header-options">
                    <div class="timer--header-options__icon">
                        <span class="label">show options</span>
                    </div>
                </div>
            </div>
            <div class="timer--clock">
                <div class="timer--clock-controls">
                    <div class="ctrl-wrapper">
                        <div class="play ctrl current">
                            <span class="control">play</span>
                        </div>
                        <div class="pause ctrl">
                            <span class="control">pause</span>
                        </div>
                    </div>
                    <div class="reset">reset</div>
    
                </div>
    
                <div class="timer--clock-times">
                    <div class="time-slot-wrapper">${this.createTimeSlot()}</div>
    
                </div>
            </div>
        </div>`
    }
    
    createTimeSlot() {
        const {hours,minutes,seconds} = this.time;
        let 
            h = this.padNum(hours),
            m = this.padNum(minutes),
            s = this.padNum(seconds);

        return `
        <div class="hours time-slot">
            <span class="tenth-hour">${h[0] || 0}</span>
            <span class="zero-hour">${h[1] || 0}</span>
            <span class="label">h</span>
        </div>
        <div class="minutes time-slot">
            <div class="tenth-minute">${m[0] || 0}</div>
            <div class="zero-minute">${m[1] || 0}</div>
            <span class="label">m</span>
        </div>
        <div class="seconds time-slot">
            <div class="tenth-second">${s[0]|| 0}</div>
            <div class="zero-second">${s[1] || 0}</div>
            <span class="label">s</span>
        </div>`
    }
}