import { CountdownTimer } from "./Countdown-Timer.js";
import { api } from "../api/app.js";

export class TimerList {
  constructor() {}

  async getTimers() {
    const countdownTimers = (await api.getTimers()).map(
      (timerData) => new CountdownTimer(timerData)
    );
    console.log(await countdownTimers);
    return countdownTimers;
  }

  async getHTML() {
    const timers = await this.getTimers();

    let html = (
      await Promise.all(timers.map(async (timer) => await timer.getHTML()))
    ).join();

    return `
    <div class="countdown-timer-list">
    ${html}
    </div>`;
  }
}
