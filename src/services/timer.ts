import EventEmitter from "events";
import { TimerUpdatePayload, TimerService, TargetTime } from "../@types/timer";

const ONE_SECOND = 1000;
const EXTRACT_TIME = /(\d\d):(\d\d):(\d\d)/;

class TimerServiceImp implements TimerService {
  private _events = new EventEmitter();
  get events() {
    return this._events;
  }

  private target = new Date();

  private interval!: NodeJS.Timer;

  private _circleSvgTotalLength = 0;

  private circleSvgStrokeDashoffset = 0;
  private circleSvgStrokeDashoffsetVariation = 0;
  private isStarted = false;

  constructor(
    { hours, minutes, seconds }: TargetTime,
    circleSvgTotalLength: number
  ) {
    this.target.setHours(hours);
    this.target.setMinutes(minutes);
    this.target.setSeconds(seconds);
    this._circleSvgTotalLength = circleSvgTotalLength;
  }

  start() {
    this.interval = setInterval(this.handleCountdown.bind(this), ONE_SECOND);
  }

  private handleCountdown() {
    const now = new Date();
    const deltaTimestamp = this.target.getTime() - now.getTime();
    const isDeltaLongerThanOrEqualsToZero = deltaTimestamp >= 0;

    if (!this.isStarted) {
      this.isStarted = true;
      this.circleSvgStrokeDashoffsetVariation =
        this.calculateCircleSvgStrokeDashoffsetVariation(deltaTimestamp);
    }

    if (isDeltaLongerThanOrEqualsToZero) {
      const deltaString = new Date(deltaTimestamp).toISOString();
      const deltaTime = EXTRACT_TIME.exec(deltaString);

      if (deltaTime) {
        const newCircleSvgStrokeDashoffset =
          this.calculateNewCircleSvgStrokeDashoffset();
        const [, hours, minutes, seconds] = deltaTime;
        const payload: TimerUpdatePayload = {
          hours: parseInt(hours),
          minutes: parseInt(minutes),
          seconds: parseInt(seconds),
          newCircleSvgStrokeDashoffset,
        };

        this.events.emit("update", payload);
        console.log(
          `${hours}:${minutes}:${seconds} - ${newCircleSvgStrokeDashoffset}`
        );
      }
    } else {
      this.stop();
    }
  }

  private calculateCircleSvgStrokeDashoffsetVariation(
    initialDeltaTimestamp: number
  ) {
    return (this._circleSvgTotalLength / initialDeltaTimestamp) * 1000;
  }

  private calculateNewCircleSvgStrokeDashoffset() {
    return (this.circleSvgStrokeDashoffset +=
      this.circleSvgStrokeDashoffsetVariation);
  }

  stop() {
    clearInterval(this.interval);
  }
}

export default TimerServiceImp;
