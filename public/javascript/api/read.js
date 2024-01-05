async function getTimers() {
    const res = await axios.get('http://localhost:1279/timers')
    const {data} = res;
    console.log(data)

    if (data.length == 0) {
        $('.timers').innerHTML = 'No Timers'
    } else {
        return data.map(timer => {
            const t = new Timer(timer.title,timer);
            t.render($('.timers'));
            return t;
        })
    }
}