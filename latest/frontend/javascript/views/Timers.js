import { AbstractView } from "./AbstractView.js";
import { TimerList } from "../components/Timer-List.js";

export default class Timers extends AbstractView {
  constructor() {
    super();
  }

  async hydrate() {
    this.element.addEventListener("click", (e) => {
      const play = (timer) => {
        if (this.currentTimer) this.currentTimer.pause();

        this.currentTimer = timer;
        timer.play();
        $(".now-playing .play").classList.remove("current");
        $(".now-playing .pause").classList.add("current");
      };
      const pause = (timer) => {
        timer.pause();
        $(".now-playing .play").classList.add("current");
        $(".now-playing .pause").classList.remove("current");
      };

      if (!this.timerList) return;
      const timer = e.target.closest(".timer");
      let clickedTimer;
      const clickedControl = e.target.closest(".ctrl-wrapper");
      if (timer) {
        [clickedTimer] = this.timerList.getTimerData(timer.dataset.id);
        this.timerList.updateNowPlaying(clickedTimer);
      }
      if (clickedControl && clickedTimer) {
        clickedTimer.currentInterval ? pause(clickedTimer) : play(clickedTimer);
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

    this.element = setBlank(destination);

    this.element.innerHTML = this.getLoader();

    this.element.innerHTML = await this.getHTML();

    this.hydrate();

    this.once = true;
  }
}
