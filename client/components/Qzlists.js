import React, { Fragment, useState, useEffect } from 'react';
import { getList, changeQzStatus } from '../../src/firebase.js';
import { navigate } from '@reach/router';
import { Button, Row, Col } from 'react-bootstrap';

export function SavedQzList({ uid, loading }) {
  const [saveQz, setSavedQz] = useState([]);

  useEffect(() => {
    const h = getList(uid, 'saved');
    h.then(d => {
      setSavedQz(d);
    });
  }, []);

  return (
    <div className="header_img flexCenterAlign scrollDes">
      {loading ? (
        <h1>Loading...</h1>
      ) : saveQz.length > 0 ? (
        <ListIt data={saveQz} />
      ) : (
        <div style={{ color: '#343a40', marginTop: '4%', textAlign: 'center' }}>
          <h4>No Qz yet..!!</h4>
          <h1>Start taking ur first Qz</h1>
          <h5>Go to ur profile and create one</h5>
        </div>
      )}
    </div>
  );
}

export function TakenQzList({ uid, saved, loading }) {
  const [takenQz, settakenQz] = useState([]);
  useEffect(() => {
    const h = getList(uid, 'taken');
    h.then(d => {
      settakenQz(d);
    });
  }, []);

  return (
    <div className="header_img flexCenterAlign scrollDes">
      {loading ? (
        <h1>Loading...</h1>
      ) : takenQz.length == 0 ? (
        <div style={{ color: '#343a40', marginTop: '4%', textAlign: 'center' }}>
          <h4>No Qz yet..!!</h4>
          <h1>Start taking ur first Qz</h1>
          {saved.length == 0 ? (
            <h5>Go to your profile and create one</h5>
          ) : (
            <h5>Go to Saved Quizzes and take one</h5>
          )}
        </div>
      ) : (
        <ListIt data={takenQz} />
      )}
    </div>
  );
}

//lists whatever Qz it has given
function ListIt({ data }) {
  const handleClick = qz => {
    navigate(`/dash/${qz.id}`, { state: { Qz: qz } });
  };

  return (
    <Fragment>
      {data.map(qz => {
        return (
          <div
            className="list_sty "
            key={qz.id}
            onClick={() => handleClick(qz)}
          >
            <div>
              <h1>{qz.name}</h1>
              <h5>Id : {qz.id}</h5>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h1>{qz.questions.length}</h1>
              <h5>Questions</h5>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}

//Qz detail
export function Details(props) {
  const [qz, setQz] = useState(props.location.state.Qz);
  const changeStatus = (uid, qid, status) => {
    return changeQzStatus(uid, qid, status).then(status => {
      return status;
    });
  };

  const handleClick = async (e, qid) => {
    e.preventDefault();
    changeStatus(props.uid, qid, 'joining')
      .then(status => {
        navigate('/game', {
          state: {
            user: 'user',
            uid: props.uid,
            qid,
            status: status,
          },
        });
      })
      .catch(err =>
        console.error('During Qzlist changeStatue : ' + err.message),
      );
  };

  return (
    <div className="header_img" style={{ margin: 'auto' }}>
      <Row className="qzDet darkSty" style={{ margin: '1% auto' }}>
        <Col>
          <h1>{qz.name}</h1>
          <h5>Id : {qz.id}</h5>
        </Col>
        <Col style={{ textAlign: 'center' }}>
          <h1>{qz.questions.length}</h1>
          <h5>Questions</h5>
        </Col>
        <Col style={{ textAlign: 'center' }}>
          <h1>{qz.timeperiod}s</h1>
          <h5>Time-period</h5>
        </Col>
      </Row>
      <div
        className="qzDet scrollDes"
        style={{ height: '70vh', padding: '2%' }}
      >
        {qz.questions.map((ques, index) => {
          return (
            <div key={index}>
              <h3>{index + 1 + ' : ' + ques.question}</h3>
              <br />
              <Row style={{ display: 'inline' }}>
                {ques.options.map((opt, index) => {
                  return (
                    <Col
                      style={{
                        padding: '1%',
                        background: '#f2f2f2',
                        fontSize: '1.5em',
                        width: 'fit-content',
                        display: 'inline',
                        borderRadius: '4px',
                        margin: '1%',
                      }}
                      key={index}
                    >
                      {opt}
                    </Col>
                  );
                })}
              </Row>
              <br />
              <br />
              <Row style={{ display: 'inline' }}>
                <p
                  style={{
                    padding: '1%',
                    background: '#343a40',
                    fontSize: '1.0em',
                    color: '#fff',
                    width: 'fit-content',
                    borderRadius: '4px',
                  }}
                >
                  {ques.answer}
                </p>
              </Row>
              <hr />
            </div>
          );
        })}
      </div>
      <Button
        variant="dark"
        className="BottomPos"
        onClick={event => handleClick(event, qz.id)}
      >
        Start Qz
      </Button>
    </div>
  );
}
