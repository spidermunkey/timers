import { AbstractView } from "./AbstractView.js";
import { TimerList } from "../components/Timer-List.js";

export default class Timers extends AbstractView {
  constructor() {
    super();
    // this.setTitle("Countdown Timers");
  }

  async hydrate() {
    this.element.addEventListener("click", (e) => {
      if (!this.timerList) return;
      const timer = e.target.closest(".timer");
      let clickedTimer;
      const clickedControl = e.target.closest(".ctrl-wrapper");
      if (timer) {
        [clickedTimer] = this.timerList.getTimerData(timer.dataset.id);
        this.timerList.updateNowPlaying(clickedTimer);
      }
      if (clickedControl && clickedTimer) {
        clickedTimer.currentInterval
          ? clickedTimer.pause()
          : clickedTimer.play();
      }
    });
  }

  async getHTML() {
    this.timerList = new TimerList();
    const html = await this.timerList.getHTML();

    return html;
  }

  async render(destination) {
    this.setTitle("Countdown Timers");

    const setBlank = (destination) => {
      const element = document.createElement("div");
      this.element = element;
      destination.appendChild(element);
      return element;
    };

    this.element = setBlank(destination);

    this.element.innerHTML = `
    <div class="loader">loading...</div>
    `;

    this.element.innerHTML = await this.getHTML();

    this.hydrate();
    this.once = true;
  }
}
