import React, { useState } from 'react';
import PlayerGame from './PlayerGame';
import UserGame from './UserGame';
import NewWindow from 'react-new-window';
import { changeQzStatus } from '../../src/firebase.js';
import { GameContext } from './GameContext.js';

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
      {user === 'user' ? (
        <UserGame user={user} data={data} />
      ) : (
        <PlayerGame user={user} data={data} />
      )}
    </NewWindow>
  );
}

function GameApp(props) {
  const [user, setUser] = useState(props.location.state.user);
  const [plyr, setPlyr] = useState(props.location.state.plyr);
  const [userData, setUserData] = useState(props.location.state.usrData);
  const [status, setStatus] = useState(props.location.state.status);
  //comes in context updater function
  const changeGameStatus = (uid, qid, statusTo) => {
    changeQzStatus(uid, qid, statusTo)
      .then(stat => {
        setStatus(stat);
      })
      .catch(err =>
        console.error('This is in GameApp changingGameStatus : ' + err.message),
      );
  };

  return (
    //Set tcontext value will be status and qid
    <GameContext.Provider
      value={{
        status: status,
        qid: user === 'user' ? userData.qid : plyr.qid,
        changeGameStatus: changeGameStatus,
      }}
    >
      {user === 'user' ? (
        <Game
          user={user}
          data={userData.uid}
          changeGameStatus={changeGameStatus}
        />
      ) : (
        <Game user={user} data={plyr} />
      )}
    </GameContext.Provider>
  );
}

export default GameApp;
