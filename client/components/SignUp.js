import React, { useState } from 'react';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import { Link } from '@reach/router';
import HeaderImg from './HeaderImg';
const headerImg = require('../img/sit.jpg');
import { auth, createUserProfileDoc } from '../../src/firebase';

const inpStyle = {
  width: '80%',
  fontSize: '1.0em',
  border: 'none',
  borderBottom: '2px solid #000',
  padding: '2%',
  background: '#f2f2f2',
};

function SignUpDet() {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (Password === ConfirmPassword) {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          Email,
          Password,
        );
        user ? createUserProfileDoc(user, { Username }) : null;
      } catch (err) {
        setError(err.message);
        console.error('In signUp page ' + err.message);
      }
    } else {
      setError('The Password and Confirm Password Should Match');
    }
  }

  return (
    <Col
      xs={12}
      lg={window.innerWidth < 992 ? 12 : 5}
      style={{ padding: '0', background: '#f2f2f2' }}
    >
      <form
        className="center_Align signInDet"
        onSubmit={e => this.handleSubmit(e)}
      >
        {error == '' ? null : (
          <Alert variant="danger">
            <h6>{error}</h6>
          </Alert>
        )}
        <br />
        <Link to="/signIn">Click to SignIn</Link>
        <input
          type="text"
          placeholder="Username..."
          onChange={e => setUsername(e.target.value)}
          onBlur={e => setUsername(e.target.value)}
          name={Username}
          value={Username}
          style={inpStyle}
        />
        <input
          type="email"
          placeholder="Email..."
          onChange={e => setEmail(e.target.value)}
          onBlur={e => setEmail(e.target.value)}
          name={Email}
          value={Email}
          style={inpStyle}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={e => setPassword(e.target.value)}
          onBlur={e => setPassword(e.target.value)}
          style={inpStyle}
          name={Password}
          value={Password}
        />
        <input
          type="password"
          placeholder="Re-enter password..."
          onChange={e => setConfirmPassword(e.target.value)}
          onBlur={e => setConfirmPassword(e.target.value)}
          style={inpStyle}
          name={ConfirmPassword}
          value={ConfirmPassword}
        />
        <Button
          variant="cool"
          style={{
            width: '30%',
            fontSize: '1.0em',
            fontWeight: 'bold',
            marginTop: '30px',
            color: '#fff',
          }}
          onClick={e => handleSubmit(e)}
        >
          Sign up
        </Button>
      </form>
    </Col>
  );
}

function SignUp() {
  return (
    <Row className="height_Onescreen" style={{ margin: '0', padding: '0' }}>
      <HeaderImg headerImg={headerImg} />
      <SignUpDet />
    </Row>
  );
}

export default SignUp;
