export function hardCodedScrollCounter(slot) {

    let slotType = slot.getAttribute('t');
    // let zerosPlaceElement = slotType == 'n' ? slot.previousElementSibling : null;
    let container = $(`.ph-scroll-container[slot="${slot.getAttribute('slot')}"]`);
    container.style.transform = `translateY(-${30}px)`;
    let slotData = {
      type: slot.getAttribute('t'),
      tVal: slot.getAttribute('tv'),
      value: '',
      slotElement: slot,
      scrollContainer: $(`.ph-scroll-container[slot="${slot.getAttribute('slot')}"]`),
      zerosPlaceElement: slotType == 'n' ? slot.previousElementSibling : null,
      zerosPlaceElementType: slotType == 'n' ? slot.previousElementSibling.getAttribute('t') : null,
      get zerosPlaceValue() {
        if (this.zerosPlaceElement !== null) return Number(this.zerosPlaceElement.getAttribute('sv'))
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
      maxINT: slotType== 'h' || slotType== 'n' ? 9 : 6,
      maxZINT: null,
      
      updateValue(int) {
        this.slotElement.setAttribute('sv',int);
        return int;
      },
      updatePos(position) {
  
          this.scrollContainer.style.transform = 
            `translateY(-${(position * this.tick) + this.startPos}px)`;
  
          this.updateValue(position);
          this.int = position;
  
          return position;
      },
  
      updateZeroethElement(position) {
  
      },
  
      reset() {
        this.updatePos(0)
      },
  
      diff(position) {
        let last = this.lksp;
        let dir = last < position ? 'incer' : 'decer';
        let diffy = Math.abs(last - position);
        this.direction = dir;
        return [diffy,dir]
      },
  
      alignScrollTrap(event){
        this.slotElement.style.overflow='hidden';
        this.slotElement.onscroll = null;
        this.slotElement.scrollTop = this.slotElement.scrollHeight/2;
        this.lksp = this.slotElement.scrollTop;
        this.slotElement.onscroll = this.handleScroll.bind(this)
        this.slotElement.style.overflow='scroll';
      },  
  
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
    
    slotData.alignScrollTrap();
    slot.addEventListener('scrollend',() => slotData.alignScrollTrap)
    slot.addEventListener('mouseleave',() => slotData.alignScrollTrap())
    slot.addEventListener('mouseenter',() => slotData.alignScrollTrap())
  
    return throttle(slotData.handleScroll.bind(slotData))
  }