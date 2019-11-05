import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       //   if (tick == 10) {
//       return () => clearInterval(id);
//       //   }
//     }
//   }, [delay]);
// }

export function Countdown() {
  const [seconds, setSeconds] = useState(10);
  const [readyN, setReadyN] = useState('');
  var colors = ['lightgreen', 'lightblue', 'lightred', 'lightyellow'];
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
