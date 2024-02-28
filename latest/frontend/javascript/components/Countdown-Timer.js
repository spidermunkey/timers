import { AbstractTimer } from "./Abstract-Timer.js";

export class CountdownTimer extends AbstractTimer {
  constructor(props) {
    super(props.time ? props.time : { hours: 0, minutes: 0, seconds: 0 });
    this.once = false;
    this.type = "timer";
    this.currentInterval = null;
    this.days = props.days || [];
    this.title = props.title || "";
    this.initial = props.initial || structuredClone(props.time);
    this.id = props.id;
    this.elementClones = [];
    this.isToday = this.days.some((day) => {
      let today = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][
        new Date().getDay()
      ];
      day === today;
    });

    this.onComplete(() => {
      this.showPaused();
      this.reset();
    });

    this.onTick(() => {
      this.updateTimeSlot();
      $(".now-playing .time-slot").innerHTML = this.createTimeSlot();
    });

    this.onPlay(() => {
      this.countdown();
      this.showPlaying();
    });

    this.onPause(() => {
      console.log(this);
      this.clear();
      this.showPaused();
    });

    this.onReset(() => this.updateTimeSlot());
  }

  get element() {
    return $(`.timer[data-id="${this.id}"]`);
  }

  formatTime() {
    let { hours, minutes, seconds } = this.time,
      h = this.doubleZero(hours),
      m = this.doubleZero(minutes),
      s = this.doubleZero(seconds);
    return { h, m, s };
  }

  updateTimeSlot() {
    this.element.querySelector(".t-slot-wrapper").innerHTML =
      this.createTimeSlot();
  }

  reset() {
    this.time = structuredClone(this.initial);
    this.updateTimeSlot();
  }

  showPlaying() {
    this.element.querySelector(".ctrl.play").classList.remove("current");
    this.element.querySelector(".ctrl.pause").classList.add("current");
  }
  
  showPaused() {
    this.element.querySelector(".ctrl.play").classList.add("current");
    this.element.querySelector(".ctrl.pause").classList.remove("current");
  }

  hydrate(element = this.element) {
    listen($(".ctrl-wrapper", this.element), () => {
      if (!this.currentInterval) {
        // this.renderClone();
        this.showPlaying();
        this.play();
      } else if (this.currentInterval) {
        console.log(this);
        this.pause();
        this.showPaused();

        // app.current_timer.playing = false;
      }
    });
    listen($(".options .edit-time-option", this.element), () => {
      console.log("yo");
    });
  }

  render(destination) {
    let element;

    if (!this.element) {
      element = document.createElement("div");
      element.classList.add("timer-wrapper");
      element.dataset.id = this.id;
      element.innerHTML = this.getHTML();
    } else {
      element = this.element.cloneNode(true);
      this.elementClones.push(element);
    }

    this.element = element;
    this.hydrate(element);
    destination.appendChild(element);
  }

  async destroy(animation) {
    if (animation) await animation(this.element);
    this.element.remove();
  }

  getHTML() {
    let { h, m, s } = this.formatTime();
    return `
    <div class="timer" data-id="${this.id}">
      <div class="sub-overlay"></div>
      <div class="timer--clock-controls">
          <div class="ctrl-wrapper">
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
      </div>

      <div class="timer-title">${this.title}</div>
      <div class="t-slot-wrapper">
      ${this.createTimeSlot()}

      </div>

        <div class="options">
        <div class="edit-time-option">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="24px"  width="24px" viewBox="-2 -3 24 24">

          <path fill="#000000" d="M19.854 9.646c-0.195-0.195-0.512-0.195-0.707 0l-3.586 3.586c-0.585 0.585-1.537 0.585-2.121 0l-4.672-4.672c-0.282-0.282-0.437-0.658-0.437-1.061s0.155-0.779 0.437-1.061l3.586-3.586c0.195-0.195 0.195-0.512 0-0.707s-0.512-0.195-0.707 0l-3.586 3.586c-0.471 0.471-0.73 1.098-0.73 1.768 0 0.285 0.048 0.563 0.138 0.824l-7.322 7.322c-0.094 0.094-0.146 0.221-0.146 0.354v1.5c0 0.276 0.224 0.5 0.5 0.5h9.5c0.133 0 0.26-0.053 0.354-0.146l3.322-3.322c0.261 0.091 0.539 0.138 0.824 0.138 0.669 0 1.297-0.259 1.768-0.73l3.586-3.586c0.195-0.195 0.195-0.512 0-0.707zM9.793 17h-8.793v-0.793l7.002-7.002c0.020 0.021 0.039 0.042 0.059 0.062l4.672 4.672c0.020 0.020 0.041 0.040 0.062 0.059l-3.002 3.002z">
          </path>
          </svg>
        </div>

        <div class="settings-option">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="24px" width="24px" viewBox="-2 -2 24 24">

          <path fill="#000000" d="M7.631 19.702c-0.041 0-0.083-0.005-0.125-0.016-0.898-0.231-1.761-0.587-2.564-1.059-0.233-0.137-0.315-0.434-0.186-0.671 0.159-0.292 0.243-0.622 0.243-0.957 0-1.103-0.897-2-2-2-0.334 0-0.665 0.084-0.957 0.243-0.237 0.129-0.534 0.047-0.671-0.186-0.472-0.804-0.828-1.666-1.059-2.564-0.065-0.254 0.077-0.515 0.325-0.598 0.814-0.274 1.362-1.036 1.362-1.895s-0.547-1.621-1.362-1.895c-0.248-0.084-0.39-0.344-0.325-0.598 0.231-0.898 0.587-1.761 1.059-2.564 0.137-0.233 0.434-0.315 0.671-0.186 0.291 0.159 0.622 0.243 0.957 0.243 1.103 0 2-0.897 2-2 0-0.334-0.084-0.665-0.243-0.957-0.129-0.237-0.047-0.534 0.186-0.671 0.804-0.472 1.666-0.828 2.564-1.059 0.254-0.065 0.515 0.077 0.598 0.325 0.274 0.814 1.036 1.362 1.895 1.362s1.621-0.547 1.895-1.362c0.084-0.248 0.345-0.39 0.598-0.325 0.898 0.231 1.761 0.587 2.564 1.059 0.233 0.137 0.315 0.434 0.186 0.671-0.159 0.292-0.243 0.622-0.243 0.957 0 1.103 0.897 2 2 2 0.334 0 0.665-0.084 0.957-0.243 0.237-0.129 0.534-0.047 0.671 0.186 0.472 0.804 0.828 1.666 1.059 2.564 0.065 0.254-0.077 0.515-0.325 0.598-0.814 0.274-1.362 1.036-1.362 1.895s0.547 1.621 1.362 1.895c0.248 0.084 0.39 0.344 0.325 0.598-0.231 0.898-0.587 1.761-1.059 2.564-0.137 0.233-0.434 0.315-0.671 0.186-0.292-0.159-0.622-0.243-0.957-0.243-1.103 0-2 0.897-2 2 0 0.334 0.084 0.665 0.243 0.957 0.129 0.237 0.047 0.534-0.186 0.671-0.804 0.472-1.666 0.828-2.564 1.059-0.254 0.065-0.515-0.077-0.598-0.325-0.274-0.814-1.036-1.362-1.895-1.362s-1.621 0.547-1.895 1.362c-0.070 0.207-0.264 0.341-0.474 0.341zM10 17c1.127 0 2.142 0.628 2.655 1.602 0.52-0.161 1.026-0.369 1.51-0.622-0.108-0.314-0.164-0.646-0.164-0.98 0-1.654 1.346-3 3-3 0.334 0 0.666 0.056 0.98 0.164 0.253-0.484 0.462-0.989 0.622-1.51-0.974-0.512-1.602-1.527-1.602-2.655s0.628-2.142 1.602-2.655c-0.161-0.52-0.369-1.026-0.622-1.51-0.314 0.108-0.646 0.164-0.98 0.164-1.654 0-3-1.346-3-3 0-0.334 0.056-0.666 0.164-0.98-0.484-0.253-0.989-0.462-1.51-0.622-0.512 0.974-1.527 1.602-2.655 1.602s-2.142-0.628-2.655-1.602c-0.52 0.16-1.026 0.369-1.51 0.622 0.108 0.314 0.164 0.646 0.164 0.98 0 1.654-1.346 3-3 3-0.334 0-0.666-0.056-0.98-0.164-0.253 0.484-0.462 0.989-0.622 1.51 0.974 0.512 1.602 1.527 1.602 2.655s-0.628 2.142-1.602 2.655c0.16 0.52 0.369 1.026 0.622 1.51 0.314-0.108 0.646-0.164 0.98-0.164 1.654 0 3 1.346 3 3 0 0.334-0.056 0.666-0.164 0.98 0.484 0.253 0.989 0.462 1.51 0.622 0.512-0.974 1.527-1.602 2.655-1.602z">
          </path>
          <path fill="#000000" d="M10 13c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zM10 8c-1.103 0-2 0.897-2 2s0.897 2 2 2c1.103 0 2-0.897 2-2s-0.897-2-2-2z">
          </path>
          </svg>
        </div>

        <div class="delete-option">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="24px" width="24px" viewBox="-2 -2 24 24">

          <path fill="#000000" d="M15.5 2h-3.5v-0.5c0-0.827-0.673-1.5-1.5-1.5h-2c-0.827 0-1.5 0.673-1.5 1.5v0.5h-3.5c-0.827 0-1.5 0.673-1.5 1.5v1c0 0.652 0.418 1.208 1 1.414v12.586c0 0.827 0.673 1.5 1.5 1.5h10c0.827 0 1.5-0.673 1.5-1.5v-12.586c0.582-0.206 1-0.762 1-1.414v-1c0-0.827-0.673-1.5-1.5-1.5zM8 1.5c0-0.276 0.224-0.5 0.5-0.5h2c0.276 0 0.5 0.224 0.5 0.5v0.5h-3v-0.5zM14.5 19h-10c-0.276 0-0.5-0.224-0.5-0.5v-12.5h11v12.5c0 0.276-0.224 0.5-0.5 0.5zM16 4.5c0 0.276-0.224 0.5-0.5 0.5h-12c-0.276 0-0.5-0.224-0.5-0.5v-1c0-0.276 0.224-0.5 0.5-0.5h12c0.276 0 0.5 0.224 0.5 0.5v1z">
          </path>
          <path fill="#000000" d="M12.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z">
          </path>
          <path fill="#000000" d="M9.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z">
          </path>
          <path fill="#000000" d="M6.5 7c-0.276 0-0.5 0.224-0.5 0.5v10c0 0.276 0.224 0.5 0.5 0.5s0.5-0.224 0.5-0.5v-10c0-0.276-0.224-0.5-0.5-0.5z">
          </path>
          </svg>
        </div>
      </div>
      
      </div>
    `;
  }

  createTimeSlot() {
    let { h, m, s } = this.formatTime();
    return `<div class="time-slot"> ${h}:${m}:${s}</div>`;
  }
}
