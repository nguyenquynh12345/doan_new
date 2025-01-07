import useTimer, { IUseTimerProps } from '@/shared/utils/hooks/useTimer';
import React, { useEffect } from 'react';

const splitTimmer = (numb: string) => {
  if (numb.length === 1) return `0${numb}`;
  return numb;
};

interface ICustomCountdownProps {
  timer: IUseTimerProps;
  onExpired?: (expried: boolean) => void;
  onStartCouting?: (expried: boolean) => void;
}

const CustomCountdown = ({ timer, onExpired, onStartCouting }: ICustomCountdownProps) => {
  const { days, hours, minutes, seconds, setStartCounting, expired, startCouting } = useTimer(timer);

  useEffect(() => {
    setStartCounting(true);
  }, []);

  useEffect(() => {
    onExpired && onExpired(expired);
  }, [expired]);

  useEffect(() => {
    onStartCouting && onStartCouting(startCouting);
  }, [startCouting]);

  const renderTimer: IUseTimerProps = {
    days,
    hours,
    minutes,
    seconds,
  };
  const rederTitle = ['Ngày', 'Giờ', 'Phút', 'Giây'];
  return (
    <div className="d-flex align-items-center justify-content-center gap-2">
      {Object.keys(renderTimer).map((key, index) => (
        <>
          <div>
            <div className="px-4 py-2xl text-center bg-brand-900 rounded-2 text-display-xs-semibold">
              {splitTimmer(String(renderTimer[key as keyof IUseTimerProps]))}
            </div>
            <span className="text-sm cl-gray-300 text-center d-block mt-1 ">{rederTitle[index]}</span>
          </div>
          {index !== Object.keys(renderTimer).length - 1 ? <p className="mb-2xl px-lg ">:</p> : ''}
        </>
      ))}
    </div>
  );
};

export default React.memo(CustomCountdown);
