/* 
    TODO 

    CREATE SECTION FOR ALL TRACKERS

    UPDATE UI DESIGN
        --add sound
*/

import {api} from '../api/app';

export class Timer {
    // DEFAULTS TO COUNTDOWN
    constructor({props}) {

        this.currentInterval = null;

        this.days = props.days || [];

        this.title = props.title;

        this.time = props.time;

        this.initial = props.initial || structuredClone(props.time);

        this.id = props.id || uuid();

        this.element = undefined;
        
        let today = new Date();

        let dow = ['sun','mon','tue','wed','thu','fri','sat'];

        this.isToday = this.days.some(day => day === dow[today.getDay()]) || null;
    }

    padNum(num) {
        if (num.toString().length == 1) 
            return num.toString().padStart(2,'0')
        else return num.toString();
    }
    
    play() {
        if (this.currentInterval) return;
        this.currentInterval = setInterval(this.countdown.bind(this),1000);
    }

    decer() {
        console.log(this.time)
        let t = Timer.formatMs(this.time.total - 1000);

        if (Math.round(t.total) <= 0) {
            t = Timer.formatMs(0);
            clearInterval(this.currentInterval);
            this.currentInterval = null;
            return t
        }

        return t;
    }

    incer() {
        let t = Timer.formatMs(this.time.total + 1000);

        if (Math.round(t.total) < 0) {
            t = Timer.formatMs(0);
            clearInterval(this.currentInterval);
            this.currentInterval = null;
            return t
        }

        return t;
    }

    pause(){

        clearInterval(this.currentInterval);
        this.currentInterval = null;
        this.showPaused();
        console.log(this)
        return;
    }

    stop(){
        clearInterval(this.currentInterval);
        this.currentInterval = null;
    }

    reset() {
        clearInterval(this.currentInterval);
        this.currentInterval = null;
        this.time = structuredClone(this.initial);
    }
    
    resetView() {
        this.showPaused();
        this.reset();
        this.update();
    }

    countdown() {
        this.time = this.decer();

        if (this.time.total <= 0) 
            return this.resetView();
        this.update();
    }


    create(type) {

        let html = this.createTimerElement(type);
        let fragment = frag();
        let element = div();

        element.innerHTML = html;
        element.dataset.id = this.id;
        fragment.appendChild(element);

        return fragment;
    }

    showPlaying() {
        if (!this.element) return;
        $('.pause',this.element).classList.add('current');
        $('.play',this.element).classList.remove('current');
    }
    
    showPaused() {
        console.log(this)
        if (!this.element) return;
        $('.play',this.element).classList.add('current');
        $('.pause',this.element).classList.remove('current');
    }

    render(destination,type){
        const frag = this.create(type);
        this.element = $(`[data-id="${this.id}"]`,frag);
        destination.appendChild(frag);

        this.hydrate();
    }

    hydrate() {
        listen($('.ctrl-wrapper',this.element),() => {
            if (!this.currentInterval){
                this.showPlaying();
                this.play();
            }
            else if (this.currentInterval) {
                this.showPaused();
                this.pause();
            }
        });
        listen($('.reset',this.element), this.resetView.bind(this));
        listen($('.delete',this.element),this.delete.bind(this));
        listen($('.edit',this.element), this.showEditForm.bind(this));
    }

    update() {
        if (!this.element) return;
        $('.time-slot-wrapper',this.element).innerHTML = this.createTimeSlot();
    }

