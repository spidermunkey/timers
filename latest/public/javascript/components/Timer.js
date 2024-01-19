/* 
    TODO 

    CREATE SECTION FOR ALL TRACKERS

    UPDATE UI DESIGN
        --add sound
*/

import {api} from '../api/app';
export class Timer {
    // DEFAULTS TO COUNTDOWN
    constructor({props}) {

        this.currentInterval = null;

        this.days = props.days || [];

        this.title = props.title;

        this.time = props.time;

        this.initial = props.initial || structuredClone(props.time);

        this.id = props.id || uuid();

        this.element = undefined;
        
        let today = new Date();

        let dow = ['sun','mon','tue','wed','thu','fri','sat'];

        this.isToday = this.days.some(day => day === dow[today.getDay()]) || null;
    }

    padNum(num) {
        if (num.toString().length == 1) 
            return num.toString().padStart(2,'0')
        else return num.toString();
    }
    
    play() {
        if (this.currentInterval) return;
        this.currentInterval = setInterval(this.countdown.bind(this),1000);
    }

    decer() {
        let t = Timer.formatMs(this.time.total - 1000);

        if (Math.round(t.total) <= 0) {
            t = Timer.formatMs(0);
            clearInterval(this.currentInterval);
            this.currentInterval = null;
            return t
        }

        return t;
    }

    incer() {
        let t = Timer.formatMs(this.time.total + 1000);

        if (Math.round(t.total) < 0) {
            t = Timer.formatMs(0);
            clearInterval(this.currentInterval);
            this.currentInterval = null;
            return t
        }

        return t;
    }

    pause(){

        clearInterval(this.currentInterval);
        this.currentInterval = null;
        this.showPaused();
        return;
    }

    stop(){
        clearInterval(this.currentInterval);
        this.currentInterval = null;
    }

    reset() {
        clearInterval(this.currentInterval);
        this.currentInterval = null;
        this.time = structuredClone(this.initial);
    }
    
    resetView() {
        this.showPaused();
        this.reset();
        this.update();
    }

    countdown() {
        this.time = this.decer();

        if (this.time.total <= 0) 
            return this.resetView();
        this.update();
    }


    create(type) {

        let html = this.createTimerElement(type);
        let fragment = frag();
        let element = div();

        element.innerHTML = html;
        element.dataset.id = this.id;
        fragment.appendChild(element);

        return fragment;
    }

    showPlaying() {
        if (!this.element) return;
        $('.pause',this.element).classList.add('current');
        $('.play',this.element).classList.remove('current');
    }
    
    showPaused() {
        console.log(this)
        if (!this.element) return;
        $('.play',this.element).classList.add('current');
        $('.pause',this.element).classList.remove('current');
    }

    render(destination,type){
        const frag = this.create(type);
        this.element = $(`[data-id="${this.id}"]`,frag);
        destination.appendChild(frag);

        this.hydrate();
    }

    hydrate() {
        listen($('.ctrl-wrapper',this.element),() => {
            if (!this.currentInterval){
                this.showPlaying();
                this.play();
            }
            else if (this.currentInterval) {
                this.showPaused();
                this.pause();
            }
        });
        listen($('.reset',this.element), this.resetView.bind(this));
        listen($('.delete',this.element),this.delete.bind(this));
        listen($('.edit',this.element), this.showEditForm.bind(this));
    }

    update() {
        if (!this.element) return;
        $('.time-slot-wrapper',this.element).innerHTML = this.createTimeSlot();
    }

