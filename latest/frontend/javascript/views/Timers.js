import { AbstractView } from "./AbstractView.js";
import { TimerList } from "../components/Timer-List.js";

export default class Timers extends AbstractView {
  constructor() {
    super();
    this.setTitle("Dashboard");
  }

  async hydrate() {}

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
