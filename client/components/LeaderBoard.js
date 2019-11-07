import React, { Fragment, useState, useEffect, useContext } from 'react';
import { getPlayer } from '../../src/firebase.js';
import { ParentGameContext } from './GameContext.js';
import Confetti from 'react-confetti';

// for users
export function UserLeaderBoard() {
  return (
    <div>
      <h1>Data</h1>
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
    console.log('in LeaderBoard' + context.uid);
    getPlayer(context.qid, pid).then(data => {
      setScore(data.score);
    });
  }, []);

  if (context.ansStatus === 'Correct') {
    return (
      <div>
        <div
          className="center_Align"
          // style={{ position: 'absolute', top: '50%',left:'50%',transform:tr }}
        >
          <h1>score : {score}</h1>
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
