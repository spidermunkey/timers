export class AbstractTimer {
  constructor(time) {
    console.log(time);
    this.currentInterval = null;
    this.time = time;
    this.initial = structuredClone(time);
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

  decrementTime(callback) {
    const callbackIf = () => {
      if (callback) callback(this.time);
    };

    console.log(this.time, this);
    let decremented = AbstractTimer.timeToMilliseconds(this.time) - 1000;
    if (decremented <= 0) {
      this.time = AbstractTimer.millisecondsToTime(0);
      callbackIf();
      return this.time;
    }

    this.time = AbstractTimer.millisecondsToTime(decremented);
    callbackIf();
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
  }

  countup(callback) {
    if (this.currentInterval) return;
    this.currentInterval = this.setInterval(
      this.incrementTime.bind(this),
      1000
    );
  }

  clear() {
    clearInterval(this.currentInterval);
    this.currentInterval = null;
    return;
  }

  wait(waitTime, timeout, onComplete) {}

  reset() {
    this.time = structuredClone(this.initial);
  }
}
