import {Timer} from './javascript/components/Timer.js';
import {api} from './javascript/api/app.js';

console.log(Timer);
console.log(api);

const timers = api.getTimers(function then(data) {
    if (data.length == 0) {
        $('.timers').innerHTML = 'No Timers';
    } else {
        return data.map(timer => {
            const t = new Timer(timer.title,timer);
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

    let data = {};
    const x = new FormData(form);
    
    for (const pair of new FormData(form)){
        if (!!data[pair[0]])
            data[pair[0]] = [data[pair[0]],pair[1]].join('')
        else
            data[pair[0]] = pair[1];
    }

    const POST = api.addTimer(data,function effect(data) {
        let t = new Timer( data.title , data )
        t.render($('.timers'))
    })
}