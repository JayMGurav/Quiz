import React, { useState } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import HeaderImg from './HeaderImg';
import { getQzStatus, createQzPlayer } from '../../src/firebase.js';
import { navigate } from '@reach/router';
const headerImg = require('../img/gameId.png');

const inpSty = {
  width: '80%',
  fontSize: '1.0em',
  border: 'none',
  borderBottom: '2px solid #000',
  padding: '2%',
  background: 'inherit',
};

function GameDet() {
  const [GameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  let Plyr = {
    name: '',
    score: 0,
    rank: 0,
    correct: 0,
    inCorrect: 0,
  };

  //check for uniqueness
  function handleSubmit(e) {
    e.preventDefault();
    Plyr.name = playerName;
    getQzStatus(GameId)
      .then(status => {
        if (status === 'joining') {
          createQzPlayer(GameId, Plyr).then(d => {
            navigate('/game', {
              state: {
                user: 'Player',
                plyr: { ...d[1], qid: GameId },
                status: status,
              },
            });
          });
        } else if (status === 'notStarted') {
          setError('" THE GAME HAS NOT YET STARTED..!! "');
        }
      })
      .catch(err =>
        console.error('During GameId changeStatue : ' + err.message),
      );
  }

  return (
    <Col
      xs={12}
      lg={window.innerWidth < 992 ? 12 : 5}
      style={{ background: '#f2f2f2', padding: '0' }}
    >
      <form className="center_Align GameIdDet" onSubmit={e => handleSubmit(e)}>
        {error == '' ? null : (
          <Alert variant="danger">
            <h6>Wait buddy {error}</h6>
          </Alert>
        )}
        <br />
        <input
          type="text"
          name="GameId"
          value={GameId}
          placeholder="Enter Game Id..."
          onChange={e => setGameId(e.target.value)}
          onBlur={e => setGameId(e.target.value)}
          style={inpSty}
        />
        <input
          type="text"
          name="playerName"
          value={playerName}
          placeholder="Enter Name..."
          onChange={e => setPlayerName(e.target.value)}
          onBlur={e => setPlayerName(e.target.value)}
          style={inpSty}
        />
        <br />
        <Button variant="dark" onClick={event => handleSubmit(event)}>
          Enter Game
        </Button>
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
