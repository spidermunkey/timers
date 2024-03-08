import { AbstractView } from "./AbstractView.js";
import { TimerList } from "../components/Timer-List.js";
import { CurrentTimer } from "../components/Current-Timer.js";
import { NewTimerForm } from "../components/New-Timer-Form.js";
import { api } from "../api/app.js";
export default class Timers extends AbstractView {
  constructor() {

    // ADD ACCESSIBLITY SHORTCUTS (CTRL + C = COUNTDOWN TAB ++ CTRL + T ++ CTRL + P ++ CTRL + A)
    // ADD RESET BUTTON FOR SCROLL FUNCTIONALITY;
    super();
    this.timerList = new TimerList();
    this.nowPlaying = new CurrentTimer();
    this.newTimerForm = new NewTimerForm();
    
  }

  async hydrate() {

    $('.new-timer').classList.toggle('active');
    $('.now-playing').classList.remove('active');

    // HYDRATE REVOLVING NEW TIMER INPUT SLOTS
    $$('.input-slot').forEach(slot => slot.addEventListener('scroll',(function hardCodedScrollCounter() {

      let scrollContainer = $(`.ph-scroll-container[slot="${slot.getAttribute('slot')}"]`)
      let overflowContainer = slot;
      let zerosPlaceElement;
      let scrollStart = 30;
      // each scroll container has a place holder span 30px from the top
      // so that you can scroll beyond the beginning in order to lower/raise the zeroeth place
      scrollContainer.style.transform = `translateY(-${scrollStart}px)`;

      // int represents the index of the corresponding number where 1 represents the first digit of 0
      let int = 1;
  
      let tick = 30;
      let lastKnownScrollPosition = 0;
      let intermediateScrollPosition = 0;

      // slot type is the zeroth place or the nthn place
      // in the case of minutes and seconds the nth place goes to 9
      // and the zeroth place goes to 6
      // hours can be up to 99 until days are added to the module
      let slotType = slot.getAttribute('t')
      let maxINT = 7;
      if(slotType == 'h' || slotType == 'n')
        maxINT = 10
      if (slotType == 'n')
        zerosPlaceElement = slot.previousElementSibling;

      function diff(last,current) {
        let dir = last < current ? 'incer' : 'decer';
        let diffy = Math.abs(last - current);
        return [diffy,dir]
      }

      return function handleScroll(e) {

        intermediateScrollPosition = e.target.scrollTop;

        const scrollData = diff(lastKnownScrollPosition,intermediateScrollPosition);
        const difference = scrollData[0];
        const direction = scrollData[1];
        let maxINT,
            zerosPlaceSlotValue,
            zerosPlaceElementSlotType

        if (difference >= tick) {

          if (direction == 'incer')
            int = int + 1
          else if (direction == 'decer')
            int = int - 1

        
        // check if current scroller is n's place
        if (slotType == 'n') {

          maxINT = 7;
          zerosPlaceSlotValue = Number(zerosPlaceElement.getAttribute('sv'));
          zerosPlaceElementSlotType = zerosPlaceElement.getAttribute('t');

          if(zerosPlaceElementSlotType == 'h')
            maxINT = 10;
          if(zerosPlaceSlotValue == maxINT && direction == 'incer') {
            return
          }
          
            // so that you dont move n's place beyond zero if z's place is already maxed
        }



          if (int > maxINT){

            int = 1;

            // this will trigger another scroll event!!!
            e.target.scrollTop = int * tick;
            
            // if the nth slot reaches maxINT
            // increase/decrease the zeroeth place upto min/max values
            if (slotType == 'n') {
              

              
              // again hours may go up to 9.. the 9th number element is at 10 because 0 == 1st
              if(zerosPlaceElementSlotType == 'h')
                maxINT = 10;

                // if slot value is not already at its maximum increment
               if (zerosPlaceSlotValue < maxINT) {
                // remember to substract one from zerosPlaceSlotValue when using the actual form
                zerosPlaceElement.setAttribute('sv', zerosPlaceSlotValue + 1)
                zerosPlaceElement.scrollTop = (zerosPlaceSlotValue + 1) * tick
              }

            } 
          }
          else if (int == 0) {
            int = maxINT;
            e.target.scrollTop = int * tick
            if(slot.getAttribute('t') == 'n') {

              let zerosPlaceElement = slot.previousElementSibling;
              let minINT = 0;
              let int = Number(zerosPlaceElement.getAttribute('sv'));
              let slotType = zerosPlaceElement.getAttribute('t');
              let slotIndex = zerosPlaceElement.getAttribute('slot');
              zerosPlaceElement.setAttribute('sv', Math.max((int - 1),1))
              zerosPlaceElement.scrollTop = Math.max(1,(int - 1)) * tick
            }
          }

          lastKnownScrollPosition = int * tick
          console.log('tick',lastKnownScrollPosition,'int',int);

          scrollContainer.style.transform = `translateY(-${lastKnownScrollPosition}px)`
          slot.setAttribute('sv',int);
          $('input',slot).value=int
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
