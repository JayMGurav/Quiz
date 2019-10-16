import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { getUserDoc } from '../../src/firebase';
import Profile from './Profile';
const profilePic = require('../img/profile3.jpg');

import QzList from './Qzlists';

function DashBoard({ user }) {
  const [userData, setUserData] = useState(user);
  const [loading, setLoading] = useState(true);
  const avatar = user.photoURL ? user.photoURL : profilePic;

  useEffect(() => {
    getUserDoc(user.uid).then(data => {
      setUserData({ ...data, avatar });
      setLoading(false);
    });
  }, []);

  return (
    <Container
      fluid
      style={{ background: '#f2f2f2', width: '100%', height: '100vh' }}
    >
      <div className="DashDiv center_Align">
        <Tab.Container id="left-tabs-example" defaultActiveKey="taken">
          <Row style={{ height: '100%', padding: '2% 4%' }}>
            <Col
              sm={3}
              style={{
                background: '#fff',
                padding: '1%',
                height: 'fit-content',
              }}
            >
              <Nav
                variant="pills"
                className="flex-column"
                style={{ fontSize: '1.0em', fontWeight: 'bold' }}
              >
                <Nav.Item>
                  <Nav.Link eventKey="taken">Quizzes taken</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Saved">Saved quizzes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Profile">Profile</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col
              sm={9}
              style={{
                width: '100%',
                height: '100%',
                background: '#f2f2f2',
                borderRadius: '8px',
                padding: '1%',
              }}
            >
              <Tab.Content>
                <Tab.Pane eventKey="Profile">
                  <Profile user={userData} loading={loading} />
                </Tab.Pane>
                <Tab.Pane eventKey="Saved">
                  <QzList list={userData.savedQz} loading={loading} />
                </Tab.Pane>
                <Tab.Pane eventKey="taken">
                  <QzList list={userData.qzTaken} loading={loading} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </Container>
  );
}

export default DashBoard;
