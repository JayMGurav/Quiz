import React, { Fragment, useState, useEffect } from 'react';
import { Router } from '@reach/router';
import SetQuestion from './Questions';
import DashBoard from './Dashboard';

function Dash({ user }) {
  return (
    <Fragment>
      <Router>
        <DashBoard path="/dash" user={user} />
        <SetQuestion path="/dash/questions" />
      </Router>
    </Fragment>
  );
}
export default Dash;

//
