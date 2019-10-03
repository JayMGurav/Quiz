import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import HeaderImg from './HeaderImg';
const headerImg = require('../img/gamePin.gif');

function GameDet() {
  const [GameId, setGameId] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Col
      xs={12}
      lg={window.innerWidth < 992 ? 12 : 5}
      style={{ background: '#f2f2f2', padding: '0' }}
    >
      <form className="center_Align GameIdDet" onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          name="GameId"
          value={GameId}
          placeholder="Enter Game Id..."
          onChange={e => setGameId(e.target.value)}
          onBlur={e => setGameId(e.target.value)}
          style={{
            width: '80%',
            fontSize: '1.0em',
            border: 'none',
            borderBottom: '2px solid #000',
            padding: '2%',
            background: 'inherit',
          }}
        />
        <Button variant="dark">Enter Game</Button>
      </form>
    </Col>
  );
}

function GameId() {
  return (
    <Row className="height_Onescreen" style={{ margin: '0', padding: '0' }}>
      <HeaderImg headerImg={headerImg} />
      <GameDet />
    </Row>
  );
}

export default GameId;
