import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import { auth } from '../../src/firebase';
import Home from './Home';
import Dash from './ForSignedInUsers';

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
  return user ? <Dash user={user} /> : <Home />;
}

export default App;
