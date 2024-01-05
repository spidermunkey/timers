import {Timer} from './javascript/components/Timer.js';
import {api} from './javascript/api/app.js';

console.log(Timer);
console.log(api);

const timers = api.getTimers(function then(data) {
    if (data.length == 0) {
        $('.timers').innerHTML = 'No Timers';
    } else {
        console.log(data)
        return data.map(props => {
            const t = new Timer({props});
            t.render($('.timers'));
            return t;
        })
    }
});

const createTimerForm = $('form#create-timer');
const btnSubmit = $('input[type="submit"]#btn-create');
const formToggleButton = $('.btn-toggle--form');
const formCloseButton = $('.create-timer .close');
const createFormDayInputs = $$('.inp-field[data-type="day"] input[type="checkbox"]');
const createFormTimeInputs = $$('.inp-field input[data-type="time"]');
const neverInput = $('.inp-field[data-type="binary"] .option[data-option="never"] input[type="checkbox"]');
const everyInput = $('.inp-field[data-type="binary"] .option[data-option="every"] input[type="checkbox"]');

listen(formToggleButton, () => $('.create-timer').classList.toggle('active') );
listen(formCloseButton, () => $('.create-timer').classList.remove('active') );

listen(createTimerForm, (e) => submitForm(e,createTimerForm),'submit');


createFormTimeInputs.forEach(inp => {

    inp.addEventListener('click',() => inp.select())

    inp.addEventListener('keydown',(event) => {

        const prev = createFormTimeInputs[createFormTimeInputs.indexOf(inp) -1];

        if (!isNumberKey(event))
          event.preventDefault();


        // skip to previous input on backspace if
        if (!!prev && isBackspaceKey(event) &&  isEmptyNumberInput(inp)) {
            inp.value = 0;
            highlightInput(inp);
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

        for (const entry of fdo)
            if (entry[1].trim() === '') entry[1] = 0;
    
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
            initial
        };
    }

    let props = parseForm(data);
    let timer = new Timer({props});
    let POST = await api.addTimer( props );

    if (responseOk(POST))
        timer.render($('.timer-list .timers'));
}