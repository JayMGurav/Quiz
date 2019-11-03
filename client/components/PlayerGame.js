import React, { useContext } from 'react';
import { GameContext } from './GameContext.js';

function PlayerGame({ user, data }) {
  const context = useContext(GameContext);
  return (
    <h1>
      PlayerGame {user} {data.name} {context.status}
    </h1>
  );
}

export default PlayerGame;
