import { AbstractTimer } from "./Abstract-Timer.js";
import { NewTimerForm } from "./New-Timer-Form.js";

export class CurrentTimer {
    constructor(startingTimer) {

    }
    
    getHTML() {
        return `
            <div class="now-playing">
                <div class="current-timer-title">Now Playing</div>
                <div class="current-timer-time-slot"></div>
                <div class="current-timer-controls">
                    <div class="play ctrl current">
                        <span class="control">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="40px" width="40px" transform="rotate(90)" data-rotation="undefined">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
                        </span>
                    </div>
                    <div class="pause ctrl">
                        <span class="control">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"  height="40px" width="40px">
                                <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. -->
                                <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"></path>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>`
    }

    update(timer) {
        this.timer = timer;
        $(".current-timer-title").textContent = timer.title;
        $(".current-timer-time-slot").innerHTML = timer.createTimeSlot();
    }

    syncPlay(timer) {
        this.timer = timer;
        $(".now-playing .play").classList.remove("current");
        $(".now-playing .pause").classList.add("current");
        $(".current-timer-title").textContent = timer.title;
        $(".now-playing .current-timer-time-slot").innerHTML = timer.createTimeSlot();
    }

    syncPause(timer) {
        $(".now-playing .play").classList.add("current");
        $(".now-playing .pause").classList.remove("current");
    }
    syncComplete(timer) {
        $(".now-playing .play").classList.add("current");
        $(".now-playing .pause").classList.remove("current");
        $(".now-playing .time-slot").innerHTML = timer.createTimeSlot();
    }
}