/* 
    TODO 

    CREATE SECTION FOR ALL TRACKERS

    UPDATE UI DESIGN
        --add sound
*/

import { api } from "../api/app";

export class Timer {
  // DEFAULTS TO COUNTDOWN
  constructor({ props }) {
    this.once = false;

    this.currentInterval = null;

    this.days = props.days || [];

    this.title = props.title;

    this.time = props.time;

    this.initial = props.initial || structuredClone(props.time);

    this.id = props.id || uuid();

    this.element = undefined;

    let today = new Date();

    let dow = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    this.isToday = this.days.some((day) => day === dow[today.getDay()]) || null;

    this.refs = [];
  }

  padNum(num) {
    if (num.toString().length == 1) return num.toString().padStart(2, "0");
    else return num.toString();
  }

  formatTime() {
    let { hours, minutes, seconds } = this.time,
      h = this.padNum(hours),
      m = this.padNum(minutes),
      s = this.padNum(seconds);
    return { h, m, s };
  }

  play() {
    if (this.currentInterval) return;
    this.currentInterval = setInterval(this.countdown.bind(this), 1000);
  }

  decer() {
    let t = Timer.formatMs(this.time.total - 1000);

    if (Math.round(t.total) <= 0) {
      t = Timer.formatMs(0);
      clearInterval(this.currentInterval);
      this.currentInterval = null;
      return t;
    }

    return t;
  }

  incer() {
    let t = Timer.formatMs(this.time.total + 1000);

    if (Math.round(t.total) < 0) {
      t = Timer.formatMs(0);
      clearInterval(this.currentInterval);
      this.currentInterval = null;
      return t;
    }

    return t;
  }

  pause() {
    clearInterval(this.currentInterval);
    this.currentInterval = null;
    this.showPaused();
    return;
  }

  stop() {
    clearInterval(this.currentInterval);
    this.currentInterval = null;
  }

  reset() {
    clearInterval(this.currentInterval);
    this.currentInterval = null;
    this.time = structuredClone(this.initial);
  }

  resetView() {
    this.showPaused();
    this.reset();
    this.update();
  }

  countdown() {
    this.time = this.decer();

    // change to show complete;
    if (this.time.total <= 0) return this.resetView();
    this.update();
  }

  create(type) {
    let html = this.createTimerElement(type);
    let fragment = frag();
    let element = div();

    element.innerHTML = html;
    fragment.appendChild(element);

    return fragment;
  }

  showPlaying() {
    if (!this.element) return;

    function togglePlayButton(element) {
      $(".pause", element).classList.add("current");
      $(".play", element).classList.remove("current");
    }

    togglePlayButton(this.element);
    togglePlayButton(this.clone);
    return;
  }

  showPaused() {
    if (!this.element) return;
    function togglePauseButton(element) {
      $(".play", element).classList.add("current");
      $(".pause", element).classList.remove("current");
    }

    togglePauseButton(this.element);
    togglePauseButton(this.clone);
  }

  render(destination, type) {
    const frag = this.create(type);
    let element = $(`[data-id="${this.id}"]`, frag);
    destination.appendChild(frag);
    this.hydrate(element);
    this.element = element;
  }

  renderClone(type) {
    const node = $('#app[location="timer"] .current-timer');
    const frag = this.create(type);
    let element = $(`[data-id="${this.id}"]`, frag);
    this.clone = element;

    node.innerHTML = "";
    node.append(frag);
    this.hydrate(element);
  }

  hydrate(element) {
    listen($(".ctrl-wrapper", element), () => {
      if (!this.currentInterval) {
        this.renderClone();
        this.showPlaying();
        this.play();
      } else if (this.currentInterval) {
        this.showPaused();
        this.pause();
        app.current_timer.playing = false;
      }
    });
    listen($(".reset", element), this.resetView.bind(this));
    listen($(".delete", element), this.delete.bind(this));
    listen($(".edit", element), this.showEditForm.bind(this));
  }