    showEditForm() {
        let el = div();
        el.innerHTML = this.createEditForm();
        hydrateForm.call(this);
        el.classList.add('edit-timer');
        el.style.display = 'block';

        $('.timer-list').appendChild(el);

        function hydrateForm() {
            let form = $('form',el);

            form.addEventListener('submit',(e) => submit.call(this,e,form));
            form.querySelector('.close').addEventListener('click',() => {
                el.remove();
            })
            async function submit(event,form){
                console.log(arguments)
                event.preventDefault();

                const fdo = new FormData(form);
                let props = parseForm(fdo,form)
                console.log(this.id)
                console.log(props.id);
                props.id = this.id
                let newDoc = await api.edit(this.id, props);
        
                if (newDoc){

                    this.edit(newDoc);
                    el.remove();
                }
            }
        }

        function parseForm(formDataObject,form){

            let fdo = formDataObject;
            console.log(fdo)
            for (const entry of fdo)
                if (entry[1].trim() === '') entry[1] = 0;
        
                    // Get the values of the checkboxes for days
            let days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].filter(day => {
                let checkbox = $(`.inp-field[data-type="day"] input[name="day"][data-day="${day}"]`,form);
        
                if (checkbox && checkbox.checked){
                    console.log(day)
                    return true
                }
            });
            console.log(days)
        
            let
                title = fdo.get('title'),
                hours = fdo.getAll('hours').join(''),
                minutes = fdo.getAll('minutes').join(''),
                seconds = fdo.getAll('seconds').join(''),
                total = Timer.timeInMs({hours,minutes,seconds}),
                id = uuid(),
                time = { hours, minutes, seconds, total },
                initial = time;
        
            return {
                title,
                id,
                time,
                days,
                initial
            };
        }


