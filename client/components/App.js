import React, { useEffect, Fragment, useState } from 'react';
import { navigate, Router } from '@reach/router';
import { auth } from '../../src/firebase';
import Home from './Home';
import Dash from './ForSignedInUsers';
import GameApp from './GameApp';
import GameContextProvider, { ParentGameContext } from './GameContext';

function App() {
  const [user, setUser] = useState(null);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser({ uid: user.uid, photoURL: user.photoURL });
        setFlag(true);
        navigate('/dash');
      } else {
        setUser(null);
        setFlag(false);
        navigate('/');
      }
    });
  }, [flag]);

  return (
    <Fragment>
      <GameContextProvider>
        <Router>
          <GameApp path="/game" />
        </Router>
      </GameContextProvider>
      {user ? <Dash user={user} /> : <Home />}
    </Fragment>
  );
}

export default App;
