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
    return html;
  }

  async render(destination) {
    console.log("yo", destination);
    destination.innerHTML = "";
    const element = document.createElement("div");
    this.element = element;
    destination.appendChild(element);
    element.innerHTML = `
    <div class="loader">loading...</div>
    `;
    const html = await this.getHTML();
    element.innerHTML = html;
  }
}
