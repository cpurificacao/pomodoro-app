import { useState, FC } from "react";
import TimerProps from "../../@types/timer";

const Timer: FC<TimerProps> = ({ targetTime }) => {
  const hours = useState(targetTime.hours),
    minutes = useState(targetTime.minutes),
    seconds = useState(targetTime.seconds);

  return (
    <section className="timer">
      <span className="hours">${hours.length < 2 ? `0${hours}` : hours}</span>
      <span className="minutes">
        ${minutes.length < 2 ? `0${minutes}` : minutes}
      </span>
      <span className="seconds">
        ${seconds.length < 2 ? `0${seconds}` : seconds}
      </span>
    </section>
  );
};

export default Timer;
