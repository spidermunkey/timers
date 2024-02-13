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

  decrementTime(time = this.time) {
    let decremented = AbstractTimer.timeToMilliseconds(time) - 1000;

    if (decremented <= 0) {
      time = AbstractTimer.millisecondsToTime(0);
      return time;
    }

    time = AbstractTimer.millisecondsToTime(decremented);
    return time;
  }

  incrementTime(time = this.time) {
    time = AbstractTimer.millisecondsToTime(
      AbstractTimer.timeToMilliseconds(time) + 1000
    );
    return time;
  }

  countdown() {
    if (this.currentInterval) return;
    this.currentInterval = this.setInterval(this.decrementTime, 1000);
  }

  countup() {
    if (this.currentInterval) return;
    this.currentInterval = this.setInterval(this.incrementTime, 1000);
  }

  clear() {
    clearInterval(this.currentInterval);
    this.currentInterval = null;
    return;
  }

  reset() {
    this.time = structuredClone(this.initial);
  }
}
