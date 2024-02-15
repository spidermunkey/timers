import { CountdownTimer } from "./Countdown-Timer.js";
import { api } from "../api/app.js";

export class TimerList {
  constructor() {
    this.logData = [];
  }

  async getTimers() {
    const countdownTimers = (await api.getTimers()).map((timerData) => {
      this.logData.push([timerData.id, timerData.logs]);
      return new CountdownTimer(timerData);
    });
    console.log(await countdownTimers);
    console.log(this.logData);
    return countdownTimers;
  }

  async hydrate() {
    const timerList = $(".dashboard .countdown-timer-list");
    if (!timerList) console.warn("timer-list hasnt properly rendered");

    timerList.addEventListener;
  }

  async getHTML() {
    const timers = await this.getTimers();

    let html = (
      await Promise.all(timers.map(async (timer) => await timer.getHTML()))
    ).join(" ");

    return `
    <div class="countdown-timer-list">
      <div class="now-playing">
        <div class="current-timer-title">Now Playing</div>
        <div class="current-timer-controls"></div>
      </div>
      <div class="timer-list-items">
        ${html}
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