    showEditForm() {
        let form = div();
        form.innerHTML = this.createEditForm(this.successTime ? this.successTime : this.time);
        hydrateForm.call(this);
        form.classList.add('edit-timer');
        form.style.display = 'block';

        let currentForm = $('.timer-list .edit-timer');
        if (currentForm) currentForm.remove(form)
        $('.timer-list').appendChild(form);

        function hydrateForm() {
            const timerDayInputs = $$('.inp-field[data-type="day"] input[type="checkbox"]',form);
            // const timerTimeInputs = $$('.inp-field input[data-type="time"]',form);
            const timerNeverInput = $('.inp-field[data-type="binary"] .option[data-option="never"] input[type="checkbox"]',form);
            const timerEveryInput = $('.inp-field[data-type="binary"] .option[data-option="every"] input[type="checkbox"]',form);

            listen(timerNeverInput,function toggleEveryInput(){
                if (timerNeverInput.checked) {
                    uncheck(timerEveryInput);
                    uncheckAll(timerDayInputs);
            }},'input');
            
            listen(timerEveryInput,function toggleNeverInput() {
                if (timerEveryInput.checked) {
                    uncheck(timerNeverInput);
                    checkAll(timerDayInputs);
                }
            },'input');
            timerDayInputs.forEach(function EVENTS__dayInputs(inp) {

                inp.addEventListener('input',() => {
            
                    // handle all checked
                    if (oneUnchecked(timerDayInputs)) 
                        uncheck(timerEveryInput)
                    else if (allChecked(timerDayInputs)) 
                        check(timerEveryInput)
            
                    // handle none checked
                    if (oneChecked(timerDayInputs))
                        uncheck(timerNeverInput)
                    else if (noneChecked(timerDayInputs))
                        check(timerNeverInput)
            
                })
            });
            form.addEventListener('submit',(e) => submit.call(this,e,form));
            form.querySelector('.close').addEventListener('click',() => {
                form.remove();
            })

            async function submit(event,formElement){
                event.preventDefault();

                const fdo = new FormData(formElement);
                let props = parseForm(fdo,formElement)
                props.id = this.id
                let newDoc = await api.edit(this.id, props);
        
                if (newDoc){
                    this.edit(newDoc);
                    formElement.remove();
                }
            }
        }

        function parseForm(formDataObject,formElement){

            let fdo = formDataObject;
            for (const entry of fdo)
                if (entry[1].trim() === '') entry[1] = 0;
        
                    // Get the values of the checkboxes for days
            let days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].filter(day => {
                let checkbox = $(`.inp-field[data-type="day"] input[name="day"][data-day="${day}"]`,formElement);
        
                if (checkbox && checkbox.checked){
                    console.log(day)
                    return true
                }
            });
            console.log(days)
        
            let
                title = fdo.get('title'),
                hours = fdo.getAll('hours').join(''),
                minutes = fdo.getAll('minutes').join(''),
                seconds = fdo.getAll('seconds').join(''),
                total = Timer.timeInMs({hours,minutes,seconds}),
                id = uuid(),
                time = { hours, minutes, seconds, total },
                initial = time;
        
            return {
                title,
                id,
                time,
                days,
                initial
            };
        }

    }

    edit(props) {

        this.days = props.days || [];

        this.title = props.title;

        this.time = props.time;

        this.initial = props.initial || structuredClone(props.time);

        this.id = props.id || uuid();

        let today = new Date();

        let dow = ['sun','mon','tue','wed','thu','fri','sat'];

        this.isToday = this.days.some(day => day === dow[today.getDay()]) || null;

        const frag = this.create();
        this.element = $(`[data-id="${this.id}"]`,frag);
        $(`[data-id="${this.id}"]`,$('.timer-list')).replaceWith(this.element);
        this.hydrate();
        
    }

    async delete() {
        console.log(api,'delete');
        const deleted = api.delete(this.id);
        if (deleted){
            this.element.remove();
            this.element = null;
        }
    }

    static timeInMs({hours,minutes,seconds}) {
            // convert all to ms
            let
                msSeconds = seconds * 1000,
                msMinutes = minutes * 60000,
                msHours = hours * 3600000;

            return msHours + msSeconds + msMinutes;

    }

    static formatMs(ms) {

        const msInSeconds = 1000;
        const msInMinutes = 60000;
        const msInHours = 3600000;

        const approxHour = ms / 3600000;
        const hours = Math.floor(approxHour);
        const hoursFloat = approxHour - hours;
        
        const approxMinutes = hoursFloat * msInHours / msInMinutes;
        const minutes = Math.floor(approxMinutes);
        const minutesFloat = approxMinutes - minutes;

        const seconds = Math.round(minutesFloat * msInMinutes / msInSeconds)
        
        return {
            hours,
            minutes,
            seconds,
            total:ms,
        }
    }

    createTimerElement(type = 'timer') {
        return `
        <div class="timer" data-type=${type} >

            <div class="timer--header">
                <div class="timer--header-title">
                    <span class="label">${this.title}</span>
                </div>
                <div class="timer--options">
                    <div class="option edit">
                        <span class="label">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. -->
                                <path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"></path>
                            </svg>
                        </span>
                    </div>    
                    <div class="option delete">
                        <span class="label">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. -->
                                <path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"></path>
                            </svg>
                        </span>
                    </div> 
                </div>
            </div>

            <div class="timer--clock">
                <div class="timer--clock-controls">
                    <div class="ctrl-wrapper">
                        <div class="play ctrl current">
                            <span class="control">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. -->
                                    <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"></path>
                                </svg>
                            </span>
                        </div>
                        <div class="pause ctrl">
                            <span class="control">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <!--! Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. -->
                                    <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"></path>
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div class="reset">reset</div>
    
                </div>
    
                <div class="timer--clock-times">
                    <div class="time-slot-wrapper">${this.createTimeSlot(this.time)}</div>
                </div>
            </div>
        </div>`
    }
    
    createTimeSlot({hours,minutes,seconds}) {
        let 
            h = this.padNum(hours),
            m = this.padNum(minutes),
            s = this.padNum(seconds);

        return `
        <div class="hours time-slot">
            <div class="tenth-hour">${h[0] || 0}</div>
            <div class="zero-hour">${h[1] || 0}</div>
            <span class="label">h</span>
        </div>
        <div class="minutes time-slot">
            <div class="tenth-minute">${m[0] || 0}</div>
            <div class="zero-minute">${m[1] || 0}</div>
            <span class="label">m</span>
        </div>
        <div class="seconds time-slot">
            <div class="tenth-second">${s[0]|| 0}</div>
            <div class="zero-second">${s[1] || 0}</div>
            <span class="label">s</span>
        </div>`
    }

    createEditForm({hours,minutes,seconds}){
        let 
            h = this.padNum(hours),
            m = this.padNum(minutes),
            s = this.padNum(seconds);

        return `                
        <form action="#" id="edit-timer">

        <div class="close">x</div>
        <div class="new-timer--form">
            <div class="new-timer--form-field" data-field="title">
                <span class="inp-field" data-type="title">
                    <span class="label">Title</span>
                    <input type="text" name="title" id="form-title" autocomplete="off" value="${this.title}" required>
                </span>
            </div>
            <div class="new-timer--form-field" data-field="time">
                <span class="inp-field" data-type="hours">
                    <input name="hours" id="nHours" value="${h[0]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <input name="hours" id="0Hours" value="${h[1]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <span class="label">h</span>
                </span>
                <span class="inp-field" data-type="minutes">
                    <input name="minutes" id="nMinutes" value="${m[0]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <input name="minutes" id="0Minutes" value="${m[1]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <span class="label">m</span>
                </span>
                <span class="inp-field" data-type="seconds">
                    <input name="seconds" id="nSeconds" value="${s[0]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <input name="seconds" id="0Seconds" value="${s[1]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
                    <span class="label">s</span>
                </span>
            </div>
            <div class="new-timer--form-field" data-field="occurance">
                <div class="inp-field" data-type="day">
                    <label for="mon">
                        <span class="label">M</span>
                    </label>
                    <input type="checkbox" name="day" data-day="mon" ${this.days.some(day => day === 'mon') ? 'checked' : null }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="tue">
                        <span class="label">T</span>
                    </label>
                    <input type="checkbox" name="day" data-day="tue" id="tue"${this.days.some(day => day === 'tue') ? 'checked' : null }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="wed">
                        <span class="label">W</span>
                    </label>
                    <input type="checkbox" name="day" data-day="wed" data-day="wed" id="wed"${this.days.some(day => day === 'wed') ? 'checked' : null }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="thu">
                        <span class="label">T</span>
                    </label>
                    <input type="checkbox" name="day" data-day="thu" id="thu"${this.days.some(day => day === 'thu') ? 'checked' : null }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="fri">
                        <span class="label">F</span>
                    </label>
                    <input type="checkbox" name="day" data-day="fri" id="fri"${this.days.some(day => day === 'fri') ? 'checked' : null }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="sat">
                        <span class="label">S</span>
                    </label>
                    <input type="checkbox" name="day" data-day="sat" id="sat"${this.days.some(day => day === 'sat') ? 'checked' : null }>
                </div>
                <div class="inp-field" data-type="day">
                    <label for="sun">
                        <span class="label">S</span>
                    </label>
                    <input type="checkbox" name="day" data-day="sun" id="sun"${this.days.some(day => day === 'sun') ? 'checked' : null }>
                </div>
                <div class="inp-field" data-type="binary">
                    <div class="option" data-option="never">
                        <label for="never">
                            <span class="label">never</span>
                        </label>
                        <input type="checkbox" name="never" id="never" ${this.days.length == 0 ? 'checked' : null }>
                    </div>
                    <div class="option" data-option="every">
                        <label for="everyday">
                            <span class="label">everyday</span>
                        </label>
                        <input type="checkbox" name="every" id="every" ${this.days.length == 7 ? 'checked' : null }>
                    </div>
                </div>
            </div>
            <div class="tod-modal">
                <div class="option selected">
                    <span class="label">ANY</span>
                </div>
                <div class="option">
                    <div class="hour">
                        <span class="nHour">05</span>
                        <span class="breaker">:</span>
                        <span class="0hour">00</span>
                    </div>
                    <div class="minute"></div>
                </div>
            </div>
            <span class="btn-create">
                <span class="label">Edit</span>
                <input type="submit" name="create" id="btn-create">
            </span>
        </div>
    </form>`
    }
}


