import React, { useState, useEffect, useContext } from 'react';
import { getPlayer } from '../../src/firebase.js';
export function UserLeaderBoard() {
  return (
    <div>
      <h1>Data</h1>
    </div>
  );
}
export function PlayerLeaderBoard({ pid }) {
  const [score, setScore] = useState();
  const [corAns, setAns] = useState();

  useEffect(() => {
    // get useScore his answer and correct Ans
    getPlayer(context.uid, pid).then(data => {
      setScore(data.score);
    });
  }, []);

  return (
    <div>
      <h1>{score}</h1>
    </div>
  );
}
