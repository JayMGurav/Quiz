import React, { createContext, useState, useEffect } from 'react';
import {
  changeQzStatus,
  changeQuestionStatus,
  firestore,
} from '../../src/firebase';

export const ParentGameContext = createContext(null);

function GameContextProvider(props) {
  const [qid, setQid] = useState(null);
  const [status, setStatus] = useState('notStarted');
  const [Qstatus, setQStatus] = useState(0);
  const [uid, setUid] = useState(null);
  const [ansStatus, setAnsStatus] = useState('');

  useEffect(() => {
    let subscribeerBe = true;
    if (subscribeerBe && uid && qid) {
      changeQzStatus(uid, qid, status)
        .then(stat => {
          setStatus(stat);
          changeQuestionStatus(uid, qid, Qstatus).then(QSt => {
            setQStatus(QSt);
          });
        })
        .catch(err => {
          console.error(
            'This is in GameApp changingQuestionStatus : ' + err.message,
          );
        })
        .catch(err =>
          console.error(
            'This is in GameApp changingGameStatus : ' + err.message,
          ),
        );
    }
    return () => (subscribeerBe = false);
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

  const changeAnsStatus = sta => {
    setAnsStatus(sta);
  };

  const changeQStatus = (uid, qid, Qstatus) => {
    changeQuestionStatus(uid, qid, Qstatus)
      .then(Qstat => {
        setQStatus(Qstat);
      })
      .catch(err =>
        console.error('This is in GameApp changingQStatus : ' + err.message),
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

  const getQStatusSnap = qid => {
    firestore
      .collection('room')
      .doc(qid)
      .onSnapshot(function(doc) {
        const data = doc.get('Qstatus');
        setQStatus(data);
        // return data;
      });
  };

  // const value = {qid,status,setQid,setStatus,changeGameStatus}
  return (
    <ParentGameContext.Provider
      value={{
        qid,
        status,
        Qstatus,
        setQid,
        getStatusSnap,
        ansStatus,
        changeAnsStatus,
        setUid,
        changeGameStatus,
        changeQStatus,
        getQStatusSnap,
      }}
    >
      {props.children}
    </ParentGameContext.Provider>
  );
}

export default GameContextProvider;
