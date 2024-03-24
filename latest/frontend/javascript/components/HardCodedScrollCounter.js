export class ScrollCountingGroupData {
  constructor(z,n) {
    this.nthScrollCounter = n
    this.zeroScrollCounter = z
  }

    get zValue() {
        if (this.zeroScrollCounter) {
            return this.zeroScrollCounter.int;
        }
    }
    get nValue() {
        if (this.nthScrollCounter) {
            return this.nthScrollCounter.int;
        }
    }
    get total(){
        return [this.zValue,this.nValue].join('');
    }
}

export class ScrollCounterTotalData {
  constructor(h,m,s) {
    this.hourGroup = h;
    this.minuteGroup = m;
    this.secondGroup = s;
    
  }

  get total() {
    return {
      hours: this.hourGroup.total,
      minutes: this.minuteGroup.total,
      seconds: this.secondGroup.total,
    }
  }

  formatMs() {
    console.log(this.total,'here')
    console.log(Timer.timeInMs(this.total))
    return Timer.timeInMs(this.total)
  }
  formatTotal() {
    console.log(Timer.formatMs(this.formatMs()))
    return Timer.formatMs(this.formatMs())
  }

}

export class ScrollCounter {
  constructor(slot) {
    // show zeros on render
      $(`.ph-scroll-container[slot="${slot.getAttribute('slot')}"]`).style.transform = `translateY(-${30}px)`;
    
    this.type = slot.getAttribute('t')
    this.tVal = slot.getAttribute('tv')
    this.value = ''
    this.slotElement = slot
    this.slotInput = $('input',slot)
    this.scrollContainer = $(`.ph-scroll-container[slot="${slot.getAttribute('slot')}"]`)
    this.zerosPlaceElement = this.type == 'n' ? slot.previousElementSibling : null
    this.zerosPlaceElementType = this.type == 'n' ? slot.previousElementSibling.getAttribute('t') : null
    this.int = 0
    this.tick = 30
    this.startPos = 30
    this.lksp = 0
    this.imsp = 0
    this.direction = undefined
    this.maxINT = this.type== 'h' || this.type== 'n' ? 9 : 6
    // this.maxZINT = null
    this.observable = new Observer();
    this.alignScrollTrap();
    slot.addEventListener('scrollend',() => this.alignScrollTrap)
    slot.addEventListener('mouseleave',() => this.alignScrollTrap())
    slot.addEventListener('mouseenter',() => this.alignScrollTrap())
  
    slot.addEventListener('scroll',()=>throttle(this.handleScroll.bind(this)))
    
  }

  get zerosPlaceValue() {
    if (this.zerosPlaceElement !== null) return Number(this.zerosPlaceElement.getAttribute('sv'));
    return null;
  }
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
  }

  onUpdate(callback){
    this.observable.subscribe(callback)
  }
        
  updateValue(int) {
    this.slotElement.setAttribute('sv',int);
    this.slotInput.value = int;
    this.observable.notify(int);
    return int;
  }

  updatePos(position) {
    this.int = position;

      this.scrollContainer.style.transform = 
        `translateY(-${(position * this.tick) + this.startPos}px)`;

      this.updateValue(position);
      return position;
  }

  updateZeroethElement(position) {

  }

  reset() {
    this.updatePos(0)
  }

  diff(position) {
    let last = this.lksp;
    let dir = last < position ? 'incer' : 'decer';
    let diffy = Math.abs(last - position);
    this.direction = dir;
    return [diffy,dir]
  }

  alignScrollTrap(event){
    this.slotElement.style.overflow='hidden';
    this.slotElement.onscroll = null;
    this.slotElement.scrollTop = this.slotElement.scrollHeight/2;
    this.lksp = this.slotElement.scrollTop;
    this.slotElement.onscroll = this.handleScroll.bind(this)
    this.slotElement.style.overflow='scroll';
  }

  handleScroll(event) {

    this.imsp = event.target.scrollTop;
    let [difference,direction] = this.diff(event.target.scrollTop),

      nextTick = direction == 'incer' ? this.int + 1 : this.int - 1,
      isNthElement = this.slotType == 'n',
      upperLimitReached = direction == 'incer' && (nextTick > this.maxINT),
      lowerLimitReached = direction == 'decer' && (this.int == 0),
      tickReady = difference >= this.tick,
      zeroethUpperReached = isNthElement && (this.zerosPlaceValue == this.maxZINT),
      zeroethLowerReached = isNthElement && (this.zerosPlaceValue < 0);

    if (!tickReady) 
      return;

    if (upperLimitReached || lowerLimitReached) {
      event.preventDefault()
      this.alignScrollTrap(event)
      return;
    }

    this.updatePos(nextTick);
    this.lksp = this.imsp;
    return;

  }
}