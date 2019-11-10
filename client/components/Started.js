import React, { useState, useEffect, useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import { ParentGameContext } from './GameContext.js';

export function Countdown() {
  const context = useContext(ParentGameContext);
  const [seconds, setSeconds] = useState(10);
  const [readyN, setReadyN] = useState(null);
  useEffect(() => {
    let subscriber = true;
    startCountDown();
    return () => (subscriber = false);
  }, []);
  const props = useSpring({
    from: {
      left: '0%',
      top: '0%',
      width: '100%',
      height: window.innerHeight,
      background: 'rgba(255,51,51,0.5)',
    },
    to: async next => {
      await next({
        left: '0%',
        top: '0%',
        width: '100%',
        height: (seconds * window.innerHeight) / 10,
        backgroundImage:
          'linear-gradient( 178deg,  rgba(156,177,248,1) 7.5%, rgba(153,247,243,1) 93.1%',
      });
      // }
    },
  });

  const startCountDown = () => {
    let sec = seconds;
    let interval = setInterval(function() {
      if (sec === 0) {
        setSeconds(sec);
        setReadyN('Go!!');
        clearInterval(interval);
        context.changeGameStatus(context.uid, context.qid, 'Question');
      }
      setSeconds(sec);
      if (sec == 1) {
        setReadyN('Get Ready!!');
      }
      sec--;
    }, 1000);
  };

  return (
    <div className="fullWidth height_Onescreen">
      <animated.div className="script-box" style={props} />
      <div
        className="fullWidth height_Onescreen center_Align flexCenterAlign"
        style={{ zIndex: '999' }}
      >
        <h1
          style={{ fontSize: '6.0em', fontWeight: 'bolder', color: '#343a40' }}
        >
          {seconds > 1 ? seconds : readyN}
        </h1>
      </div>
    </div>
  );
}
