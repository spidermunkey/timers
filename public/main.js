class Timer {
    constructor(title,time) {
        this.currentInterval = null;
        this.title = title;
        this.time = this.initial = (()=>{
            let {hours,minutes,seconds} = time;
            // convert all to ms
            const msInSeconds = 1000;
            const msInMinutes = 60000;
            const msInHours = 3600000;

            const total = (hours * msInHours) + (seconds * msInSeconds) + (minutes * msInMinutes);
            return {
                hours,
                minutes,
                seconds,
                total
            }

        })();

        console.log(this.time, Timer.formatMs(this.time.total))
        this.uuid = uuid();


    }

    get element(){
            
    }

    padNum(num) {
        if (num.toString().length == 1)
            return num.toString().padStart(2,'0')
        else 
            return num.toString();
    }
    
    play() {
        if(this.currentInterval)
            return
        let t = Timer.formatMs(this.time.total - 1000);
        if (Math.round(t.total) < 0)
            this.reset();
        this.currentInterval = setInterval(this.decer.bind(this),1000)

    }

    decer() {
        let t = Timer.formatMs(this.time.total - 1000);
        
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
        return;
    }

    stop(){
        clearInterval(this.currentInterval)
        this.currentInterval = null;
    }

    reset() {
        clearInterval(this.currentInterval)
        this.currentInterval = null;
        this.time = structuredClone(this.initial);
        this.update();
        $(`[data-id="${this.uuid}"] .play`).classList.add('current')
        $(`[data-id="${this.uuid}"] .pause`).classList.remove('current')
    }


    create() {

        let {hours,minutes,seconds} = this.time;
        console.log(hours,minutes,seconds);

        hours = this.padNum(hours);
        minutes = this.padNum(minutes);
        seconds = this.padNum(seconds);

        let html = createTimerElement(this.title, hours, minutes ,seconds );
        let fragment = frag();
        let element = div();

        element.innerHTML = html;
        element.dataset.id = this.uuid;
        fragment.appendChild(element);
        console.log(element);
        console.log(fragment)
        return fragment;
    }

    render(destination){
        const frag = this.create();
        destination.appendChild(frag);
        listen($(`[data-id="${this.uuid}"] .ctrl-wrapper`),() => {
            if (!this.currentInterval){
                this.play();
                $(`[data-id="${this.uuid}"] .pause`).classList.add('current')
                $(`[data-id="${this.uuid}"] .play`).classList.remove('current')
            }
            else if (this.currentInterval) {
                this.pause();
                $(`[data-id="${this.uuid}"] .play`).classList.add('current')
                $(`[data-id="${this.uuid}"] .pause`).classList.remove('current')
            }

        })
    }

    update() {
        let {hours,minutes,seconds} = this.time
        hours = this.padNum(hours);
        minutes = this.padNum(minutes);
        seconds = this.padNum(seconds);

        $(`[data-id="${this.uuid}"] .time-slot-wrapper`).innerHTML = createTimeSlot({hours,minutes,seconds})
    }


    static timeInMs({hours,minutes,seconds}) {
            // convert all to ms
            secondsInMS = seconds * 1000;
            minutesInMs = minutes * 60000;
            hoursInMs = hours * 3600000;

            return hours + seconds + minutes

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
}

function createTimerElement(title,hours,minutes,seconds) {
    return `
    <div class="timer">
        <div class="timer--header">
            <div class="timer--header-title">
                <span class="label">${title}</span>
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
                <div class="time-slot-wrapper">
                    <div class="hours time-slot">
                        <span class="tenth-hour">${hours[0] || 0}</span>
                        <span class="zero-hour">${hours[1] || 0}</span>
                        <span class="label">h</span>
                    </div>
                    <div class="minutes time-slot">
                        <div class="tenth-minute">${minutes[0] || 0}</div>
                        <div class="zero-minute">${minutes[1] || 0}</div>
                        <span class="label">m</span>
                    </div>
                    <div class="seconds time-slot">
                        <div class="tenth-second">${seconds[0] || 0}</div>
                        <div class="zero-second">${seconds[1] || 0}</div>
                        <span class="label">s</span>
                    </div>
                </div>

            </div>
        </div>
    </div>`
}

function createTimeSlot({hours,minutes,seconds}) {
    return `
    <div class="hours time-slot">
        <span class="tenth-hour">${hours[0] || 0}</span>
        <span class="zero-hour">${hours[1] || 0}</span>
        <span class="label">h</span>
    </div>
    <div class="minutes time-slot">
        <div class="tenth-minute">${minutes[0] || 0}</div>
        <div class="zero-minute">${minutes[1] || 0}</div>
        <span class="label">m</span>
    </div>
    <div class="seconds time-slot">
        <div class="tenth-second">${seconds[0] || 0}</div>
        <div class="zero-second">${seconds[1] || 0}</div>
        <span class="label">s</span>
    </div>`
}

let Test = new Timer('test',{
    hours: 0,
    minutes: 0,
    seconds: 4,
})

Test.render($('.timer-list'));

listen($('.btn-toggle--form'), ()=>$('.create-timer').classList.toggle('active'));
listen($('.create-timer .close'),()=> {
    $('.create-timer').classList.remove('active');
})
listen($('.reset'),Test.reset.bind(Test))

const dayinps = $$('.inp-field[data-type="day"] input[type="checkbox"]');
console.log(dayinps);

const neverInput = $('.inp-field[data-type="binary"] .option[data-option="never"] input[type="checkbox"]');
console.log(neverInput)
const everyInput = $('.inp-field[data-type="binary"] .option[data-option="every"] input[type="checkbox"]');
console.log(everyInput)

dayinps.forEach(inp => {
    inp.addEventListener('input',(e) => {
        if(dayinps.some(inp => inp.checked == true))
            neverInput.checked = false;
        else if (dayinps.every(inp => inp.checked == false))
            neverInput.checked = true;
        
        if (dayinps.some(inp => inp.checked == false))
            everyInput.checked = false;

        if (dayinps.every(inp => inp.checked == true))
            everyInput.checked = true;
    })
})
neverInput.addEventListener('input',(e) => {
    console.log(neverInput.checked)
    if (neverInput.checked)
        everyInput.checked = false;

    dayinps.forEach(inp => inp.checked = false)
})

everyInput.addEventListener('input',(e) => {
    if (everyInput.checked) {
        neverInput.checked = false;
        dayinps.forEach(inp => inp.checked = true)
    }

})