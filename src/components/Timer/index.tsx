import { FC, useState, useEffect } from "react";
import TimerProps, { TimerUpdatePayload } from "../../@types/timer";

import TimerService from "../../services/timer";

const Timer: FC<TimerProps> = ({ targetTime }) => {
  const [hours, setHours] = useState(targetTime.hours);
  const [minutes, setMinutes] = useState(targetTime.minutes);
  const [seconds, setSeconds] = useState(targetTime.seconds);

  const timerService = new TimerService();

  useEffect(() => {
    timerService.start(targetTime);
    timerService.events.on("update", updateTimer);
  });

  const updateTimer = ({ hours, minutes, seconds }: TimerUpdatePayload) => {
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  };

  return (
    <section className="timer">
      <span className="hours">{hours < 10 ? `0${hours}` : hours}</span>
      <span className="separator">:</span>
      <span className="minutes">{minutes < 10 ? `0${minutes}` : minutes}</span>
      <span className="separator">:</span>
      <span className="seconds">{seconds < 10 ? `0${seconds}` : seconds}</span>
    </section>
  );
};

export default Timer;
