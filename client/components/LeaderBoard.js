import React, { Fragment, useState, useEffect, useContext } from 'react';
import { getPlayer } from '../../src/firebase.js';
import { ParentGameContext } from './GameContext.js';
import Confetti from 'react-confetti';
import { Button } from 'react-bootstrap';

// for users
export function UserLeaderBoard() {
  const context = useContext(ParentGameContext);
  const [qStat, setqStat] = useState(context.Qstatus);
  return (
    <div className="fullWidth height_Onescreen flexCenterAlign">
      <Button
        variant="dark"
        onClick={async () => {
          await context.changeGameStatus(context.uid, context.qid, 'Question');
          await context.changeQStatus(context.uid, context.qid, qStat);
        }}
      >
        Next Question
      </Button>
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
      <div style={{ background: '#343a40' }}>
        <div className="fullWidth height_Onescreen flexCenterAlign">
          <h1 style={{ background: '#343a40', color: '#fff' }}>
            Correct {score}
          </h1>
        </div>
        <Confetti
          width={window.innerWidth}
          colors={['#2ecc71', '#3498db', '#e67e22', '#e67e22', '#e74c3c']}
          height={window.innerHeight}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Incorrect</h1>
      </div>
    );
  }
}
