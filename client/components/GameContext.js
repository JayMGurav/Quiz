import React, { createContext, useState, useEffect } from 'react';
import { changeQzStatus, firestore } from '../../src/firebase';
export const GameContext = createContext(null);
export const ParentGameContext = createContext(null);
function GameContextProvider(props) {
  const [qid, setQid] = useState(null);
  const [status, setStatus] = useState('notStarted');
  const [uid, setUid] = useState(null);
  useEffect(() => {
    if (uid && qid) {
      changeQzStatus(uid, qid, status)
        .then(stat => {
          setStatus(stat);
        })
        .catch(err =>
          console.error(
            'This is in GameApp changingGameStatus : ' + err.message,
          ),
        );
    }
  }, []);

  const changeGameStatus = (uid, qid, status) => {
    changeQzStatus(uid, qid, status)
      .then(stat => {
        setStatus(stat);
      })
      .catch(err =>
        console.error('This is in GameApp changingGameStatus : ' + err.message),
      );
  };

  const getStatusSnap = qid => {
    firestore
      .collection('room')
      .doc(qid)
      .onSnapshot(function(doc) {
        const data = doc.get('status');
        setStatus(data);
        // return data;
      });
  };

  // const value = {qid,status,setQid,setStatus,changeGameStatus}
  return (
    <ParentGameContext.Provider
      value={{ qid, status, setQid, getStatusSnap, setUid, changeGameStatus }}
    >
      {props.children}
    </ParentGameContext.Provider>
  );
}

export default GameContextProvider;