export class TimeTracker extends Timer {
    constructor({props}) {
        super({props});

        this.logs = [];

        this.initial = Timer.formatMs(0);
        this.successTime = props.successTime; 
        this.onSuccess = props.onSucces || function() {
            console.log(`${this.title} tracker has completed`);
            if (this.element)
                $('.timer',this.element).classList.add('complete')

        };

        this.success = false;

        this.resetAfterSuccess = props.resetOnSuccess || false;
    }

    countup() {
        this.time = this.incer();
        if (this.success === false && this.time.total >= this.successTime.total){
            this.success = true;
            this.onSuccess();
        }
        if (this.resetOnSuccess)
            return this.resetView();
        else this.update();
    }

    play() {
        if (this.currentInterval) return;
        this.currentInterval = setInterval(this.countup.bind(this),1000);
        this.logStart();
    }

    pause(){

        clearInterval(this.currentInterval);
        this.currentInterval = null;
        this.showPaused();
        this.logStop();
        return;
    }

    async logStart() {

        let stamp = DateTime.stamp();
        let log = {
            type: 'start',
            tID: this.id,
            task: this.title,
            elapsed: this.time,
            stamp,
        }
        console.log(log);
        this.logs.push(log);
        const success = await api.log(log)
        if (success)
            console.log(success)
        else 
            console.error(success)
        return log;
    }

