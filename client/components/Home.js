import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { Link, Router } from '@reach/router';
import HomePage from './HomePage';
import About from './About';
import GameId from './GameId';

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          padding: '2%',
          color: isCurrent ? '#f2f2f2' : '#343a40',
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
      <div className="logo">QZ</div>
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
      </Router>
      <Menu />
    </Fragment>
  );
}

export default Home;

// <Router>
//   <HomePage path="/" />
// </Router>;
