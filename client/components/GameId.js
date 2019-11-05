import React, { useState } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import HeaderImg from './HeaderImg';
import { getQzStatus, createQzPlayer, getPlayer } from '../../src/firebase.js';
import { navigate } from '@reach/router';
import { sha256 } from 'js-sha256';
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
    id: 0,
    name: '',
    score: 0,
    rank: 0,
    correct: 0,
    inCorrect: 0,
  };

  const createPlayerId = (gameId, name) => {
    const pid = sha256(gameId + name).slice(0, 10);
    console.log(pid);
    return getPlayer(gameId, pid).then(d => {
      return d;
    });
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
                qid: GameId,
                status: status,
              },
            });
          });
        } else if (status === 'notStarted') {
          setError('Wait buddy " THE GAME HAS NOT YET STARTED..!! "');
        } else if (status === 'Started') {
          setError('Too late The game is already begun"..!!');
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
            <h6>{error}</h6>
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
