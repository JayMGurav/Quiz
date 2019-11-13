import React, { Fragment, useState, useEffect, useContext } from 'react';
import { getPlayer, firestore } from '../../src/firebase.js';
import { ParentGameContext } from './GameContext.js';
import Confetti from 'react-confetti';
import { Button } from 'react-bootstrap';

// for users
export function UserLeaderBoard() {
  const context = useContext(ParentGameContext);
  const [qStat, setqStat] = useState(context.Qstatus);
  const [rank, setRank] = useState();

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      getPlayersOrder();
    }
    return () => (isSubscribed = false);
  }, []);

  const getPlayersOrder = async () => {
    const data = await firestore
      .collection('room')
      .doc(context.qid)
      .collection('Players')
      .orderBy('score')
      .limit(3)
      .get()
      .then(d => {
        return d;
      });
    // const doc = qrerf.get();
    // if (doc.exists) {
    // const playersOrder = qrerf
    //   .collection('Players')
    //   .orderBy('score')
    //   .get();
    console.log(data + 'hello');
    // setRank(data.data());
  };

  // })();

  // console.log('hello' + rank);
  return (
    <div className="fullWidth height_Onescreen flexCenterAlign">
      <Button
        variant="dark"
        onClick={async () => {
          await context.changeGameStatus(context.uid, context.qid, 'Question');
          // await context.changeQStatus(context.uid, context.qid, qStat);
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
