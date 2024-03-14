export class RecentTimer {
    constructor(timer) {
        this.timer = timer
        this.element = document.createElement('div');
        this.element.classList.add('recent-timer');
        this.element.setAttribute('state','');
        this.element.innerHTML = this.getHTML();
    }


    render(destination) {
        destination.appendChild(this.element);
        this.hydrate();
    }

    hydrate() {
        this.element.addEventListener('click',this.timer.play.bind(this.timer));
        // this.timer.play();
    }
        
    getHTML() {
        return`
            <div class="timer--clock-controls">
            <div class="ctrl-wrapper">
                <div class="playpause ctrl">
                    <span class="control play">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="18 28 345 460" height="40px" width="40px">
                        <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"></path></svg>
                    </span>
                    <span class="control pause">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="40px" width="40px">
                            <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. -->
                            <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"></path>
                        </svg>
                    </span>
                </div>
                <div class="close ctrl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="54 93 211 337" height="40px" width="40px">
                <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path></svg>
                </div>
            </div>
            </div>
        <div class="t-slot-wrapper">
            ${this.timer.createTimeSlot()}
        </div>
        <div class="timer-title">${this.timer.title}</div>

        `
    }
}