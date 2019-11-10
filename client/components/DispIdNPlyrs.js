import React, { useContext, useState, useRef, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { ParentGameContext } from './GameContext.js';
import { firestore } from '../../src/firebase.js';
//make a function to generate random color from a give list

function DispIdNPlyrs({ uid }) {
  const context = useContext(ParentGameContext);
  const [plyrs, setPlyrs] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      getPlayrsSnap();
    }
    return () => (isSubscribed = false);
  }, []);

  const getPlayrsSnap = () => {
    firestore
      .collection('room')
      .doc(context.qid)
      .onSnapshot(function(doc) {
        const data = doc.get('players');
        setPlyrs(data);
      });
  };

  return (
    <Container
      fluid
      style={{
        height: '100vh',
        padding: '0%',
        background: '#fff',
      }}
    >
      <div
        style={{
          height: '20%',
          width: '100%',
          textAlign: 'center',
          background: '#343a40',
        }}
        className="flexCenterAlign"
      >
        <h1
          style={{
            letterSpacing: '0.125ch',
            fontSize: '3.0em',
            color: '#f2f2f2',
          }}
        >
          Qz Id : {context.qid}
        </h1>
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <h1>Joined Players </h1>
      </div>
      <Row
        style={{
          height: '55%',
          width: '100%',
          padding: '2%',
          margin: '0%',
          overflowY: 'auto',
        }}
        className="flexStart"
      >
        {plyrs
          ? plyrs.map((item, key) => {
              return (
                <div className="dispPlayrs" key={key} style={{}}>
                  <h2>{item}</h2>
                </div>
              );
            })
          : null}
      </Row>
      <div className="Btnn">
        <Button
          variant="outline-dark"
          style={{ fontSize: '1.0em', fontWeight: 'bold' }}
          onClick={() => {
            context.changeGameStatus(uid, context.qid, 'Countdown');
          }}
        >
          Start Qz
        </Button>
      </div>
    </Container>
  );
}
export default DispIdNPlyrs;

// ? plyrs.map((name, index) => {
//     return (
//       <div

//         key={index}
//       >
//         <h2>{name}</h2>
//       </div>
//     );
//   })
