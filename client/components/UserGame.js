import React, { useContext } from 'react';
import { ParentGameContext } from './GameContext.js';
import DispIdNPlyrs from './DispIdNPlyrs.js';
import { Countdown } from './Started';

function UserGame({ uid }) {
  const context = useContext(ParentGameContext);
  console.log(uid);
  // return <h1>Hello</h1>;
  if (context.status === 'joining') {
    return <DispIdNPlyrs uid={uid} />;
  } else if (context.status === 'Started') {
    return (
      <div>
        <Countdown />
      </div>
    );
  } else {
    return <h1>None</h1>;
  }
}

export default UserGame;
