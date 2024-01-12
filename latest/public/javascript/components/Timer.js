/* 
    TODO 

    ADD EDIT METHOD/ROUTE
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
    }

    update() {
        if (!this.element) return;
        $('.time-slot-wrapper',this.element).innerHTML = this.createTimeSlot();
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
}


export class TimeTracker extends Timer {
    constructor({props}) {
        super({props});

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
    }
}