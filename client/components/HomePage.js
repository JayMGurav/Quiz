import React from 'react';
const headerImg = require('../img/h-min.gif');
import HeaderImg from './HeaderImg';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from '@reach/router';

function HomeDet() {
  const b = {
    width: '150%',
    fontSize: '1.0em',
    fontWeight: 'bold',
  };
  return (
    <Col
      xs={12}
      lg={window.innerWidth < 992 ? 12 : 5}
      style={{ background: '#f2f2f2', padding: '0' }}
    >
      <div className="homeDet center_Align">
        <h1>
          WHY
          <br />
          QUIZZES NOT
          <br />
          THE FUN WAY?
        </h1>
        <p>
          Take quizzes the most fun and
          <br />
          engaging way as never before,
          <br />
          Don't get bored to take one.
        </p>
      </div>
      <div className="Btnn">
        <Link to="/signUp">
          <Button variant="outline-dark" style={b}>
            Sign up
          </Button>
        </Link>
        <Link to="/signIn">
          <Button variant="dark" style={b}>
            Sign in
          </Button>
        </Link>
      </div>
    </Col>
  );
}

function HomePage() {
  return (
    <Row className="height_Onescreen" style={{ margin: '0', padding: '0' }}>
      <HeaderImg headerImg={headerImg} />
      <HomeDet />
    </Row>
  );
}

export default HomePage;
