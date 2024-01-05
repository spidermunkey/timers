export const api = {

    async getTimers(effect) {
        console.log('getting all timers');
        const res = await axios.get('http://localhost:1279/timers');
        const {data} = res;

        if (responseOk(res)){
            if (effect) effect(data);
            return data;
        }
        else
            console.error('someting went wrong in /timers',res);

        return;
    },

    async addTimer(body,effect){
        console.log('posting to api',body)
        const res = await axios.post('http://localhost:1279/timers',body);
        const {data} = res;

        console.log('response data came back from post', data);

        if (responseOk(res)) {

            if (effect){
                console.log('effect triggered');
                effect(data);
            }

            return data;
        }
        else
            console.error('someting went wrong in /timers',res);
        
        return true;
    }
}

function responseOk(response) { // axios
    return response.status === 200 && response.statusText === 'OK'
}
