export class npTimer {
    constructor(timer) {
        this.timer = timer;

        this.element = document.createElement('div');
        this.element.classList.add('np-timer')
        this.element.setAttribute('uuid',timer.id);
        this.element.innerHTML = `
            <div class="timer--clock-controls">
            <div class="ctrl-wrapper">
                <div class="playpause ctrl current">
                    <span class="control">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="18 28 345 460" height="40px" width="40px">
                    <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"></path></svg>
                    </span>
                </div>
                <div class="pause ctrl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="54 93 211 337" height="40px" width="40px">
                <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path></svg>
                </div>
            </div>
            </div>
        <div class="t-slot-wrapper">
            ${this.timer.createTimeSlot()}
        </div>
        <div class="timer-title">${this.timer.title}</div>

        `;
    }



    render(destination) {
        destination.append(this.element)
    }

    remove() {
        this.element.remove();
    }

    play() {
        console.log('playing');
        this.timer.onTick(() => {
            console.log(this.element)
            $('.t-slot-wrapper',this.element).innerHTML = this.timer.createTimeSlot();
        })
        this.showPlaying();
    }

    pause() {
        this.showPaused();
    }

    showPlaying() {
        this.element.querySelector(".ctrl.play").classList.remove("current");
        this.element.querySelector(".ctrl.pause").classList.add("current");
      }
      
      showPaused() {
        this.element.querySelector(".ctrl.play").classList.add("current");
        this.element.querySelector(".ctrl.pause").classList.remove("current");
      }

}