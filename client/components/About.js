import React from 'react';
import { Row, Col } from 'react-bootstrap';
import HeaderImg from './HeaderImg';
const headerImg = require('../img/about.jpg');

function AboutDet() {
  return (
    <Col xs={12} lg={window.innerWidth < 992 ? 12 : 5} style={{ padding: '0' }}>
      <div className="center_Align AboutDet">
        <h1>About us</h1>
        <p>
          Hi!, We are Qz We are on our mission to make learning awesome and
          unlock the deepest potential of each and every learner by making
          learning fun and engaging through games. We want to improve education
          all over the world and help everyone of any age,aptitude or
          circumstasnce unleash the magic of learning.
        </p>
      </div>
    </Col>
  );
}

function About() {
  return (
    <Row className="height_Onescreen" style={{ margin: '0', padding: '0' }}>
      <HeaderImg headerImg={headerImg} />
      <AboutDet />
    </Row>
  );
}

export default About;