  update() {
    if (!this.element) return;
    const updateView = (element) =>
      ($(".time-slot", element).innerHTML = this.createTimeSlot());

    updateView(this.element);
    updateView(this.clone);
  }

  showEditForm() {
    let form = div();
    form.innerHTML = this.createEditForm(
      this.successTime ? this.successTime : this.time
    );
    hydrateForm.call(this);
    form.classList.add("edit-timer");
    form.style.display = "block";

    let currentForm = $(".timer-list .edit-timer");
    if (currentForm) currentForm.remove(form);
    $(".timer-list").appendChild(form);

    function hydrateForm() {
      const timerDayInputs = $$(
        '.inp-field[data-type="day"] input[type="checkbox"]',
        form
      );
      // const timerTimeInputs = $$('.inp-field input[data-type="time"]',form);
      const timerNeverInput = $(
        '.inp-field[data-type="binary"] .option[data-option="never"] input[type="checkbox"]',
        form
      );
      const timerEveryInput = $(
        '.inp-field[data-type="binary"] .option[data-option="every"] input[type="checkbox"]',
        form
      );

      listen(
        timerNeverInput,
        function toggleEveryInput() {
          if (timerNeverInput.checked) {
            uncheck(timerEveryInput);
            uncheckAll(timerDayInputs);
          }
        },
        "input"
      );

      listen(
        timerEveryInput,
        function toggleNeverInput() {
          if (timerEveryInput.checked) {
            uncheck(timerNeverInput);
            checkAll(timerDayInputs);
          }
        },
        "input"
      );
      timerDayInputs.forEach(function EVENTS__dayInputs(inp) {
        inp.addEventListener("input", () => {
          // handle all checked
          if (oneUnchecked(timerDayInputs)) uncheck(timerEveryInput);
          else if (allChecked(timerDayInputs)) check(timerEveryInput);

          // handle none checked
          if (oneChecked(timerDayInputs)) uncheck(timerNeverInput);
          else if (noneChecked(timerDayInputs)) check(timerNeverInput);
        });
      });
      form.addEventListener("submit", (e) => submit.call(this, e, form));
      form.querySelector(".close").addEventListener("click", () => {
        form.remove();
      });

      async function submit(event, formElement) {
        event.preventDefault();

        const fdo = new FormData(formElement);
        let props = parseForm(fdo, formElement);
        props.id = this.id;
        let newDoc = await api.edit(this.id, props);

        if (newDoc) {
          this.edit(newDoc);
          formElement.remove();
        }
      }
    }

    function parseForm(formDataObject, formElement) {
      let fdo = formDataObject;
      for (const entry of fdo) if (entry[1].trim() === "") entry[1] = 0;

      // Get the values of the checkboxes for days
      let days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].filter(
        (day) => {
          let checkbox = $(
            `.inp-field[data-type="day"] input[name="day"][data-day="${day}"]`,
            formElement
          );

          if (checkbox && checkbox.checked) {
            console.log(day);
            return true;
          }
        }
      );
      console.log(days);

      let title = fdo.get("title"),
        hours = fdo.getAll("hours").join(""),
        minutes = fdo.getAll("minutes").join(""),
        seconds = fdo.getAll("seconds").join(""),
        total = Timer.timeInMs({ hours, minutes, seconds }),
        id = uuid(),
        time = { hours, minutes, seconds, total },
        initial = time;

      return {
        title,
        id,
        time,
        days,
        initial,
      };
    }
  }

  edit(props) {
    this.days = props.days || [];

    this.title = props.title;

    this.time = props.time;

    this.initial = props.initial || structuredClone(props.time);

    this.id = props.id || uuid();

    let today = new Date();

    let dow = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    this.isToday = this.days.some((day) => day === dow[today.getDay()]) || null;

    const frag = this.create();
    this.element = $(`[data-id="${this.id}"]`, frag);
    $(`[data-id="${this.id}"]`, $(".timer-list")).replaceWith(this.element);
    this.hydrate();
  }

  async delete() {
    console.log(api, "delete");
    const deleted = api.delete(this.id);
    if (deleted) {
      this.element.remove();
      this.refs.forEach((ref) => ref.remove());
      this.element = null;
      app.current_timer.playing = false;
      app.current_timer.reference = null;
    }
  }

  static timeInMs({ hours, minutes, seconds }) {
    // convert all to ms
    let msSeconds = seconds * 1000,
      msMinutes = minutes * 60000,
      msHours = hours * 3600000;

    return msHours + msSeconds + msMinutes;
  }

  static formatMs(ms) {
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

  createTimerElement(type = "timer") {
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
    <div class="time-slot"> ${h}:${m}:${s}</div>
    </div>
    `;
  }

  createTimeSlot({ hours, minutes, seconds } = this.time) {
    let { h, m, s } = this.formatTime();
    return `<div class="time-slot"> ${h}:${m}:${s}</div>`;
  }

  createEditForm({ hours, minutes, seconds }) {
    let h = this.padNum(hours),
      m = this.padNum(minutes),
      s = this.padNum(seconds);

    return `                
        <form action="#" id="edit-timer">

        <div class="close">x</div>
        <div class="new-timer--form">
            <div class="new-timer--form-field" data-field="title">
                <span class="inp-field" data-type="title">
                    <span class="label">Title</span>
                    <input type="text" name="title" id="form-title" autocomplete="off" value="${
                      this.title
                    }" required>
                </span>
            </div>
            <div class="new-timer--form-field" data-field="time">
                <span class="inp-field" data-type="hours">
                    <input name="hours" id="nHours" value="${
                      h[0]
                    }" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <input name="hours" id="0Hours" value="${
                      h[1]
                    }" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <span class="label">h</span>
                </span>
                <span class="inp-field" data-type="minutes">
                    <input name="minutes" id="nMinutes" value="${
                      m[0]
                    }" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <input name="minutes" id="0Minutes" value="${
                      m[1]
                    }" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <span class="label">m</span>
                </span>
                <span class="inp-field" data-type="seconds">
                    <input name="seconds" id="nSeconds" value="${
                      s[0]
                    }" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <input name="seconds" id="0Seconds" value="${
                      s[1]
                    }" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <span class="label">s</span>
                </span>
            </div>
            <div class="new-timer--form-field" data-field="occurance">
                <div class="inp-field" data-type="day">
                    <label for="mon">
                        <span class="label">M</span>
                    </label>
                    <input type="checkbox" name="day" data-day="mon" ${
                      this.days.some((day) => day === "mon") ? "checked" : null
                    }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="tue">
                        <span class="label">T</span>
                    </label>
                    <input type="checkbox" name="day" data-day="tue" id="tue"${
                      this.days.some((day) => day === "tue") ? "checked" : null
                    }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="wed">
                        <span class="label">W</span>
                    </label>
                    <input type="checkbox" name="day" data-day="wed" data-day="wed" id="wed"${
                      this.days.some((day) => day === "wed") ? "checked" : null
                    }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="thu">
                        <span class="label">T</span>
                    </label>
                    <input type="checkbox" name="day" data-day="thu" id="thu"${
                      this.days.some((day) => day === "thu") ? "checked" : null
                    }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="fri">
                        <span class="label">F</span>
                    </label>
                    <input type="checkbox" name="day" data-day="fri" id="fri"${
                      this.days.some((day) => day === "fri") ? "checked" : null
                    }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="sat">
                        <span class="label">S</span>
                    </label>
                    <input type="checkbox" name="day" data-day="sat" id="sat"${
                      this.days.some((day) => day === "sat") ? "checked" : null
                    }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="sun">
                        <span class="label">S</span>
                    </label>
                    <input type="checkbox" name="day" data-day="sun" id="sun"${
                      this.days.some((day) => day === "sun") ? "checked" : null
                    }>
                </div>
                <div class="inp-field" data-type="binary">
                    <div class="option" data-option="never">
                        <label for="never">
                            <span class="label">never</span>
                        </label>
                        <input type="checkbox" name="never" id="never" ${
                          this.days.length == 0 ? "checked" : null
                        }>
                    </div>
                    <div class="option" data-option="every">
                        <label for="everyday">
                            <span class="label">everyday</span>
                        </label>
                        <input type="checkbox" name="every" id="every" ${
                          this.days.length == 7 ? "checked" : null
                        }>
                    </div>
                </div>
            </div>
            <div class="tod-modal">
                <div class="option selected">
                    <span class="label">ANY</span>
                </div>
                <div class="option">
                    <div class="hour">
                        <span class="nHour">05</span>
                        <span class="breaker">:</span>
                        <span class="0hour">00</span>
                    </div>
                    <div class="minute"></div>
                </div>
            </div>
            <span class="btn-create">
                <span class="label">Edit</span>
                <input type="submit" name="create" id="btn-create">
            </span>
        </div>
    </form>`;
  }
}

export class TimeTracker extends Timer {
  constructor({ props }) {
    super({ props });

    this.logs = [];

    this.initial = Timer.formatMs(0);
    this.successTime = props.successTime;
    this.onSuccess =
      props.onSucces ||
      function () {
        console.log(`${this.title} tracker has completed`);
        if (this.element) $(".timer", this.element).classList.add("complete");
      };

    this.success = false;

    this.resetAfterSuccess = props.resetOnSuccess || false;
  }

  countup() {
    this.time = this.incer();
    if (this.success === false && this.time.total >= this.successTime.total) {
      this.success = true;
      this.onSuccess();
    }
    if (this.resetOnSuccess) return this.resetView();
    else this.update();
  }

  play() {
    if (this.currentInterval) return;
    this.currentInterval = setInterval(this.countup.bind(this), 1000);
    this.logStart();
  }

  pause() {
    clearInterval(this.currentInterval);
    this.currentInterval = null;
    this.showPaused();
    this.logStop();
    return;
  }

  async logStart() {
    let stamp = DateTime.stamp();
    let log = {
      type: "start",
      tID: this.id,
      task: this.title,
      elapsed: this.time,
      stamp,
    };
    console.log(log);
    this.logs.push(log);
    const success = await api.log(log);
    if (success) console.log(success);
    else console.error(success);
    return log;
  }

  async logStop() {
    let stamp = DateTime.stamp();
    let completed = this.time.total >= this.successTime.total;
    let prevLog = last(this.logs);
    let comp = DateTime.from(new Date(prevLog.stamp.ms));

    let since = {
      hours: comp.hours,
      minutes: comp.minutes,
      seconds: comp.seconds,
    };

    let log = {
      type: "stop",
      tID: this.id,
      task: this.title,
      elapsed: this.time,
      sinceLastStop: since,
      completed,
      stamp,
    };

    const success = await api.log(log);

    if (success) console.log(success);
    else console.error(success);
    return log;
  }

  logComplete() {}

  // createEditForm({hours,minutes,seconds}){
  //     let
  //         h = this.padNum(hours),
  //         m = this.padNum(minutes),
  //         s = this.padNum(seconds);

  //     return `
  //     <form action="#" id="edit-timer">

  //     <div class="close">x</div>
  //     <div class="new-timer--form">
  //         <div class="new-timer--form-field" data-field="title">
  //             <span class="inp-field" data-type="title">
  //                 <span class="label">Title</span>
  //                 <input type="text" name="title" id="form-title" autocomplete="off" value="${this.title}" required>
  //             </span>
  //         </div>
  //         <div class="new-timer--form-field" data-field="time">
  //             <span class="inp-field" data-type="hours">
  //                 <input name="hours" id="nHours" value="${h[0]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
  //                 <input name="hours" id="0Hours" value="${h[1]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
  //                 <span class="label">h</span>
  //             </span>
  //             <span class="inp-field" data-type="minutes">
  //                 <input name="minutes" id="nMinutes" value="${m[0]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
  //                 <input name="minutes" id="0Minutes" value="${m[1]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
  //                 <span class="label">m</span>
  //             </span>
  //             <span class="inp-field" data-type="seconds">
  //                 <input name="seconds" id="nSeconds" value="${s[0]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
  //                 <input name="seconds" id="0Seconds" value="${s[1]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
  //                 <span class="label">s</span>
  //             </span>
  //         </div>
  //         <div class="new-timer--form-field" data-field="occurance">
  //             <div class="inp-field" data-type="day">
  //                 <label for="mon">
  //                     <span class="label">M</span>
  //                 </label>
  //                 <input type="checkbox" name="day" data-day="mon" ${this.days.some(day => day === 'mon') ? 'checked' : null }>
  //             </div>
  //             <div class="inp-field" data-type="day">
  //                 <label for="tue">
  //                     <span class="label">T</span>
  //                 </label>
  //                 <input type="checkbox" name="day" data-day="tue" id="tue"${this.days.some(day => day === 'tue') ? 'checked' : null }>
  //             </div>
  //             <div class="inp-field" data-type="day">
  //                 <label for="wed">
  //                     <span class="label">W</span>
  //                 </label>
  //                 <input type="checkbox" name="day" data-day="wed" data-day="wed" id="wed"${this.days.some(day => day === 'wed') ? 'checked' : null }>
  //             </div>
  //             <div class="inp-field" data-type="day">
  //                 <label for="thu">
  //                     <span class="label">T</span>
  //                 </label>
  //                 <input type="checkbox" name="day" data-day="thu" id="thu"${this.days.some(day => day === 'thu') ? 'checked' : null }>
  //             </div>
  //             <div class="inp-field" data-type="day">
  //                 <label for="fri">
  //                     <span class="label">F</span>
  //                 </label>
  //                 <input type="checkbox" name="day" data-day="fri" id="fri"${this.days.some(day => day === 'fri') ? 'checked' : null }>
  //             </div>
  //             <div class="inp-field" data-type="day">
  //                 <label for="sat">
  //                     <span class="label">S</span>
  //                 </label>
  //                 <input type="checkbox" name="day" data-day="sat" id="sat"${this.days.some(day => day === 'sat') ? 'checked' : null }>
  //             </div>
  //             <div class="inp-field" data-type="day">
  //                 <label for="sun">
  //                     <span class="label">S</span>
  //                 </label>
  //                 <input type="checkbox" name="day" data-day="sun" id="sun"${this.days.some(day => day === 'sun') ? 'checked' : null }>
  //             </div>
  //             <div class="inp-field" data-type="binary">
  //                 <div class="option" data-option="never">
  //                     <label for="never">
  //                         <span class="label">never</span>
  //                     </label>
  //                     <input type="checkbox" name="never" id="never" ${this.days.length == 0 ? 'checked' : null }>
  //                 </div>
  //                 <div class="option" data-option="every">
  //                     <label for="everyday">
  //                         <span class="label">everyday</span>
  //                     </label>
  //                     <input type="checkbox" name="every" id="every" ${this.days.length == 7 ? 'checked' : null }>
  //                 </div>
  //             </div>
  //         </div>
  //         <div class="tod-modal">
  //             <div class="option selected">
  //                 <span class="label">ANY</span>
  //             </div>
  //             <div class="option">
  //                 <div class="hour">
  //                     <span class="nHour">05</span>
  //                     <span class="breaker">:</span>
  //                     <span class="0hour">00</span>
  //                 </div>
  //                 <div class="minute"></div>
  //             </div>
  //         </div>
  //         <span class="btn-create">
  //             <span class="label">Edit</span>
  //             <input type="submit" name="create" id="btn-create">
  //         </span>
  //     </div>
  // </form>`
  // }
}
