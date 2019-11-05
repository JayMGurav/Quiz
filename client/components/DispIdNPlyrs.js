import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { GameContext, ParentGameContext } from './GameContext.js';
import { firestore } from '../../src/firebase.js';

//make a function to generate random color from a give list

function DispIdNPlyrs({ uid }) {
  const context = useContext(ParentGameContext);
  const [plyrs, setPlyrs] = useState([]);

  console.log(context.status);
  useEffect(() => {
    let isSubscribed = true;
    firestore
      .collection('room')
      .doc(context.qid)
      .onSnapshot(function(doc) {
        const data = doc.get('players');
        setPlyrs(data);
      });
    return () => (isSubscribed = false);
  }, []);

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
        {context.status}
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
          ? plyrs.map(({ name }, index) => {
              return (
                <div
                  style={{
                    width: 'fit-content',
                    padding: '0% 1%',
                    margin: '1% 2%',
                    background: '#343a40',
                    color: '#f2f2f2',
                    borderRadius: '4px',
                    boxShadow: '0px 3px 6px rgba(72,72,72,0.3)',
                  }}
                  key={index}
                >
                  <h2>{name}</h2>
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
            context.changeGameStatus(uid, context.qid, 'Started');
          }}
        >
          Start Qz
        </Button>
      </div>
    </Container>
  );
}
export default DispIdNPlyrs;
