import { useState, useEffect, FC } from 'react';
import s from './Counter.module.scss';

interface ICounter {
  targetValue: number | undefined,
  duration: number,
  decimalPlaces: number
}

export const Counter: FC<ICounter> = ({ targetValue, duration, decimalPlaces }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {

    if (!targetValue) {
      return
    }

    let start: number;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const timeElapsed = timestamp - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const nextValue = progress * targetValue;
      setCurrentValue(nextValue);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [targetValue, duration]);

  return (
    <div className={s.counter}>
      <span className={s.counterValue}>{currentValue.toFixed(decimalPlaces)}</span>
    </div>
  );
};
