export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TargetTime extends Time {}

export interface TimerUpdatePayload extends Time {}

export default interface TimerProps {
  targetTime: TargetTime;
}
