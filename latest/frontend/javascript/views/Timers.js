import AbstractView from "./AbstractView.js";
import { CountdownTimer } from "../components/Timer.js";
import { TimerList } from "../components/Timer-List.js";
export default class Timers extends AbstractView {
  constructor() {
    super();
    this.setTitle("Dashboard");
  }

  async hydrate() {
    const timer = new CountdownTimer({});
    console.log(timer);
    console.log("yo");
    timer.render($('.dashboard[location="timers"]'));
    const timerList = new TimerList();
    console.log(await timerList.getHTML());
  }

  async getHTML() {
    const timerList = new TimerList();
    const html = await timerList.getHTML();
    return `
      <div class="dashboard" location="timers">
        ${html}
      </div>
    `;
  }
}
