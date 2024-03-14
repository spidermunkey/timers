import { AbstractTimer } from "./Abstract-Timer.js";
import { NewTimerForm } from "./New-Timer-Form.js";

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
        // $(".current-timer-time-slot").innerHTML = timer.createTimeSlot();
    }

    syncPlay(timer) {
        this.timer = timer;
        // $(".now-playing .play").classList.remove("current");
        // $(".now-playing .pause").classList.add("current");
        $(".current-timer-title").textContent = timer.title;
        // $(".now-playing .current-timer-time-slot").innerHTML = timer.createTimeSlot();
    }

    syncPause(timer) {
        // $(".now-playing .play").classList.add("current");
        // $(".now-playing .pause").classList.remove("current");
    }
    syncComplete(timer) {
        // $(".now-playing .play").classList.add("current");
        // $(".now-playing .pause").classList.remove("current");
        // $(".now-playing .time-slot").innerHTML = timer.createTimeSlot();
    }
}