import React, { Fragment, useState, useEffect } from 'react';
import { Router } from '@reach/router';
import SetQuestion from './Questions';
import DashBoard from './Dashboard';
import { Details } from './Qzlists';
import GameApp from './GameApp';

function Dash({ user }) {
  return (
    <Fragment>
      <Router>
        <DashBoard path="/dash" user={user} />
        <SetQuestion
          path="/dash/question/:Qid/:name/:noQs/:timeperiod"
          uid={user.uid}
        />
        <Details path="/dash/:qzId" uid={user.uid} />
        <GameApp path="/game" />
      </Router>
    </Fragment>
  );
}

// <GameAppli path="/game/:qid">
//   <Disp path="/game/:qid/disp" />
// </GameAppli>;
export default Dash;
