import EventEmitter from "events";
import { TargetTime, TimerUpdatePayload } from "../@types/timer";

const ONE_SECOND = 1000;
const EXTRACT_TIME = /(\d\d):(\d\d):(\d\d)/;

class TimerService {
  private _events = new EventEmitter();
  private target = new Date();
  private interval!: NodeJS.Timer;

  get events() {
    return this._events;
  }

  start({ hours, minutes, seconds }: TargetTime) {
    this.target.setHours(hours);
    this.target.setMinutes(minutes);
    this.target.setSeconds(seconds);

    this.interval = setInterval(this.handleCountdown.bind(this), ONE_SECOND);
  }

  private handleCountdown() {
    const now = new Date();
    const deltaTimestamp = this.target.getTime() - now.getTime();
    const isDeltaLongerThanOrEqualsToZero = deltaTimestamp >= 0;

    if (isDeltaLongerThanOrEqualsToZero) {
      const deltaString = new Date(deltaTimestamp).toISOString();
      const deltaTime = EXTRACT_TIME.exec(deltaString);

      if (deltaTime) {
        const [, hours, minutes, seconds] = deltaTime;
        const payload: TimerUpdatePayload = {
          hours: +hours,
          minutes: +minutes,
          seconds: +seconds,
        };

        this.events.emit("update", payload);
        console.log(`${hours}:${minutes}:${seconds}`);
      }
    } else {
      this.stop();
    }
  }

  stop() {
    clearInterval(this.interval);
  }
}

export default TimerService;
