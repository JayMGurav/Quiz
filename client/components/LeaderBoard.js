import React, { Fragment, useState, useEffect, useContext } from 'react';
import { getPlayer } from '../../src/firebase.js';
import { useTransition, animated } from 'react-spring';
import { ParentGameContext } from './GameContext.js';
import Confetti from 'react-confetti';
import { Button } from 'react-bootstrap';

// for users
export function UserLeaderBoard() {
  const context = useContext(ParentGameContext);
  // const [qStat, setqStat] = useState(context.Qstatus);

  useEffect(() => {
    context.getNSetScore(context.qid);
  }, []);

  let height = 0;
  const transitions = useTransition(
    context.topScore.map(data => ({
      ...data,
      height: 20,
      y: (height += 20) - 20,
    })),
    d => d.name,
    {
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height }),
    },
  );

  return (
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
                zIndex: context.topScore.length - index,
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
        <Button
          variant="dark"
          onClick={async () => {
            await context.changeGameStatus(
              context.uid,
              context.qid,
              'Question',
            );
            // await context.changeQStatus(context.uid, context.qid, qStat);
          }}
        >
          Next Question
        </Button>
      </div>
    </div>
  );
}
//for players
export function PlayerLeaderBoard({ pid }) {
  const context = useContext(ParentGameContext);
  const [score, setScore] = useState();
  // const [corAns, setAns] = useState();

  useEffect(() => {
    // get useScore his answer and correct Ans
    // console.log('in LeaderBoard' + context.uid);
    getPlayer(context.qid, pid).then(data => {
      // console.log('in leaderboard ' + data[2]);
      setScore(data[2].score);
    });
  }, []);

  if (context.ansStatus === 'Correct') {
    return (
      <div style={{ background: '#f2f2f2' }}>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          colors={['#2ecc71', '#3498db', '#e67e22', '#e67e22', '#e74c3c']}
        />
        <div
          className="fullWidth height_Onescreen flexCenterAlign"
          style={{ textAlign: 'center' }}
        >
          <h1
            style={{ color: '#343a40', fontSize: '3.0em', fontWeight: 'bold' }}
          >
            Correct..!! <br />
            Your Score {score}
          </h1>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="fullWidth height_Onescreen flexCenterAlign"
        style={{ background: 'rgba(255,51,51,0.5)', textAlign: 'center' }}
      >
        <h2>Wrong!! Better luck next time.</h2>
        <h1>Your score {score}</h1>
      </div>
    );
  }
}
