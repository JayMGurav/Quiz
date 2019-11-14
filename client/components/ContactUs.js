// import React from 'react';
import React, { useState, useEffect, useContext } from 'react';
import { useTransition, animated } from 'react-spring';
import { getPlayersOrder } from '../../src/firebase.js';
import { Button } from 'react-bootstrap';

export function ContactUs() {
  const [loading, setLoading] = useState(true);

  const [rows, set] = useState([]);
  // useEffect(() => void setInterval(() => set(shuffle), 2000), []);

  useEffect(() => {
    (async () => {
      const data = await getPlayersOrder('a6344ee40b');
      set(data);
      setLoading(false);
    })();
  }, []);

  let height = 0;
  const transitions = useTransition(
    rows.map(data => ({ ...data, height: 100, y: (height += 30) - 30 })),
    d => d.name,
    {
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height }),
    },
  );

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div
      className="fullWidth height_Onescreen flexCenterAlign"
      style={{ background: '#f2f2f2' }}
    >
      <div style={{ width: '60%', height: '80vh', textAlign: 'center' }}>
        <div className="list">
          {transitions.map(({ item, props: { y, ...rest }, key }, index) => (
            <animated.div
              key={key}
              className="card"
              style={{
                zIndex: rows.length - index,
                transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
                ...rest,
              }}
            >
              <div className="cell">
                <div className="details">{item.name + '  ' + item.score}</div>
              </div>
            </animated.div>
          ))}
        </div>
        <Button variant="dark">Next Question</Button>
      </div>
    </div>
  );
}
