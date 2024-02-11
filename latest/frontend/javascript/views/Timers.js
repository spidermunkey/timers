import AbstractView from "./AbstractView.js";
import { CountdownTimer } from "../components/Timer.js";

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
  }

  async getHTML() {
    return `
      <div class="dashboard" location="timers">
        timers go here fool
      </div>
    `;
  }
}
