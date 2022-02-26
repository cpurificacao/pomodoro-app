export interface TargetTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export default interface TimerProps {
  targetTime: TargetTime;
}
