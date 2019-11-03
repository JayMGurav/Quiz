import React, { useContext } from 'react';
// import { GameContext } from './GameContext.js';
import DispIdNPlyrs from './DispIdNPlyrs.js';
function UserGame({ data }) {
  // const context = useContext(GameContext);

  return <DispIdNPlyrs uid={data} />;
}

export default UserGame;
