import {api} from './javascript/api/app.js';
import { Timer , TimeTracker } from './javascript/components/Timer.js';

const timers = api.getTimers((data) => {
    if (data.length == 0) {
        $('.timers').innerHTML = 'No Timers';
    } else {
        
        const dta = data.map(props => {
            const t = new Timer({props});
            if (t.isToday) t.render($('.timers'));
            return t
        })

        if (!(dta.some(timer => timer.isToday)))
            $('.timers').innerHTML = 'No Trackers Today';
    }
});

const trackers = api.getTrackers((data) => {
    if (data.length == 0) {
        $('.trackers').innerHTML = 'No Trackers';
    } else {
        console.log(data);
        return data.map(props => {
            const t = new TimeTracker({props});
            t.render($('.trackers'));
            return t;
        })
    }
})

const createTimerForm = $('form#create-timer');
const btnSubmit = $('input[type="submit"]#btn-create');
const formToggleButton = $('.btn-toggle--form');
const formCloseButton = $('.create-timer .close');
const createFormDayInputs = $$('.inp-field[data-type="day"] input[type="checkbox"]');
const createFormTimeInputs = $$('.inp-field input[data-type="time"]');
const neverInput = $('.inp-field[data-type="binary"] .option[data-option="never"] input[type="checkbox"]');
const everyInput = $('.inp-field[data-type="binary"] .option[data-option="every"] input[type="checkbox"]');

const btnCreateTracker = $('input[type="submit"]#btn-create-tracker');
const createTrackerForm = $('form#create-tracker');
const trackerFormClose = $('.create-tracker--form .close');
const trackerFormToggle = $('.btn-create-tracker');

// handle timer menu options
listen($('.timer-list'), (e) => {
    if (elementClicked('.timer--header-options',e))
        $('.timer--options',elementClicked('.timer',e))
            .classList.toggle('active')
})
listen(formToggleButton, () => $('.create-timer').classList.toggle('active') );
listen(formCloseButton, () => $('.create-timer').classList.remove('active') );

listen(trackerFormClose, () => $('.create-tracker--form').classList.remove('active'));
listen(trackerFormToggle, () => $('.create-tracker--form').classList.toggle('active'));

listen(createTimerForm, (e) => submitForm(e,createTimerForm),'submit');
listen(createTrackerForm,(e) => submitTracker(e,createTrackerForm),'submit');

createFormTimeInputs.forEach(inp => {

    inp.addEventListener('click',() => inp.select())

    inp.addEventListener('keydown',(event) => {

        const prev = createFormTimeInputs[createFormTimeInputs.indexOf(inp) -1];

        if (!isNumberKey(event))
          event.preventDefault();

        // skip to previous input on backspace if
        if (!!prev && isBackspaceKey(event) &&  isEmptyNumberInput(inp)) {
            inp.value = 0;
            highlightInput(prev);
            return;
        }
    })

    inp.addEventListener('keyup',(e) => {
        console.log(inp.value)
        if (e.keyCode == 8){
            inp.value = 0;
            return;
        }
        const next = createFormTimeInputs[createFormTimeInputs.indexOf(inp) + 1]
        if (!!next){
            next.focus();
            next.select();
        }

    })

    inp.addEventListener('blur',(e) => {
        if (inp.value === "")
            inp.value = 0;
    })

});

createFormDayInputs.forEach(inp => {

    inp.addEventListener('input',() => {

        // handle all checked
        if (oneUnchecked(createFormDayInputs)) 
            uncheck(everyInput)
        else if (allChecked(createFormDayInputs)) 
            check(everyInput)

        // handle none checked
        if (oneChecked(createFormDayInputs))
            uncheck(neverInput)
        else if (noneChecked(createFormDayInputs))
            check(neverInput)

    })
})

neverInput.addEventListener('input',(e) => {
    if (neverInput.checked) {
        uncheck(everyInput);
        uncheckAll(createFormDayInputs);
    }
})

everyInput.addEventListener('input',(e) => {
    if (everyInput.checked) {
        uncheck(neverInput);
        checkAll(createFormDayInputs);
    }
})


async function submitForm(event,form) {

    event.preventDefault();

    throttleInput(btnSubmit,2000);

    const data = new FormData(form);
    
    function parseForm(formDataObject){

        let fdo = formDataObject;
        console.log(fdo)
        for (const entry of fdo)
            if (entry[1].trim() === '') entry[1] = 0;

                // Get the values of the checkboxes for days
        let days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].filter(day => {
            let checkbox = $(`.inp-field[data-type="day"] input[name="day"][data-day="${day}"]`);

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

    let props = parseForm(data);
    let timer = new Timer({props});
    let success = await api.addTimer( props );

    if (success && timer.isToday)
        timer.render($('.timer-list .timers'));
}

async function submitTracker(event,form) {

        event.preventDefault();
    
        throttleInput(btnCreateTracker,2000);
    
        const data = new FormData(form);
        
        function parseForm(formDataObject){
    
            let fdo = formDataObject;
            console.log(fdo)
            for (const entry of fdo)
                if (entry[1].trim() === '') entry[1] = 0;
        
            let
                title = fdo.get('title'),
                hours = fdo.getAll('hours').join(''),
                minutes = fdo.getAll('minutes').join(''),
                seconds = fdo.getAll('seconds').join(''),
                total = Timer.timeInMs({hours,minutes,seconds}),
                id = uuid(),
                successTime = { hours, minutes, seconds, total },
                time = Timer.formatMs(0);
    
            return {
                title,
                id,
                time,
                successTime,
                resetAfterSuccess: true
            };
        }
    
        let props = parseForm(data);
        console.log(props)
        let tracker = new TimeTracker({props});
        let success = await api.addTracker( props );
        if (success)
            tracker.render($('.trackers'),'tracker');
}