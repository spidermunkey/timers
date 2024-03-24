export var api = {
  async getTimers(effect) {
    const res = await axios.get("http://localhost:1279/timers/meta");
    const { data } = res;
    // console.log(data);
    if (responseOk(res)) {
      if (effect) effect(data);
      return data;
    } else console.error("someting went wrong in /timers", res);

    return false;
  },

  async getTimer(id) {
    const res = await axios.get(`http://localhost:1279/timers/?id=${id}`)
    const { data } = res;
    return data;
  },

  async getTrackers(effect) {
    const res = await axios.get("http://localhost:1279/trackers/meta");
    const { data } = res;

    if (responseOk(res)) {
      if (effect) effect(data);
      return data;
    } else console.error("something went wrong in /trackers");
    return false;
  },

  async addTimer(body, effect) {
    console.log("posting to api", body);
    const res = await axios.post("http://localhost:1279/timers/api", body);
    const { data } = res;

    console.log("response data came back from post", data);

    if (responseOk(res)) {
      console.log('timer added')
      if (effect) {
        console.log("effect triggered");
        effect(data);
      }

      return data;
    } else console.error("someting went wrong in /timers", res);

    return false;
  },

  async addTracker(body, effect) {
    console.log("posting to api", body);
    const res = await axios.post("http://localhost:1279/trackers/api", body);
    const { data } = res;
    if (responseOk(res)) {
      if (effect) {
        console.log("effect triggered");
        effect(data);
      }

      return data;
    } else console.error("someting went wrong in /trackers", res);

    return false;
  },

  async delete(id) {
    console.log(id);
    const res = await axios.delete(`http://localhost:1279/timers/api?id=${id}`);
    console.log(res);
    if (responseOk(res)) return true;
    return false;
  },

  async edit(id, body) {
    const res = await axios.patch(
      `http://localhost:1279/timers/api?id=${id}`,
      body
    );
    const { data } = res;
    console.log(res);
    if (responseOk(res)) return data;
    return false;
  },

  async log(data) {
    const res = await axios.post(`http://localhost:1279/timers/logs`, data);
  },
};

function responseOk(response) {
  // axios
  return response.status === 200 && response.statusText === "OK";
}
