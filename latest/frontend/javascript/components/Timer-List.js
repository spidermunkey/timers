import { CountdownTimer } from "./Countdown-Timer.js";
import { CurrentTimer } from "./Current-Timer.js";
import { api } from "../api/app.js";

export class TimerList {
  constructor() {
    // TODO 

    /*
      ADD ACCESSIBILITY (TAB SHORTCUTS DEFAULT HERE ++ SPACE DEFAULTS TO PLAY PAUSE)
    */
    this.logData = [];
    this.timers = [];
    this.currentTimer = new CurrentTimer();
    this.element = document.createElement('div');
    this.element.classList.add('countdown-timer-list');
  }

  async getTimers() {
    this.timers = (await api.getTimers()).map((timerData) => new CountdownTimer(timerData));
    return this.timers;
  }

  getTimerData(id) {
    return this.timers.filter((timer) => timer.id == id);
  }

  updateNowPlaying(timer) {
    console.log(this.currentTimer)
    this.currentTimer.update(timer);
  }

  async render(destination) {
    this.element.innerHTML = await this.getHTML();
    destination.appendChild(this.element);
    return this.element;
  }
  async getHTML() {
    const timers = await this.getTimers();
    let timerListItems = (await Promise.all(timers.map(async (timer) => await timer.getHTML()))).join(" ");
    return `
        <div class="timer-list-options">
          <div class="timer-list-title">
            Saved Timers
          </div>
          <div class="options">
            <div class="create-task opt">
              <div class="label">Create Task</div>
            </div>
            <div class="create-new opt">
            <div class="label">Create New</div>
              <div class="icon">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" height="40px" width="40px" enable-background="new 0 0 50 50" xml:space="preserve">
                  <path d="M9.077,25.99h14v14c0,0.553,0.448,1,1,1s1-0.447,1-1v-14h14c0.552,0,1-0.447,1-1s-0.448-1-1-1h-14v-14c0-0.553-0.448-1-1-1
                    s-1,0.447-1,1v14h-14c-0.552,0-1,0.447-1,1S8.525,25.99,9.077,25.99z"></path>
                </svg>
              </div>
            </div>
          </div>

        </div>
        <div class="timer-list-items">
          ${timerListItems}
      </div>`;
  }

  getLoader() {
    return `<div class="loader">Loading...</div>`;
  }

  logData() {
    console.log(this.logData);
    const totalUsed = this.logData.reduce((a, b) => {});
  }

  timerListItem() {
    return;
  }
}
