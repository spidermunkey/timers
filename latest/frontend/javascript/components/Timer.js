import { AbstractTimer } from "./Abstract-Timer.js";

export class CountdownTimer extends AbstractTimer {
  constructor(props) {
    super(props.time ? props.time : { hours: 0, minutes: 0, seconds: 0 });
    // console.log(this.time);
    this.once = false;
    this.currentInterval = null;
    this.days = props.days || [];
    this.title = props.title || "";
    this.initial = props.initial || structuredClone(props.time);
    this.id = props.id || uuid();
    this.element = undefined;
    this.logs = props.logs;
    this.isToday = this.days.some(day => day === ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][new Date().getDay()]);
  }

  formatTime() {
    let { hours, minutes, seconds } = this.time,
      h = this.doubleZero(hours),
      m = this.doubleZero(minutes),
      s = this.doubleZero(seconds);
    return { h, m, s };
  }

  pause() {
    return;
  }

  hydrate(element) {
    return element;
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

  destroy() {}

  getHTML() {
    let { h, m, s } = this.formatTime();
    return `
    <div class="timer" data-id="${this.id}">
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
      ${this.createTimeSlot()}
      </div>
      <div class="edit-timer"></div>
    `;
  }

  createTimeSlot() {
    let { h, m, s } = this.formatTime();
    return `<div class="time-slot"> ${h}:${m}:${s}</div>`;
  }
}
