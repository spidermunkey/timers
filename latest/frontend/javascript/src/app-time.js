const curDate = new Date()
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
console.log('hi')
function setClock() {

    const {dow,month,date,hour,minute,context} = DateTime.clock;
    
    $('#app-header-dow').textContent = dow
    $('#app-header-hour').textContent = hour <= 12 ? hour : hour - 12;
    $('#app-header-minute').textContent = minute >= 10 ? minute : minute.toString().padStart(2,'0');
    $('#app-header-time-context').textContent = context;
    $('#app-header-month').textContent = month.slice(0,3);
    $('#app-header-day').textContent = date;

}

const msTilNextMinute = (60000 - (curDate.getSeconds() * 1000) + curDate.getMilliseconds())
console.log(msTilNextMinute)

setTimeout(() => {
    setClock();
    setInterval(setClock,60000);
},msTilNextMinute);

setClock();
// console.log(curDate.getHours())
// console.log(curDate.getMinutes())
