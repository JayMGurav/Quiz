import React, { Fragment, useState, Component } from 'react';
import { createPortal } from 'react-dom';
import { Button, Card, Modal, Form, Row, Col } from 'react-bootstrap';
import firebase, { getQzDoc } from '../../src/firebase';
import { navigate } from '@reach/router';
import { sha256 } from 'js-sha256';

const b = {
  fontSize: '1.0em',
  fontWeight: 'bold',
};
const cardSty = {
  width: '18rem',
  margin: '2%',
  border: 'none',
  boxShadow: ' 0px 3px 6px rgba(75, 75, 75, 0.2)',
};
const inpStyle = {
  fontSize: '1.25em',
};
//take Quiz modal component called using portal
export class TakeQzModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      noQs: 0,
      timeperiod: 0,
    };
    //contains the state of questions in the same modal
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }

  createQid = name => {
    const Qid = sha256(this.props.uid + name).slice(0, 10);
    return getQzDoc(this.props.uid, Qid).then(data => {
      return data;
    });
  };

  handleSubmit = () => {
    this.createQid(this.state.name).then(d => {
      if (d.status === null) {
        navigate(
          `/dash/question/${d.Qid}/${this.state.name}/${this.state.noQs}/${this.state.timeperiod}`,
        );
      } else {
        //change this to some message
        alert('There is already a Qz saved By this name');
      }
    });
  };
  render() {
    return createPortal(
      <div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <h3>Qz details</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form style={{ b }}>
              <Form.Group as={Row} controlId="formQzName">
                <Form.Label column sm={5} style={inpStyle}>
                  Name of Qz
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    style={inpStyle}
                    type="text"
                    placeholder="Titans"
                    name="name"
                    value={this.state.name}
                    onChange={event =>
                      this.setState({ name: event.target.value })
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formNoQuestions">
                <Form.Label column sm={5} style={inpStyle}>
                  Number of Questions
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    style={inpStyle}
                    type="number"
                    name="noQs"
                    value={this.state.noQs}
                    min="2" //change this later
                    max="30"
                    step="5"
                    placeholder="5-30"
                    onChange={event =>
                      this.setState({ noQs: event.target.value })
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formTimePeriod">
                <Form.Label column sm={5} style={inpStyle}>
                  Time-period between each Question(is seconds)
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="number"
                    style={inpStyle}
                    name="timeperiod"
                    value={this.state.timeperiod}
                    min="10"
                    max="30"
                    step="10"
                    placeholder="10s,20s or 30s"
                    onChange={event =>
                      this.setState({ timeperiod: event.target.value })
                    }
                  />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-dark"
              style={b}
              onClick={this.handleSubmit}
            >
              Start Entering Questions
            </Button>
          </Modal.Footer>
        </Modal>
      </div>,
      this.container,
    );
  }
}
// onClick={this.props.onHide}
// profile component

function Profile({ user }) {
  const [showModal, setShowModal] = useState(false);

  return user.Username ? (
    <Fragment>
      <div className="profileDet">
        <img src={user.avatar} className="profilePic" />
        <div style={{ padding: '4% 0%', textAlign: 'left' }}>
          <h1>@{user.Username}</h1>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="profileDet">
        <Card style={cardSty}>
          <Card.Body>
            <Card.Title>
              <h1>{user.qzTaken.length}</h1>
            </Card.Title>
            <Card.Text>Quizzes Taken</Card.Text>
          </Card.Body>
        </Card>
        <Card style={cardSty}>
          <Card.Body>
            <Card.Title>
              <h1>{user.savedQz.length}</h1>
            </Card.Title>
            <Card.Text>Quizzes Saved</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="Btnn">
        <Button
          variant="dark"
          style={b}
          onClick={() => setShowModal(!showModal)}
        >
          Create a Qz
        </Button>

        {showModal && (
          <TakeQzModal
            show={showModal}
            onHide={() => setShowModal(false)}
            uid={user.uid}
          />
        )}
        <Button
          variant="outline-dark"
          style={b}
          onClick={() => firebase.auth().signOut()}
        >
          Sign out
        </Button>
      </div>
    </Fragment>
  ) : (
    <h1>Loading...</h1>
  );
}
// {user.savedQz.length}
export default Profile;