    async logStop() {

        let stamp = DateTime.stamp();
        let completed = this.time.total >= this.successTime.total
        let prevLog = last(this.logs)
        let comp = DateTime.from(new Date(prevLog.stamp.ms));

        let since = {
            hours: comp.hours,
            minutes: comp.minutes,
            seconds: comp.seconds,
        }

        let log = {
            type: 'stop',
            tID: this.id,
            task: this.title,
            elapsed: this.time,
            sinceLastStop: since,
            completed,
            stamp,
        }

        const success = await api.log(log)

        if (success)
            console.log(success)
        else 
            console.error(success)
        return log;

    }

    logComplete(){

    }

    // createEditForm({hours,minutes,seconds}){
    //     let 
    //         h = this.padNum(hours),
    //         m = this.padNum(minutes),
    //         s = this.padNum(seconds);

    //     return `                
    //     <form action="#" id="edit-timer">

    //     <div class="close">x</div>
    //     <div class="new-timer--form">
    //         <div class="new-timer--form-field" data-field="title">
    //             <span class="inp-field" data-type="title">
    //                 <span class="label">Title</span>
    //                 <input type="text" name="title" id="form-title" autocomplete="off" value="${this.title}" required>
    //             </span>
    //         </div>
    //         <div class="new-timer--form-field" data-field="time">
    //             <span class="inp-field" data-type="hours">
    //                 <input name="hours" id="nHours" value="${h[0]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
    //                 <input name="hours" id="0Hours" value="${h[1]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
    //                 <span class="label">h</span>
    //             </span>
    //             <span class="inp-field" data-type="minutes">
    //                 <input name="minutes" id="nMinutes" value="${m[0]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
    //                 <input name="minutes" id="0Minutes" value="${m[1]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
    //                 <span class="label">m</span>
    //             </span>
    //             <span class="inp-field" data-type="seconds">
    //                 <input name="seconds" id="nSeconds" value="${s[0]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
    //                 <input name="seconds" id="0Seconds" value="${s[1]}" maxlength="1" data-type="time" pattern="[0-9]" autocomplete="off">
    //                 <span class="label">s</span>
    //             </span>
    //         </div>
    //         <div class="new-timer--form-field" data-field="occurance">
    //             <div class="inp-field" data-type="day">
    //                 <label for="mon">
    //                     <span class="label">M</span>
    //                 </label>
    //                 <input type="checkbox" name="day" data-day="mon" ${this.days.some(day => day === 'mon') ? 'checked' : null }>
    //             </div>
    //             <div class="inp-field" data-type="day">
    //                 <label for="tue">
    //                     <span class="label">T</span>
    //                 </label>
    //                 <input type="checkbox" name="day" data-day="tue" id="tue"${this.days.some(day => day === 'tue') ? 'checked' : null }>
    //             </div>
    //             <div class="inp-field" data-type="day">
    //                 <label for="wed">
    //                     <span class="label">W</span>
    //                 </label>
    //                 <input type="checkbox" name="day" data-day="wed" data-day="wed" id="wed"${this.days.some(day => day === 'wed') ? 'checked' : null }>
    //             </div>
    //             <div class="inp-field" data-type="day">
    //                 <label for="thu">
    //                     <span class="label">T</span>
    //                 </label>
    //                 <input type="checkbox" name="day" data-day="thu" id="thu"${this.days.some(day => day === 'thu') ? 'checked' : null }>
    //             </div>
    //             <div class="inp-field" data-type="day">
    //                 <label for="fri">
    //                     <span class="label">F</span>
    //                 </label>
    //                 <input type="checkbox" name="day" data-day="fri" id="fri"${this.days.some(day => day === 'fri') ? 'checked' : null }>
    //             </div>
    //             <div class="inp-field" data-type="day">
    //                 <label for="sat">
    //                     <span class="label">S</span>
    //                 </label>
    //                 <input type="checkbox" name="day" data-day="sat" id="sat"${this.days.some(day => day === 'sat') ? 'checked' : null }>
    //             </div>
    //             <div class="inp-field" data-type="day">
    //                 <label for="sun">
    //                     <span class="label">S</span>
    //                 </label>
    //                 <input type="checkbox" name="day" data-day="sun" id="sun"${this.days.some(day => day === 'sun') ? 'checked' : null }>
    //             </div>
    //             <div class="inp-field" data-type="binary">
    //                 <div class="option" data-option="never">
    //                     <label for="never">
    //                         <span class="label">never</span>
    //                     </label>
    //                     <input type="checkbox" name="never" id="never" ${this.days.length == 0 ? 'checked' : null }>
    //                 </div>
    //                 <div class="option" data-option="every">
    //                     <label for="everyday">
    //                         <span class="label">everyday</span>
    //                     </label>
    //                     <input type="checkbox" name="every" id="every" ${this.days.length == 7 ? 'checked' : null }>
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="tod-modal">
    //             <div class="option selected">
    //                 <span class="label">ANY</span>
    //             </div>
    //             <div class="option">
    //                 <div class="hour">
    //                     <span class="nHour">05</span>
    //                     <span class="breaker">:</span>
    //                     <span class="0hour">00</span>
    //                 </div>
    //                 <div class="minute"></div>
    //             </div>
    //         </div>
    //         <span class="btn-create">
    //             <span class="label">Edit</span>
    //             <input type="submit" name="create" id="btn-create">
    //         </span>
    //     </div>
    // </form>`
    // }
}