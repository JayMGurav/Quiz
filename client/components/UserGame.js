import React, { useContext } from 'react';
import { Redirect } from '@reach/router';
import { ParentGameContext } from './GameContext.js';
import DispIdNPlyrs from './DispIdNPlyrs.js';
import { Countdown } from './Started';
import ShowQuestion from './ShowQuestion';
import { UserLeaderBoard } from './LeaderBoard.js';

function UserGame({ uid }) {
  const context = useContext(ParentGameContext);
  // console.log(uid);
  if (context.status === 'joining') {
    return <DispIdNPlyrs uid={uid} />;
  } else if (context.status === 'Countdown') {
    return <Countdown />;
  } else if (context.status === 'Question') {
    return <ShowQuestion />;
  } else if (context.status === 'LeaderBoard') {
    return <UserLeaderBoard />;
    //change this to questions.length
  } else if (context.Qstatus === 2) {
    return <UserLeaderBoard />;
  } else if (context.Qstatus === 3) {
    <Redirect from="/game" to="/dash" />;
  } else {
    return <h1>Loading..</h1>;
  }
}

export default UserGame;
