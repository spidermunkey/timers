import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Dashboard");
  }

  async getHTML() {
    return  `
      <div class="dashboard" location="timers">
        timers go here fool
      </div>
    `;
  }
}