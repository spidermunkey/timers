import {api} from './javascript/api/app.js';
import {Timer,TimeTracker} from './javascript/components/Timer.js';

/*
    TODO

    add sounds
    add extend current
    
    tracker tags && logging
        ** {
            select from quick task [over-arching tasks]
                -- adds up weekly total
                -- tracks times started and ended across week
                -- tracks over achieved, under achieved, achieved

            select timing goals for under over tasks
                -- read *over* 20hrs/week
                -- code *over* 20hrs/week
                -- clean *under* 8hrs/week
            advanced settings for specific goals and time management

            [task]('specifics') *in* allotedTime {on} |day or week of| 
                -- [read] ('building a second brain') *under* 4hrs/{this}|monday||week|
        }

        ** {
            on start/stop log to server [taskname,id] => started stoped finished for [time]
        }

        ** {
            add tasklog collection to db 
                tasks
                task-logs
        }
*/

const timerForm = $('form#create-timer');
const timerFormSubit = $('input[type="submit"]#btn-create');
const timerFormToggle = $('.btn-toggle--form');
const timerFormClose = $('.create-timer .close');
const timerDayInputs = $$('.inp-field[data-type="day"] input[type="checkbox"]');
const timerTimeInputs = $$('.inp-field input[data-type="time"]');
const timerNeverInput = $('.inp-field[data-type="binary"] .option[data-option="never"] input[type="checkbox"]');
const timerEveryInput = $('.inp-field[data-type="binary"] .option[data-option="every"] input[type="checkbox"]');

const trackerForm = $('form#create-tracker');
const trackerFormSubmit = $('input[type="submit"]#btn-create-tracker');
const trackerFormClose = $('.create-tracker--form .close');
const trackerFormToggle = $('.btn-create-tracker');

api.getTimers((data) => {
    
    const renderFilteredMap = props => {
        const t = new Timer({props});
        if (t.isToday) t.render($('.timers'));
        return !!t.isToday;
    }

    data.filter(renderFilteredMap)
        .length == 0
            ? $('.timers').innerHTML = 'No Trackers Today'
            : null;
});

api.getTrackers((data) => {

    if (data.length == 0) $('.trackers').innerHTML = 'No Trackers';

    else return data.map(props => {
        const t = new TimeTracker({props});
        t.render($('.trackers'));
        return t;
    })

});

// handle timer menu options
// listen($('.timer-list'), (e) => {
//     if (elementClicked('.timer--header-options',e))
//         $('.timer--options',elementClicked('.timer',e)).classList.toggle('active');
// });

listen(timerFormToggle, () => $('.create-timer').classList.toggle('active') );
listen(timerFormClose, () => $('.create-timer').classList.remove('active') );

listen(trackerFormClose, () => $('.create-tracker--form').classList.remove('active'));
listen(trackerFormToggle, () => $('.create-tracker--form').classList.toggle('active'));

listen(timerForm, (e) => submitTimer(e,timerForm),'submit');
listen(trackerForm,(e) => submitTracker(e,trackerForm),'submit');

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

timerTimeInputs.forEach(function EVENTS__timeInputs(inp) {

    inp.addEventListener('click',() => inp.select())

    inp.addEventListener('keydown',(event) => {

        const prev = timerTimeInputs[timerTimeInputs.indexOf(inp) -1];

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
        const next = timerTimeInputs[timerTimeInputs.indexOf(inp) + 1]
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

async function submitTimer(event,form) {

    event.preventDefault();

    throttleInput(timerFormSubit,2000);

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
    
    console.log(timer.isToday,'IS TODAY')
};

async function submitTracker(event,form) {

        event.preventDefault();
    
        throttleInput(trackerFormSubmit,2000);
    
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
};