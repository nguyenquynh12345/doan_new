import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface IUseTimerProps {
  minutes: number;
  seconds: number;
  hours: number;
  days: number;
}
interface IUseTimer extends IUseTimerProps {
  expired: boolean;
  startCouting: boolean;
  setStartCounting: Dispatch<SetStateAction<boolean>>;
  reset: () => void;
  timer: string;
  minutes: number;
  seconds: number;
  hours: number;
  days: number;
}

function useTimer(props: IUseTimerProps): IUseTimer {
  const [days, setDays] = useState(props.days);
  const [hours, setHours] = useState(props.hours);
  const [minutes, setMinutes] = useState(props.minutes);
  const [seconds, setSeconds] = useState(props.seconds);
  const [expired, setExpired] = useState<boolean>(false);
  const [startCouting, setStartCounting] = useState<boolean>(false);

  const reset = () => {
    setDays(props.days);
    setHours(props.hours);
    setMinutes(props.minutes);
    setSeconds(props.seconds);
    setExpired(false);
  };

  useEffect(() => {
    if (!startCouting) return;

    let countInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            if (days === 0) {
              setExpired(true);
              clearInterval(countInterval);
            } else {
              setDays(days - 1);
              setHours(24);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(countInterval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const timer = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  return { minutes, seconds, expired, setStartCounting, reset, timer, startCouting, days, hours };
}

export default useTimer;
