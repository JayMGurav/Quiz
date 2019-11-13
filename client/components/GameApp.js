import React, { useState, useEffect, useMemo, useContext } from 'react';
import PlayerGame from './PlayerGame';
import UserGame from './UserGame';
import NewWindow from 'react-new-window';

import { ParentGameContext } from './GameContext.js';

function Game({ user, data }) {
  return (
    <NewWindow
      name="Game"
      title="Game"
      center="screen"
      features={{
        width: parseInt(window.innerWidth),
        height: parseInt(window.outerHeight),
        fullscreen: 'yes',
        menubar: 'no',
        resizable: 'no',
        location: 'no',
        status: 'no',
        webPreferences: {
          devTools: false,
        },
      }}
      style={{ padding: '0%', margin: '0%' }}
    >
      <div
        style={{ width: '100%', height: '100vh', padding: '0%', margin: '0%' }}
      >
        {user === 'user' ? (
          <UserGame user={user} uid={data} />
        ) : (
          <PlayerGame user={user} data={data} />
        )}
      </div>
    </NewWindow>
  );
}
//set context before route or GameApp
function GameApp(props) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(props.location.state.user);
  const [data, setData] = useState(
    props.location.state.uid || props.location.state.plyr,
  );
  const [Qid] = useState(props.location.state.qid);
  const [Status] = useState(props.location.state.status);
  const { qid, status, setUid, setQid, changeGameStatus } = useContext(
    ParentGameContext,
  );
  // console.log(status);

  useEffect(() => {
    setUid(props.location.state.uid);
    setQid(Qid);
    changeGameStatus(props.location.state.uid, Qid, 'joining');
    setLoading(false);
  }, []);
  return loading ? <h1>Loading...</h1> : <Game user={user} data={data} />;
}

export default GameApp;
