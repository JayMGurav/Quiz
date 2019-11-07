import React, { useContext } from 'react';
import { ParentGameContext } from './GameContext.js';
import DispIdNPlyrs from './DispIdNPlyrs.js';
import { Countdown } from './Started';
import ShowQuestion from './ShowQuestion';
import { UserLeaderBoard } from './LeaderBoard.js';

function UserGame({ uid }) {
  const context = useContext(ParentGameContext);
  console.log(uid);
  if (context.status === 'joining') {
    return <DispIdNPlyrs uid={uid} />;
  } else if (context.status === 'Countdown') {
    return <Countdown />;
  } else if (context.status === 'Question') {
    return <ShowQuestion />;
  } else if (context.status === 'LeaderBoard') {
    return <UserLeaderBoard />;
  } else {
    return <h1>None</h1>;
  }
}

export default UserGame;
