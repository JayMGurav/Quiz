import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x, y, s) => {
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
};

export function Lol() {
  const [prop, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const handleClick = e => {
    e.preventDefault();
  };

  return (
    <div className="fullWidth height_Onescreen">
      <div
        className="DashDiv center_Align"
        style={{
          textAlign: 'center',
          padding: '0% 1%',
          background: 'rgba(255,255,255,0.9)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: '1% 2%',
            position: 'relative',
          }}
        >
            <div
            style={{
              width: '100%',
              height: '50%',
            }}
            className="optionsAwBox"
          >
            <animated.div
              className="options cardOpt"
              onMouseMove={({ clientX: x, clientY: y }) =>
                set({ xys: calc(x, y) })
              }
              onMouseLeave={() => set({ xys: [0, 0, 1] })}
              style={{
                borderRadius: '8px 0 0 0',
                background: '#9be3de',
                transform: prop.xys.interpolate(trans),
              }}
              onClick={event => handleClick(event)}
              onBlur={event => handleClick(event)}
            >
              rklennkd;w
            </animated.div>
            <div
              className="options"
              style={{ borderRadius: '0 8px 0 0', background: '#fa877f' }}
              onClick={event => handleClick(event)}
              onBlur={event => handleClick(event)}
            >
              efcndikec
            </div>
          </div>
          <div
            style={{
              width: '100%',
              height: '50%',
            }}
            className="optionsAwBox"
          >
            <div
              className="options"
              style={{ borderRadius: '0 0 0 8px', background: '#e4e4e4' }}
              onClick={event => handleClick(event)}
              onBlur={event => handleClick(event)}
            >
              rcndcldknc
            </div>
            <div
              className="options"
              style={{ borderRadius: '0 0 8px 0', background: '#d597ce' }}
              onClick={event => handleClick(event)}
              onBlur={event => handleClick(event)}
            >
              rfej;rnrjne
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
