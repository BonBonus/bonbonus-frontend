import React, { useState, useEffect } from 'react';
import s from './TextSwitcher.module.scss';

const TextSwitcher = ({ texts }: any) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(currentTextIndex => (currentTextIndex + 1) % texts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className={s.textSwitcher}>
      {texts.map((text: any, index: any) => (
        <span
          key={index}
          className={`${s.textSwitcherText} ${currentTextIndex === index ? s.textSwitcherTextActive : ''}`}
        >
          {text}
        </span>
      ))}
    </div>
  );
};

export default TextSwitcher;
