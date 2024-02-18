import { CountdownTimer } from "./Countdown-Timer.js";
import { api } from "../api/app.js";

export class TimerList {
  constructor() {
    this.logData = [];
    this.timers = [];
  }

  async getTimers() {
    this.timers = (await api.getTimers()).map(
      (timerData) => new CountdownTimer(timerData)
    );
    return this.timers;
  }

  async hydrate() {
    const timerList = $(".dashboard .countdown-timer-list");
    if (!timerList) console.warn("timer-list hasnt properly rendered");
    timerList.addEventListener("click", (e) => {
      const timer = e.target.closest(".timer");
      if (timer) {
        const [clickedTimer] = this.getTimerData(timer.dataset.id);
        this.updateNowPlaying(clickedTimer);
      }
    });
    // this.timers.forEach((timer) => timer.hydrate());
  }

  getTimerData(id) {
    return this.timers.filter((timer) => timer.id == id);
  }

  updateNowPlaying(timer) {
    const element = $(".countdown-timer-list .now-playing");
    const tTitle = $(".current-timer-title");
    $(".current-timer-time-slot").innerHTML = timer.createTimeSlot();
    tTitle.textContent = timer.title;
    $();
  }

  async getHTML() {
    const timers = await this.getTimers();
    console.log(timers);
    let html = (
      await Promise.all(timers.map(async (timer) => await timer.getHTML()))
    ).join(" ");
    return `
    <div class="countdown-timer-list">
      <div class="now-playing">
        <div class="current-timer-title">Now Playing</div>
        <div class="current-timer-time-slot"></div>
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
