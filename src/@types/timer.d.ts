import EventEmitter from "events";

export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TargetTime extends Time {}

export interface TimerUpdatePayload extends Time {
  newCircleSvgStrokeDashoffset: number;
}

export interface TimerService {
  get events(): EventEmitter;
  start(): void;
  stop(): void;
}
export default interface TimerProps {
  targetTime: TargetTime;
}
