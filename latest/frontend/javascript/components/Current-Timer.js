import { npTimer } from "./npTimer.js";

export class CurrentTimer {
    constructor() {

        // TODO

        /* 
            FIX TEXT ALIGNMENT FOR TITLE
            ADJUST TIME SECTION FONT COLOR
            ADD BLINKER EFFECT TO STARTED TIMER
            ADD GRADIENT / B&W MOVING SHADOW
            ADD PROGRESS INDICATOR
            ADD BEEP FOR EVER HOUR 
        */
       this.list = [];
    }
    
    getHTML() {
        return `
            <div class="now-playing active">

                <div class="current-timer-title">Now Playing</div>
                <div class="current-timer-list"></div>
            </div>`
    }

    update(timer) {
        this.timer = timer;
        $(".current-timer-title").textContent = timer.title;
    }

    syncPlay(timer) {
        this.timer = timer;
        const {id} = timer;
        if (!this.list.some(i => i.id == id)) {
            let nptimer = new npTimer(timer)
            this.list.push({id,timer:nptimer})

            let thisList = $('.now-playing .current-timer-list');
            if (!thisList) return;

            nptimer.render(thisList)
            nptimer.play();
        }
        // $(".now-playing .play").classList.remove("current");
        // $(".now-playing .pause").classList.add("current");
        $(".current-timer-title").textContent = timer.title;
        // $(".now-playing .current-timer-time-slot").innerHTML = timer.createTimeSlot();
    }

    syncPause(timer) {
        if (this.list.some(i => i.id == timer.id)){
            let nptimer = this.list.find(i => i.id == timer.id).timer;
            nptimer.pause();
        }
        // $(".now-playing .play").classList.add("current");
        // $(".now-playing .pause").classList.remove("current");
    }
    syncComplete(timer) {
        // $(".now-playing .play").classList.add("current");
        // $(".now-playing .pause").classList.remove("current");
        // $(".now-playing .time-slot").innerHTML = timer.createTimeSlot();
    }
}