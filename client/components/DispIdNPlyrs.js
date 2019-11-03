import React, { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import { GameContext } from './GameContext.js';

function DispIdNPlyrs({ uid }) {
  const context = useContext(GameContext);
  return (
    <Container
      fluid
      style={{
        height: '100vh',
        padding: '0%',
        background: '#fff',
      }}
    >
      <Row
        style={{
          height: '20%',
          width: '100%',
          textAlign: 'center',
          padding: '0%',
          margin: '0%',
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
      </Row>
      <hr />
      <Row></Row>
    </Container>
  );
}
export default DispIdNPlyrs;
