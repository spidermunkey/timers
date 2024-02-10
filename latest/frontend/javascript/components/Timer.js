export class AbstractTimer {
  constructor(time) {
    this.currentInterval = null;
    this.time = time;
    this.initial = structuredClone(time);
  }

  static millisecondsToTime(ms) {
    const msInSeconds = 1000;
    const msInMinutes = 60000;
    const msInHours = 3600000;

    const approxHour = ms / 3600000;
    const hours = Math.floor(approxHour);
    const hoursFloat = approxHour - hours;

    const approxMinutes = (hoursFloat * msInHours) / msInMinutes;
    const minutes = Math.floor(approxMinutes);
    const minutesFloat = approxMinutes - minutes;

    const seconds = Math.round((minutesFloat * msInMinutes) / msInSeconds);

    return {
      hours,
      minutes,
      seconds,
      total: ms,
    };
  }

  static timeToMilliseconds({ hours, minutes, seconds }) {
    if (
      [hours, minutes, seconds].some(
        (num) =>
          Number.isNaN(Number(num)) ||
          typeof num === "function" ||
          typeof num === "undefined"
      )
    )
      throw new Error(
        "Hours,Minutes,and Seconds Must be a number,string num, or zeror for time to ms to work"
      );

    const msInSeconds = 1000;
    const msInMinutes = 60000;
    const msInHours = 3600000;

    return seconds * msInSeconds + minutes * msInMinutes + hours * msInHours;
  }

  doubleZero(number) {
    if (typeof number !== "string" || typeof number !== "number")
      throw new Error("double zero function requires string or number");

    return number.toString().padStart(2, "0");
  }

  formatCurrentTime() {
    let { hours, minutes, seconds } = this.time,
      h = this.doubleZero(hours),
      m = this.doubleZero(minutes),
      s = this.doubleZero(seconds);

    return {
      hours: h,
      minutes: m,
      seconds: s,
    };
  }

  decrementTime(time = this.time) {
    let decremented = AbstractTimer.timeToMilliseconds(time) - 1000;

    if (decremented <= 0) {
      time = AbstractTimer.millisecondsToTime(0);
      return time;
    }

    time = AbstractTimer.millisecondsToTime(decremented);
    return time;
  }

  incrementTime(time = this.time) {
    time = AbstractTimer.millisecondsToTime(
      AbstractTimer.timeToMilliseconds(time) + 1000
    );
    return time;
  }

  countdown() {
    if (this.currentInterval) return;
    this.currentInterval = this.setInterval(this.decrementTime, 1000);
  }

  countup() {
    if (this.currentInterval) return;
    this.currentInterval = this.setInterval(this.incrementTime, 1000);
  }

  clear() {
    clearInterval(this.currentInterval);
    this.currentInterval = null;
    return;
  }

  reset() {
    this.time = structuredClone(this.initial);
  }
}

export class CountdownTimer extends AbstractTimer {
  constructor(props) {
    super(props.time);

    this.once = false;
    this.currentInterval = null;
    this.days = props.days || [];
    this.title = props.title || "";
    this.initial = props.initial || structuredClone(props.time);
    this.id = props.id || uuid();
    this.element = undefined;
    this.isToday = this.days.some((day) => {
      let today = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][
        new Date().getDay()
      ];
      day === today;
    });
  }

  set time(timeObject) {
    // update logic goes here
    this.time = timeObject;
  }

  pause() {
    return;
  }

  hydrate(element) {
    return element;
  }

  render(destination) {
    const element = document.createElement("div");
    element.classList.add("timer-wrapper");
    element.dataset.id = this.id;
    element.innerHTML = this.getHTML();
    this.hydrate(element);
    this.element = element;
  }

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
    `;
  }

  createTimeSlot() {
    let { h, m, s } = this.formatTime();
    return `<div class="time-slot"> ${h}:${m}:${s}</div>`;
  }
}
