import { AbstractView } from "./AbstractView.js";
import { TimerList } from "../components/Timer-List.js";
import { api } from "../api/app.js";
export default class Timers extends AbstractView {
  constructor() {
    super();

  }

  async hydrate() {
    this.element.addEventListener("click", (e) => 
    {
      if (!this.timerList) return;

      $('.new-timer-form .form-close').addEventListener('click',function close(){
        $('.new-timer-form').classList.remove('active');
      })

      // $('.new-timer-btn').addEventListener('click',function open() {
      //   $('.new-timer-form').classList.add('active');
      // })

      const play = (timer) => {
        this.currentTimer = timer;
        this.timerList.updateNowPlaying(timer);
        timer.play();
      };

      const pause = (timer) => {
        // console.log('hi')
        timer.pause();
      };

      const edit = (timer) => {
        $(".sub-overlay", timer).innerHTML = `
          <div class="edit-modal">
            edit me
            <div class="close">close</div>
          </div>
        `;
        const close = () => $(".sub-overlay", timer).classList.remove("active");

        listen($(".sub-overlay .close"), close);

        $(".sub-overlay", timer).classList.add("active");
      };

      const dele = (timer) => {
        const id = timer.dataset.id;
        const modal = `<div class="rusure">
        <div class="ttl">Are you sure?</div>
        <div class="yes">delete</div>
        <div class="no">cancel</div>
        </div>`;

        $(".sub-overlay", timer).innerHTML = modal;
        const close = () => $(".sub-overlay", timer).classList.remove("active");
        const destroy = async () => {
          const success = await api.delete(id);
          if (success) {
            const [timer] = this.timerList.getTimerData(id);
            console.log(timer);

            timer.destroy();
          }
        };
        listen($(".sub-overlay .no"), close);
        listen($(".sub-overlay .yes"), destroy);
        $(".sub-overlay", timer).classList.add("active");
      };

      const showForm = () => {
        $('.new-timer-form').classList.add('active');
      }

      const closeForm = () => {
        $('.new-time-form').classList.remove('active');
      }

      let clickedTimer;
      const timer = e.target.closest(".timer");
      const clickedControl = e.target.closest(".ctrl-wrapper");
      const clickedNPControl = e.target.closest(".current-timer-controls");
      const btnEdit = e.target.closest(".edit-time-option");
      const btnDelete = e.target.closest(".delete-option");
      const btnNew = e.target.closest(".new-timer-btn");
      if (timer) {
        [clickedTimer] = this.timerList.getTimerData(timer.dataset.id);
        
        if (clickedControl) {
          this.currentTimer && this.currentTimer !== clickedTimer ? pause(this.currentTimer) : null;
          console.log(clickedTimer)
          clickedTimer.currentInterval
            ? pause(clickedTimer)
            : play(clickedTimer);
        }

        else if (btnEdit)
          edit(timer);
        else if (btnDelete)
          dele(timer);
        else if (!clickedControl && this.currentTimer) {
          pause(this.currentTimer);
          this.timerList.updateNowPlaying(clickedTimer);
          this.currentTimer = clickedTimer;
        }
        else {
          this.timerList.updateNowPlaying(clickedTimer);
          this.currentTimer = clickedTimer
        }
      }


      if (clickedNPControl && this.currentTimer)
        this.currentTimer.currentInterval
          ? pause(this.currentTimer)
          : play(this.currentTimer);

          if (btnNew)
            showForm();
    });
  }

  async getHTML() {
    this.timerList = new TimerList();
    const html = await this.timerList.getHTML();
    return html;
  }

  async render(destination) {
    this.setTitle("Timers");

    this.element = setBlank(destination);

    this.element.innerHTML = this.getLoader();

    this.element.innerHTML = await this.getHTML();

    this.hydrate();

    this.once = true;
  }
}
