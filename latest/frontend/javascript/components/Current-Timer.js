import { RecentTimer } from "./Recent-Timer.js";
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
       this.recent = [];
       this.element = document.createElement('div');
       this.element.classList.add('now-playing');
       this.element.innerHTML = this.getHTML();
    }

    render(destination) {
        destination.appendChild(this.element)
    }
    
    getHTML() {
        return `
            <div class="current-timer-title">Now Playing</div>
            <div class="current-timer-list">
                <div class="placeholder current">No Timers Running</div>
            </div>
            <div class="recent-timer-title">Recent Timers</div>
            <div class="recent-timer-list">
                <div class="placeholder recent">No Recent Timers</div>
            </div>`
    }

    update(timer) {
        this.timer = timer;
    }

    syncPlay(timer) {

        const id = timer.id;
        const timerNoExist = !this.list.some(i => i.id == id);

        if (timerNoExist) {
            let nptimer = new npTimer(timer)
            let x = {id,timer:nptimer}
            let thisList = $('.now-playing .current-timer-list');
            this.list.push(x)
            
            
            if (!thisList) return;

            let placeholder = $('.placeholder',thisList)
            
            if (placeholder) placeholder.remove();

            nptimer.render(thisList);
            nptimer.play();
            nptimer.remove = () => {
                nptimer.timer.complete();
                nptimer.element.remove();
                console.log(this.recent.some(i => i.id == id))
                console.log(this.recent)
                let i = this.list.indexOf(x);
                this.list.splice(i,1);

                if (!this.recent.some(i => i.id == id)) {

                    let rtimer = new RecentTimer(timer);
                    this.recent.push(x)
                    if (this.recent.length > 0 && $('.recent-timer-list .placeholder')) 
                        $('.recent-timer-list .placeholder').remove();
                    rtimer.render($('.now-playing .recent-timer-list'))
                }

                if (this.list.length == 0) {
                    let placeholder = document.createElement('div');
                    placeholder.classList.add('placeholder')
                    placeholder.innerText = "No Timers Running";
                    thisList.append(placeholder)
                }
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