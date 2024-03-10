import { AbstractView } from "./AbstractView.js";
import { TimerList } from "../components/Timer-List.js";
import { CurrentTimer } from "../components/Current-Timer.js";
import { NewTimerForm } from "../components/New-Timer-Form.js";
import { api } from "../api/app.js";

function hardCodedScrollCounter(slot) {

  function throttle(fn, wait = 60) {
    var time = Date.now();
    return function() {
      if ((time + wait - Date.now()) < 0) {
        fn.call(this,...arguments);
        time = Date.now();
      } else return;
    }
  }
  
  let ticking = false;
  let slotType = slot.getAttribute('t');
  let zerosPlaceElement = slotType == 'n' ? slot.previousElementSibling : null;
  let container = $(`.ph-scroll-container[slot="${slot.getAttribute('slot')}"]`);
  container.style.transform = `translateY(-${30}px)`;
  slot.scrollTop = slot.scrollHeight/2;
  let slotData = {
    // put all of that in here so you don't have to reference the element again
    // turn it into an actual class or functional component
    type: slotType,
    tVal: slot.getAttribute('tv'),
    value: '',
    slotElement: slot,
    scrollContainer: $(`.ph-scroll-container[slot="${slot.getAttribute('slot')}"]`),
    zerosPlaceElement: slotType == 'n' ? slot.previousElementSibling : null,
    zerosPlaceElementType: slotType == 'n' ? slot.previousElementSibling.getAttribute('t') : null,

    throttle: {

    },

    get zerosPlaceValue() {
      if (this.zerosPlaceElement !== null)
        return Number(this.zerosPlaceElement.getAttribute('sv'))
      return null
    },
    get maxZINT() {
      let type = this.zerosPlaceElementType;
      switch (type) {
        case 'h': {
          return 9
        }
        case 'z': {
          return 6
        }
        default : {
          return null
        }

      }
    },
    int: 0,
    tick: 30,
    startPos: 30,
    lksp: 0,
    imsp: 0,
    direction: undefined,
    maxINT: slotType == 'h' || slotType == 'n' ? 9 : 6,
    maxZINT: null,

    set scrollPos(position) {
      // scroll logic
      let {type,value} = position
      switch (type) {
        case 'tick' : {

        }
        case 'pos' : {

        }
      }
    },
    get scrollPos() {
      return this.slotElement.scrollTop
    },
    
    updateValue(int) {
      this.slotElement.setAttribute('sv',int);
      return int;
    },
    updatePos(position) {
        let px = (position * this.tick) + this.startPos;
        console.log(px)
        requestAnimationFrame(() => this.scrollContainer.style.transform = `translateY(-${px}px)`)
        this.updateValue(position)
        this.int = position;
    },
    updateZeroethElement(position) {

    },

    reset() {
      this.updatePos(0)
    },

    diff(eventTarget) {
      let last = this.lksp;
      let current = eventTarget.scrollTop;
      let dir = last < current ? 'incer' : 'decer';
      let diffy = Math.abs(last - current);
      this.direction = dir;
      return [diffy,dir]
    },

    alignScrollTrap(){
      slot.style.overflow='hidden';
      slot.onscroll = null;
      slot.scrollTop = slot.scrollHeight/2;
      this.lksp = slot.scrollTop;
      slot.onscroll = this.handleScroll.bind(this)
      slot.style.overflow='scroll';
    },  

    handleScroll(event) {
      console.log('triggered')
      console.log(slot.scrollTop)
      // return;
      this.imsp = event.target.scrollTop;
      let [difference,direction] = this.diff(event.target),
       tickReady = difference >= this.tick;
      if (!tickReady) 
        return;
      let
        nextTick = direction == 'incer' ? this.int + 1 : this.int - 1,
        isNthElement = this.slotType == 'n',
        upperLimitReached = direction == 'incer' && (nextTick > this.maxINT),
        lowerLimitReached = direction == 'decer' && (this.int == 0);
      if (upperLimitReached || lowerLimitReached)
      {
        console.log('canceled at', slot.scrollTop);
        event.preventDefault()
        slot.scrollTop = this.lksp
        // slot.style.overflow='hidden';
        return;
      }
      let
        zeroethUpperReached = isNthElement && (this.zerosPlaceValue == this.maxZINT),
        zeroethLowerReached = isNthElement && (this.zerosPlaceValue < 0);

          this.updatePos(nextTick)
          this.lksp = this.imsp
       return;

    }
  }

  slot.addEventListener('scrollend',() => slotData.alignScrollTrap)
  slot.addEventListener('mouseleave',() => slotData.alignScrollTrap)
  slot.addEventListener('mouseenter',() => slotData.alignScrollTrap)
  return throttle(slotData.handleScroll.bind(slotData))
  
  
  let scrollContainer = $(`.ph-scroll-container[slot="${slot.getAttribute('slot')}"]`);
  let scrollStart = 30;
  // each scroll container has a place holder span 30px from the top
  // so that you can scroll beyond the beginning in order to lower/raise the zeroeth place
  // scrollContainer.style.transform = `translateY(-${scrollStart}px)`;

  // int represents the index of the corresponding number where 1 represents the first digit of 0
  let int = 1;

  let tick = 30;
  let lastKnownScrollPosition = 0;
  let intermediateScrollPosition = 0;

  // slot type is the zeroth place or the nthn place
  // in the case of minutes and seconds the nth place goes to 9
  // and the zeroth place goes to 6
  // hours can be up to 99 until days are added to the module

  let maxINT = 7;
  if(slotType == 'h' || slotType == 'n')
    maxINT = 10
  if (slotType == 'n')
    zerosPlaceElement = slot.previousElementSibling;

  function diff(last,current) {
    let dir = last < current ? 'incer' : 'decer';
    let diffy = Math.abs(last - current
      );
    return [diffy,dir];
  }
  function handleScroll(e) {

    let d = slotData;
    intermediateScrollPosition = e.target.scrollTop;
    d.imsp = intermediateScrollPosition;
    const scrollData = diff(lastKnownScrollPosition,intermediateScrollPosition);
    const difference = scrollData[0];
    const direction = scrollData[1];

    let maxINT = 10,
        maxZINT,
        zerosPlaceSlotValue,
        zerosPlaceElementSlotType,
        slotValue

    if (difference >= tick) {

      if (direction == 'incer')
        int = int + 1
      else if (direction == 'decer')
        int = int - 1

    
    // check if current scroller is n's place
    if (slotType == 'n') {

      // maxINT = 7;
      maxZINT = 10;

      zerosPlaceSlotValue = Number(zerosPlaceElement.getAttribute('sv'));
      zerosPlaceElementSlotType = zerosPlaceElement.getAttribute('t');

      if(zerosPlaceElementSlotType != 'h')
        maxZINT = 7
      if(zerosPlaceSlotValue == maxZINT && direction == 'incer') {
        return
      }
      
        // so that you dont move n's place beyond zero if z's place is already maxed
    } else if (slotType != 'h') {
      maxINT = 7;
      slotValue = Number(slot.getAttribute('sv'));
      if (slotValue == maxINT && direction == 'incer') {
        return;
      }
    }



      if (int > maxINT){

        int = 1;

        // this will trigger another scroll event!!!
        e.target.scrollTop = int * tick;
        
        // if the nth slot reaches maxINT
        // increase/decrease the zeroeth place upto min/max values

        // scrolling ns place
        if (slotType == 'n') {
          

          
          // again hours may go up to 9.. the 9th number element is at 10 because 0 == 1st
          if(zerosPlaceElementSlotType != 'h')
            maxINT = 7;

            // if slot value is not already at its maximum increment
           if (zerosPlaceSlotValue < maxINT) {
            // remember to substract one from zerosPlaceSlotValue when using the actual form
            zerosPlaceElement.setAttribute('sv', zerosPlaceSlotValue + 1)
            zerosPlaceElement.scrollTop = (zerosPlaceSlotValue + 1) * tick
          }

          // scrolling zeros place
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

}
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
    $$('.input-slot').forEach(slot => slot.onscroll = hardCodedScrollCounter(slot))

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
