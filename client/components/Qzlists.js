import React, { Fragment, useState } from 'react';
import { TakeQzModal } from './Profile';
import { Button } from 'react-bootstrap';

function QzList({ list, loading }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ) : !list.length ? (
        <div
          className="flexCenterAlign"
          style={{ color: '#343a40', marginTop: '4%' }}
        >
          <h4>No Qz yet..!!</h4>
          <h1>Start taking ur first Qz</h1>
          <Button
            variant="outline-dark"
            style={{ marginTop: '2%', fontWeight: 'bold' }}
            onClick={() => setShowModal(!showModal)}
          >
            Take a Qz
          </Button>
          {showModal && (
            <TakeQzModal show={showModal} onHide={() => setShowModal(false)} />
          )}
        </div>
      ) : (
        <h1>hello</h1>
      )}
    </Fragment>
  );
}

export default QzList;
