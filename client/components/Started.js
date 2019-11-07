import React, { useState, useEffect, useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import { ParentGameContext } from './GameContext.js';

export function Countdown() {
  const context = useContext(ParentGameContext);
  const [seconds, setSeconds] = useState(5);
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
      height: Math.floor(window.innerHeight),
      background: 'lightgreen',
    },
    to: async next => {
      await next({
        left: '0%',
        top: '0%',
        width: '100%',
        height: seconds * (Math.floor(window.innerHeight) / 10),
        background: 'lightblue',
      });
      // }
    },
  });

  const startCountDown = () => {
    let sec = seconds;
    let interval = setInterval(function() {
      if (sec === 0) {
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
