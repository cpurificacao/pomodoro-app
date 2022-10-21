import {
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  MutableRefObject,
} from "react";
import TimerProps, { TimerUpdatePayload } from "../../@types/timer";

import TimerService from "../../services/timer";

import "./index.css";

const Timer: FC<TimerProps> = ({ targetTime }) => {
  const [hours, setHours] = useState(targetTime.hours);
  const [minutes, setMinutes] = useState(targetTime.minutes);
  const [seconds, setSeconds] = useState(targetTime.seconds);
  const circleSvg =
    useRef<SVGCircleElement>() as MutableRefObject<SVGCircleElement>;
  const [circleSvgStrokeDashoffset, setCircleSvgStrokeDashoffset] = useState(0);

  // const timerService = useMemo(() => new TimerService(), []);

  const updateTimer = useCallback(
    ({
      hours,
      minutes,
      seconds,
      newCircleSvgStrokeDashoffset,
    }: TimerUpdatePayload) => {
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
      setCircleSvgStrokeDashoffset(newCircleSvgStrokeDashoffset);
    },
    []
  );

  useEffect(() => {
    const circleSvgTotalLength = circleSvg.current?.getTotalLength() as number;
    const timerService = new TimerService(targetTime, circleSvgTotalLength);

    timerService.start();
    timerService.events.on("update", updateTimer);
  }, [targetTime, updateTimer]);

  return (
    <section className="timer-container">
      <div className="box">
        <svg>
          <circle cx="150" cy="150" r="140"></circle>
          <circle
            ref={circleSvg}
            cx="150"
            cy="150"
            r="140"
            strokeDashoffset={circleSvgStrokeDashoffset}
          ></circle>
        </svg>
        <div className="timer-digits">
          <h2>
            <span className="hours">{hours < 10 ? `0${hours}` : hours}</span>
            <span className="separator">:</span>
            <span className="minutes">
              {minutes < 10 ? `0${minutes}` : minutes}
            </span>
            <span className="separator">:</span>
            <span className="seconds">
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Timer;
