import React, { useContext, useState, useEffect, Fragment } from 'react';
import { ParentGameContext } from './GameContext.js';
import { useTrail, useTransition, animated } from 'react-spring';
import { Button, ThemeProvider } from 'react-bootstrap';
import { Countdown } from './Started';
import { DispOptions } from './DispOptions.js';
import { PlayerLeaderBoard } from './LeaderBoard.js';

function PlayerGame({ data }) {
  const context = useContext(ParentGameContext);

  //for status query
  useEffect(() => {
    let subscribeer = true;
    context.getStatusSnap(context.qid);
    context.getQStatusSnap(context.qid);
    return () => (subscribeer = false);
  }, [context.status, context.Qstatus]);

  console.log(context.status);

  if (context.status === 'joining') {
    return <Rules data={data} context={context} />;
  } else if (context.status === 'Countdown') {
    return (
      <div>
        <Countdown />
      </div>
    );
  } else if (context.status === 'Question') {
    return <DispOptions pid={data.id} />;
  } else if (context.status === 'LeaderBoard') {
    return <PlayerLeaderBoard pid={data.id} />;
  } else {
    return <h1>None</h1>;
  }
}

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

export function Goo({ trail }) {
  return (
    <Fragment>
      <div className="fullWidth height_Onescreen">
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="30"
            />
            <feColorMatrix
              in="blur"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
            />
          </filter>
        </svg>
        <div className="hooks-main">
          {trail.map((props, index) => (
            <animated.div
              key={index}
              style={{ transform: props.xy.interpolate(trans) }}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

//rules component
function Rules({ data, context }) {
  // const context = useContext(GameContext);
  const [trail, set] = useTrail(3, () => ({
    xy: [0, 0],
    config: i => (i === 0 ? fast : slow),
  }));

  //for animation
  const [toggle, setToggle] = useState(false);
  const [items, setItem] = useState([
    { key: 1, text: 'first rule' },
    { key: 2, text: 'secound rule' },
    { key: 3, text: 'third rule' },
  ]);
  const springs = useTrail(items.length, {
    to: { opacity: toggle ? 1 : 0 },
    config: { tension: 250 },
  });

  return (
    <Fragment>
      <Goo trail={trail} />
      <div
        className="fullWidth height_Onescreen center_Align flexCenterAlign"
        onMouseMove={e => set({ xy: [e.clientX, e.clientY] })}
        style={{ color: '#343a40', textAlign: 'center' }}
      >
        <div>
          <h2>
            Hey {data.name},There are some "RULES" that you should know before
            Game starts {context.status}
          </h2>
          <Button
            variant="outline-dark"
            style={{ margin: '2%', fontWeight: 'bold' }}
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? 'Okay..Now let me play' : 'Show the damn Rules'}
          </Button>
        </div>
        <br />
        {springs.map((animation, index) => (
          <animated.h3 style={animation} className="rules" key={index}>
            {items[index].text}
          </animated.h3>
        ))}
      </div>
    </Fragment>
  );
}

export default PlayerGame;
