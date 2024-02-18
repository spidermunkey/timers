export class AbstractTimer {
  constructor(time) {
    this.currentInterval = null;
    this.time = time;
    this.initial = structuredClone(time);

    this.onCompleteObservable = new Observable();
    this.onTickObservable = new Observable();
    this.onPlayObserverable = new Observable();
    this.onPauseObservable = new Observable();
    this.onResetObservable = new Observable();

    this.onComplete(() => console.log("complete", this.time));
    this.onReset(() => (this.time = structuredClone(this.initial)));
  }

  static millisecondsToTime(ms) {
    const msInSeconds = 1000;
    const msInMinutes = 60000;
    const msInHours = 3600000;

    const approxHour = ms / 3600000;
    const hours = Math.floor(approxHour);
    const hoursFloat = approxHour - hours;

    const approxMinutes = (hoursFloat * msInHours) / msInMinutes;
    const minutes = Math.floor(approxMinutes);
    const minutesFloat = approxMinutes - minutes;

    const seconds = Math.round((minutesFloat * msInMinutes) / msInSeconds);

    return {
      hours,
      minutes,
      seconds,
      total: ms,
    };
  }

  static timeToMilliseconds({ hours, minutes, seconds }) {
    if (
      [hours, minutes, seconds].some(
        (num) =>
          Number.isNaN(Number(num)) ||
          typeof num === "function" ||
          typeof num === "undefined"
      )
    )
      throw new Error(
        "Hours,Minutes,and Seconds Must be a number,string num, or zeror for time to ms to work"
      );

    const msInSeconds = 1000;
    const msInMinutes = 60000;
    const msInHours = 3600000;

    return seconds * msInSeconds + minutes * msInMinutes + hours * msInHours;
  }

  doubleZero(number) {
    // console.log(number, typeof number !== "number");
    // if (typeof number !== "number" || typeof number != "string")
    //   throw new Error("double zero function requires string or number");

    return number.toString().padStart(2, "0");
  }

  formatCurrentTime() {
    let { hours, minutes, seconds } = this.time,
      h = this.doubleZero(hours),
      m = this.doubleZero(minutes),
      s = this.doubleZero(seconds);

    return {
      hours: h,
      minutes: m,
      seconds: s,
    };
  }

  onComplete(callback) {
    this.onCompleteObservable.subscribe(callback);
  }

  setComplete() {
    this.onCompleteObservable.notify();
  }

  onTick(callback) {
    this.onTickObservable.subscribe(callback);
  }

  callTick() {
    this.onTickObservable.notify();
  }

  onPlay(callback) {
    this.onPlayObserverable.subscribe(callback);
  }

  play() {
    this.onPlayObserverable.notify();
  }

  onPause(callback) {
    this.onPauseObservable.subscribe(callback);
  }

  pause() {
    this.onPauseObservable.notify();
  }

  onReset(callback) {
    this.onResetObservable.subscribe(callback);
  }

  reset() {
    this.onResetObservable.notify();
  }

  decrementTime(callback) {
    let decremented = AbstractTimer.timeToMilliseconds(this.time) - 1000;
    if (decremented <= 0) {
      this.time = AbstractTimer.millisecondsToTime(0);
      clearInterval(this.currentInterval);
      this.setComplete();

      return this.time;
    }

    this.time = AbstractTimer.millisecondsToTime(decremented);
    this.callTick();
    return this.time;
  }

  incrementTime() {
    this.time = AbstractTimer.millisecondsToTime(
      AbstractTimer.timeToMilliseconds(this.time) + 1000
    );

    if (callback) callback(this.time);

    return this.time;
  }

  countdown(callback) {
    if (this.currentInterval) return;

    this.currentInterval = setInterval(
      this.decrementTime.bind(this, callback),
      1000
    );
    console.log(this.currentInterval);
  }

  countup(callback) {
    if (this.currentInterval) return;

    this.currentInterval = this.setInterval(
      this.incrementTime.bind(this),
      1000
    );
  }

  clear() {
    console.log(this.currentInterval);
    clearInterval(this.currentInterval);
    this.currentInterval = null;
    return;
  }

  wait(waitTime, timeout, onComplete) {}
}
