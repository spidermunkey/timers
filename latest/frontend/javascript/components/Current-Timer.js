import { npTimer } from "./npTimer.js";

export class CurrentTimer {
    constructor() {

        // TODO

        /* 
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
    }

    syncPlay(timer) {
        this.timer = timer;
        const {id} = timer;
        if (!this.list.some(i => i.id == id)) {
            let nptimer = new npTimer(timer)
            let x = {id,timer:nptimer}
            this.list.push(x)

            let thisList = $('.now-playing .current-timer-list');
            if (!thisList) return;

            nptimer.render(thisList);
            nptimer.play();
            nptimer.remove = () => {
                nptimer.timer.complete();
                nptimer.element.remove();
                console.log(this.list.indexOf(x))
                let i = this.list.indexOf(x);
                this.list.splice(i,1)
            }
        }

    }

    syncPause(timer) {
        if (this.list.some(i => i.id == timer.id)){
            let nptimer = this.list.find(i => i.id == timer.id).timer;
            nptimer.pause();
        }
    }
    syncComplete(timer) {
        // $(".now-playing .play").classList.add("current");
        // $(".now-playing .pause").classList.remove("current");
        // $(".now-playing .time-slot").innerHTML = timer.createTimeSlot();
    }
}