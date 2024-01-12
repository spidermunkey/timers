export var api = {

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

    async getTrackers(effect) {
        console.log('getting all trackers');
        const res = await axios.get('http://localhost:1279/trackers');
        const {data} = res;

        if (responseOk(res)){
            if (effect) effect(data);
            return data;
        }
        else
            console.error('something went wrong in /trackers');
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
    },

    async addTracker(body,effect) {
        console.log('posting to api',body)
        const res = await axios.post('http://localhost:1279/trackers',body);
        const {data} = res;
        if (responseOk(res)) {

            if (effect){
                console.log('effect triggered');
                effect(data);
            }

            return data;
        }
        else
            console.error('someting went wrong in /trackers',res);
        
        return true;
    },

    async delete(id) {
        console.log(id);
        const res = await axios.delete(`http://localhost:1279/timers?id=${id}`);
        console.log(res);
        if (responseOk(res))
            return true;
        return false;
    },

    async edit(id,data){
        const res = await axios.patch(`http://localhost:1279/timers?id=${id}`,data);
                console.log(res);
        if (responseOk(res))
            return true;
        return false;
    },

    async log(id,data){
        const res = await axios.post(`http://localhost:1279/timers?id=${id}`,data);
    }
}

function responseOk(response) { // axios
    return response.status === 200 && response.statusText === 'OK'
}