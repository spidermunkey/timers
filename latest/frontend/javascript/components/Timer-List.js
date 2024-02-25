import { CountdownTimer } from "./Countdown-Timer.js";
import { CurrentTimer } from "./Current-Timer.js";
import { api } from "../api/app.js";

export class TimerList {
  constructor() {
    this.logData = [];
    this.timers = [];
    this.currentTimer = new CurrentTimer();
  }

  async getTimers() {
    this.timers = (await api.getTimers()).map((timerData) => {
      const timer = new CountdownTimer(timerData);
      timer.onComplete(() => this.currentTimer.syncComplete(timer));
      timer.onPlay(() => this.currentTimer.syncPlay(timer));
      timer.onPause(() => this.currentTimer.syncPause(timer))
      return timer;
    });

    return this.timers;
  }

  getTimerData(id) {
    return this.timers.filter((timer) => timer.id == id);
  }

  updateNowPlaying(timer) {
    console.log(this.currentTimer)
    this.currentTimer.update(timer);
  }

  async getHTML() {
    const timers = await this.getTimers();
    
    let timerListItems = (
      await Promise.all(timers.map(async (timer) => await timer.getHTML()))
    ).join(" ");
    let nowPlayingTimer = this.currentTimer.getHTML();
    return `
    <div class="countdown-timer-list">
      ${nowPlayingTimer}
      <div class="timer-list-items">
        ${timerListItems}
      </div>
    </div>`;
  }

  getLoader() {
    return `<div class="loader">Loading...</div>`;
  }

  async render(destination) {
    //...
  }

  logData() {
    console.log(this.logData);
    const totalUsed = this.logData.reduce((a, b) => {});
  }

  timerListItem() {
    return;
  }
}
