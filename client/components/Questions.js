import React, { useState } from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import firebase, { createQz, firestore } from '../../src/firebase.js';
import { navigate } from '@reach/router';
// let questions = [];
const Qz = {
  questions: [],
  players: [],
  topScore: [],
};
function SetQuestion(props) {
  // return <h1>THis is Questions</h1>;
  const [Question, SetQuestion] = useState('');
  const [option1, SetOption1] = useState('');
  const [option2, SetOption2] = useState('');
  const [option3, SetOption3] = useState('');
  const [option4, SetOption4] = useState('');
  const [selectedOpt, setOption] = useState(null);
  const [count, SetCount] = useState(1);
  const [btnTxt, setBtnTxt] = useState('Next');

  const handleSubmit = e => {
    e.preventDefault();
    Qz.name = props.name;
    Qz.noQs = Number(props.noQs);
    Qz.timeperiod = Number(props.timeperiod);
    createQz(props.uid, props.Qid, Qz).then(() => {
      firestore
        .doc(`user/${props.uid}`)
        .update({
          savedQz: firebase.firestore.FieldValue.arrayUnion(props.Qid),
        })
        .then(() => {
          Qz.questions = [];
          Qz.players = [];
          Qz.topScore = [];
        })
        .then(() => {
          navigate('/dash');
        });
    }); //add tag as saved
  };

  const handleCounter = e => {
    if (count < props.noQs) {
      SetCount(count + 1);
      Qz.questions.push({
        question: Question,
        options: [option1, option2, option3, option4],
        answer: selectedOpt,
      });
      SetOption1('');
      SetOption2('');
      SetOption3('');
      SetOption4('');
      SetQuestion('');
      setOption(null);
      count == props.noQs - 1 ? setBtnTxt('Save') : null;
    } else if (count === Number(props.noQs)) {
      Qz.questions.length === Number(props.noQs) - 1
        ? Qz.questions.push({
            question: Question,
            options: [option1, option2, option3, option4],
            answer: selectedOpt,
          })
        : null;
      handleSubmit(e);
    }
  };

  return (
    <Container
      fluid
      style={{ background: '#f2f2f2', width: '100%', height: '100vh' }}
    >
      <div className="DashDiv center_Align">
        <div style={{ width: '100%', padding: '1% 2%', marginBottom: '2%' }}>
          <h1>{count}.</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            width: '80%',
            height: '80%',
            margin: 'auto',
          }}
        >
          <input
            type="text"
            value={Question}
            name="Question"
            onChange={e => SetQuestion(e.target.value)}
            onBlur={e => SetQuestion(e.target.value)}
            placeholder="Type your question here"
            required
            style={{
              width: '100%',
              fontSize: '2.0em',
              marginBottom: '2%',
              padding: '1% 2%',
              color: '343a40',
              border: 'none',
              border: '1px solid #ddd',
              borderRadius: '8px',
            }}
          />

          <div className=" optionBox">
            <Row
              style={{
                width: '100%',
                margin: '0',
              }}
            >
              <div className="optionsStyle" style={{}}>
                <input
                  type="text"
                  required
                  className="inpTextStyle"
                  value={option1}
                  name={option1}
                  onChange={e => SetOption1(e.target.value)}
                  onBlur={e => SetOption1(e.target.value)}
                  placeholder="Option 1..."
                />
                <input
                  type="radio"
                  className="inpRadioStyle"
                  name={option1}
                  onChange={e => setOption(e.target.name)}
                  checked={selectedOpt === option1}
                />
              </div>
              <div className="optionsStyle">
                <input
                  type="text"
                  className="inpTextStyle"
                  value={option2}
                  name={option2}
                  required
                  onChange={e => SetOption2(e.target.value)}
                  onBlur={e => SetOption2(e.target.value)}
                  placeholder="Option 2..."
                />
                <input
                  type="radio"
                  name={option2}
                  className="inpRadioStyle"
                  onChange={e => setOption(e.target.name)}
                  checked={selectedOpt === option2}
                />
              </div>
            </Row>
            <Row
              style={{
                width: '100%',
                margin: '0',
                justifyContent: 'spaced-evenly',
              }}
            >
              <div className="optionsStyle">
                <input
                  type="text"
                  className="inpTextStyle"
                  required
                  value={option3}
                  name={option3}
                  onChange={e => SetOption3(e.target.value)}
                  onBlur={e => SetOption3(e.target.value)}
                  placeholder="Option 3..."
                />
                <input
                  type="radio"
                  name={option3}
                  className="inpRadioStyle"
                  onChange={e => setOption(e.target.name)}
                  checked={selectedOpt === option3}
                />
              </div>
              <div className="optionsStyle">
                <input
                  type="text"
                  className="inpTextStyle"
                  required
                  value={option4}
                  name={option4}
                  onChange={e => SetOption4(e.target.value)}
                  onBlur={e => SetOption4(e.target.value)}
                  placeholder="Option 4..."
                />
                <input
                  type="radio"
                  name={option4}
                  className="inpRadioStyle"
                  onChange={e => setOption(e.target.name)}
                  checked={selectedOpt === option4}
                />
              </div>
            </Row>
          </div>
          <Button
            variant="dark"
            type="submit"
            onClick={event => handleCounter(event)}
            style={{ float: 'right', width: '10%' }}
          >
            {btnTxt}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default SetQuestion;