        console.log(el)
    }

    edit(props) {

        this.days = props.days || [];

        this.title = props.title;

        this.time = props.time;

        this.initial = props.initial || structuredClone(props.time);

        this.id = props.id || uuid();

        let today = new Date();

        let dow = ['sun','mon','tue','wed','thu','fri','sat'];

        this.isToday = this.days.some(day => day === dow[today.getDay()]) || null;

        const frag = this.create();
        this.element = $(`[data-id="${this.id}"]`,frag);
        $(`[data-id="${this.id}"]`,$('.timer-list')).replaceWith(this.element);
        this.hydrate();
        
    }

    async delete() {
        console.log(api,'delete');
        const deleted = api.delete(this.id);
        if (deleted){
            this.element.remove();
            this.element = null;
        }
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

    createTimerElement(type) {
        return `
        <div class="timer" ${type ? `data-type=${type}`: null} >
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
                        <span class="label show">show options</span>
                        <span class="lable hide">hide options</span>
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

    createEditForm(){
        return `                
        <form action="#" id="edit-timer">

        <div class="close">x</div>
        <div class="new-timer--form">
            <div class="new-timer--form-field" data-field="title">
                <span class="inp-field" data-type="title">
                    <span class="label">Title</span>
                    <input type="text" name="title" id="form-title" autocomplete="off" value="${this.title}" required>
                </span>
            </div>
            <div class="new-timer--form-field" data-field="time">
                <span class="inp-field" data-type="hours">
                    <input name="hours" id="nHours" value="${this.time.hours[0]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <input name="hours" id="0Hours" value="${this.time.hours[1]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <span class="label">h</span>
                </span>
                <span class="inp-field" data-type="minutes">
                    <input name="minutes" id="nMinutes" value="${this.time.minutes[0]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <input name="minutes" id="0Minutes" value="${this.time.minutes[1]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <span class="label">m</span>
                </span>
                <span class="inp-field" data-type="seconds">
                    <input name="seconds" id="nSeconds" value="${this.time.seconds[0]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <input name="seconds" id="0Seconds" value="${this.time.seconds[1]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <span class="label">s</span>
                </span>
            </div>
            <div class="new-timer--form-field" data-field="occurance">
                <div class="inp-field" data-type="day">
                    <label for="mon">
                        <span class="label">M</span>
                    </label>
                    <input type="checkbox" name="day" data-day="mon" ${this.days.some(day => day === 'mon') ? 'checked' : null }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="tue">
                        <span class="label">T</span>
                    </label>
                    <input type="checkbox" name="day" data-day="tue" id="tue"${this.days.some(day => day === 'tue') ? 'checked' : null }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="wed">
                        <span class="label">W</span>
                    </label>
                    <input type="checkbox" name="day" data-day="wed" data-day="wed" id="wed"${this.days.some(day => day === 'wed') ? 'checked' : null }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="thu">
                        <span class="label">T</span>
                    </label>
                    <input type="checkbox" name="day" data-day="thu" id="thu"${this.days.some(day => day === 'thu') ? 'checked' : null }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="fri">
                        <span class="label">F</span>
                    </label>
                    <input type="checkbox" name="day" data-day="fri" id="fri"${this.days.some(day => day === 'fri') ? 'checked' : null }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="sat">
                        <span class="label">S</span>
                    </label>
                    <input type="checkbox" name="day" data-day="sat" id="sat"${this.days.some(day => day === 'sat') ? 'checked' : null }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="sun">
                        <span class="label">S</span>
                    </label>
                    <input type="checkbox" name="day" data-day="sun" id="sun"${this.days.some(day => day === 'sun') ? 'checked' : null }>
                </div>
                <div class="inp-field" data-type="binary">
                    <div class="option" data-option="never">
                        <label for="never">
                            <span class="label">never</span>
                        </label>
                        <input type="checkbox" name="never" id="never" ${this.days.length == 0 ? 'checked' : null }>
                    </div>
                    <div class="option" data-option="every">
                        <label for="everyday">
                            <span class="label">everyday</span>
                        </label>
                        <input type="checkbox" name="every" id="every" ${this.days.length == 7 ? 'checked' : null }>
                    </div>
                </div>
            </div>
            <div class="tod-modal">
                <div class="option selected">
                    <span class="label">ANY</span>
                </div>
                <div class="option">
                    <div class="hour">
                        <span class="nHour">05</span>
                        <span class="breaker">:</span>
                        <span class="0hour">00</span>
                    </div>
                    <div class="minute"></div>
                </div>
            </div>
            <span class="btn-create">
                <span class="label">Edit</span>
                <input type="submit" name="create" id="btn-create">
            </span>
        </div>
    </form>`
    }
}


export class TimeTracker extends Timer {
    constructor({props}) {
        super({props});

        this.logs = [];

        this.initial = Timer.formatMs(0);
        this.successTime = props.successTime; 
        this.onSuccess = props.onSucces || function() {
            console.log(`${this.title} tracker has completed`);
            if (this.element)
                $('.timer',this.element).classList.add('complete')

        };

        this.success = false;

        this.resetAfterSuccess = props.resetOnSuccess || false;
    }

    countup() {
        this.time = this.incer();
        if (this.success === false && this.time.total >= this.successTime.total){
            this.success = true;
            this.onSuccess();
        }
        if (this.resetOnSuccess)
            return this.resetView();
        else this.update();
    }

    play() {
        if (this.currentInterval) return;
        this.currentInterval = setInterval(this.countup.bind(this),1000);
        this.logStart();
    }

    pause(){

        clearInterval(this.currentInterval);
        this.currentInterval = null;
        this.showPaused();
        this.logStop();
        return;
    }

    logStart() {

        let stamp = DateTime.stamp();
        let log = {
            type: 'start',
            tID: this.id,
            task: this.title,
            elapsed: this.time,
            stamp,
        }
        console.log(log);
        this.logs.push(log);
        return log;
    }

    logStop() {

        let stamp = DateTime.stamp();
        let completed = this.time.total >= this.successTime.total
        let prevLog = last(this.logs)
        let comp = DateTime.from(new Date(prevLog.stamp.ms));
        let since = {
            hours: comp.hours,
            minutes: comp.minutes,
            seconds: comp.seconds,
        }

        let log = {
            type: 'stop',
            tID: this.id,
            task: this.title,
            elapsed: this.time,
            sinceLastStop: since,
            completed,
            stamp,
        }

        console.log(log)
        return log;

    }

    logComplete(){

    }
}