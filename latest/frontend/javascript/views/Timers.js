import { AbstractView } from "./AbstractView.js";
import { TimerList } from "../components/Timer-List.js";
import { CurrentTimer } from "../components/Current-Timer.js";
import { NewTimerForm } from "../components/New-Timer-Form.js";
import { api } from "../api/app.js";
export default class Timers extends AbstractView {
  constructor() {

    // ADD ACCESSIBLITY SHORTCUTS (CTRL + C = COUNTDOWN TAB ++ CTRL + T ++ CTRL + P ++ CTRL + A)
    super();
    this.timerList = new TimerList();
    this.nowPlaying = new CurrentTimer();
    this.newTimerForm = new NewTimerForm();
    
  }

  async hydrate() {

    $('.new-timer').classList.toggle('active');
    $('.now-playing').classList.remove('active');

    $$('.input-slot').forEach(slot => slot.addEventListener('scroll',(function hardCodedScrollCounter() {

      let int = 0;
      let tick = 30;
      let maxINT = 6;
      let maxScroll = 350;
      let ticking = false;

      let lastKnownScrollPosition = 0;
      let intermediateScrollPosition = 0;
      let currentScrollPosition = 0;
      let scrollContainer = $(`.ph-scroll-container[slot="${slot.getAttribute('slot')}"]`)
      let scrollSlot = slot;
      
      if(slot.getAttribute('t') == 'h' || slot.getAttribute('t') == 'n')
        maxINT = 9
      function diff(last,current) {
        let dir = last < current ? 'incer' : 'decer';
        let diffy = Math.abs(last - current);
        return [diffy,dir]
      }

      return function(e) {

        intermediateScrollPosition = e.target.scrollTop;
        const scrollData = diff(lastKnownScrollPosition,intermediateScrollPosition);
        const difference = scrollData[0];
        const direction = scrollData[1];
        if (difference >= tick) {
          direction == 'incer'
            ? int = int + 1
            : int = int - 1
          if (int > maxINT){
            int = 0;
            e.target.scrollTop = 0;
          }

          lastKnownScrollPosition = int * tick
          console.log('tick',lastKnownScrollPosition,'int',int);

          scrollContainer.style.transform = `translateY(-${lastKnownScrollPosition}px)`

        }

        //   int = Math.round(intermediateScrollPosition/tick)
        //   console.log(int)
        //   $('.ph-scroll').transform = `translateY(${int * tick}px)`
        // }
        // if (!ticking) {
        //   window.requestAnimationFrame((() => {
        //     doSomething(currentScrollPosition)
        //     ticking = false
        //   }))

        //   ticking = true;
        // }
      }

    })()))

    this.element.addEventListener("click", (e) => 
    {
      if (!this.timerList) return;
      
      const play = (timer) => {
        this.currentTimer = timer;
        this.nowPlaying.update(timer)
        timer.play();
      };

      const pause = (timer) => {
        timer.pause();
      };

      const edit = (timer) => {
        log(timer)
        const editOverlay = $(".sub-overlay", timer)
        editOverlay.innerHTML = `
          <div class="edit-modal">
            edit me
            <div class="close">close</div>
          </div>
        `;
        listen($(".sub-overlay .close",timer), () => editOverlay.classList.remove("active"));

        editOverlay.classList.add("active");
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
        $('.new-timer').classList.add('active');
      };

      const toggleForm = () => {
        $('.new-timer').classList.toggle('active');
        $('.now-playing').classList.remove('active');
      }

      const closeForm = () => {
        $('.new-timer').classList.remove('active');
        $('.now-playing').classList.add('active');
      };


      this.timerList.timers.forEach(timer => {
        timer.onComplete(() => this.nowPlaying.syncComplete(timer));
        timer.onPlay(() => this.nowPlaying.syncPlay(timer));
        timer.onPause(() => this.nowPlaying.syncPause(timer));
      });

      $('.new-timer-form .form-close').addEventListener('click',closeForm);

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
          this.nowPlaying.update(clickedTimer);
          this.currentTimer = clickedTimer;
        }
        else {
          this.nowPlaying.update(clickedTimer);
          this.currentTimer = clickedTimer
        }
      };


      if (clickedNPControl && this.currentTimer)
        this.currentTimer.currentInterval
          ? pause(this.currentTimer)
          : play(this.currentTimer);

          if (btnNew)
            toggleForm();


      });

  }

  async getHTML() {
    return `
    <div class="col-1">
      ${this.nowPlaying.getHTML()}
      ${this.newTimerForm.getHTML()}
    </div>
    <div class="col-2">
      ${await this.timerList.getHTML()}
    </div>
    `;
  }

  async render(destination) {
    this.setTitle("Timers");

    this.element = setBlank(destination);
    this.element.classList.add('dashboard--view')

    this.element.innerHTML = this.getLoader();

    this.element.innerHTML = await this.getHTML();

    this.hydrate();

    this.once = true;
  }
}
