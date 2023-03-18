import React, { useState, useEffect } from 'react';
import './test.css';

const TextSwitcher = ({ texts }: any) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(currentTextIndex => (currentTextIndex + 1) % texts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="text-switcher">
      {texts.map((text: any, index: any) => (
        <span
          key={index}
          className={`text-switcher__text ${currentTextIndex === index ? 'text-switcher__text--active' : ''}`}
        >
          {text}
        </span>
      ))}
    </div>
  );
};

export default TextSwitcher;
