import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { Link, Router } from '@reach/router';
import HomePage from './HomePage';
import About from './About';
import GameId from './GameId';
import SignIn from './SignIn';
import SignUp from './SignUp';

export const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          padding: '2%',
          color: isCurrent ? '#f2f2f2' : '#777777',
          background: isCurrent ? '#343a40' : 'inherit',
          textDecoration: 'none',
          border: 'none',
          borderRadius: '4px',
        },
      };
    }}
  />
);

function Menu() {
  return (
    <Container
      fluid
      className="Navbar"
      style={{ margin: '0', padding: '0', zIndex: '99999' }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: '#343a40' }}>
        <div className="logo">QZ</div>
      </Link>
      <nav className="navs">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/gameId">Enter game id</NavLink>
        <NavLink to="/aboutus">About</NavLink>
        <NavLink to="/contactus">Contact us</NavLink>
      </nav>
    </Container>
  );
}

function Home() {
  return (
    <Fragment>
      <Router>
        <HomePage path="/" />
        <About path="/aboutus" />
        <GameId path="gameId" />
        <SignUp path="/signUp" />
        <SignIn path="/signIn" />
      </Router>
      <Menu />
    </Fragment>
  );
}

export default Home;
