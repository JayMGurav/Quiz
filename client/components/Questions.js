import React, { useState } from 'react';
import { Container, Button, Row } from 'react-bootstrap';

function SetQuestion() {
  // return <h1>THis is Questions</h1>;
  const [Question, SetQuestion] = useState('');
  const [option1, SetOption1] = useState('');
  const [option2, SetOption2] = useState('');
  const [option3, SetOption3] = useState('');
  const [option4, SetOption4] = useState('');
  const [selectedOpt, setOption] = useState('');
  const [count, SetCount] = useState(1);

  const handleSubmit = e => {
    e.preventDefault();
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
                  name="option1"
                  onChange={e => setOption(e.target.name)}
                  checked={selectedOpt === 'option1'}
                />
              </div>
              <div className="optionsStyle">
                <input
                  type="text"
                  className="inpTextStyle"
                  value={option2}
                  name={option2}
                  onChange={e => SetOption2(e.target.value)}
                  onBlur={e => SetOption2(e.target.value)}
                  placeholder="Option 2..."
                />
                <input
                  type="radio"
                  name="option2"
                  className="inpRadioStyle"
                  onChange={e => setOption(e.target.name)}
                  checked={selectedOpt === 'option2'}
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
                  value={option3}
                  name={option3}
                  onChange={e => SetOption3(e.target.value)}
                  onBlur={e => SetOption3(e.target.value)}
                  placeholder="Option 3..."
                />
                <input
                  type="radio"
                  name="option3"
                  className="inpRadioStyle"
                  onChange={e => setOption(e.target.name)}
                  checked={selectedOpt === 'option3'}
                />
              </div>
              <div className="optionsStyle">
                <input
                  type="text"
                  className="inpTextStyle"
                  value={option4}
                  name={option4}
                  onChange={e => SetOption4(e.target.value)}
                  onBlur={e => SetOption4(e.target.value)}
                  placeholder="Option 4..."
                />
                <input
                  type="radio"
                  name="option4"
                  className="inpRadioStyle"
                  onChange={e => setOption(e.target.name)}
                  checked={selectedOpt === 'option4'}
                />
              </div>
            </Row>
          </div>
          <Button
            variant="dark"
            type="submit"
            onClick={() => SetCount(count + 1)}
            style={{ float: 'right', width: '10%' }}
          >
            Next
          </Button>
        </form>
      </div>
      {selectedOpt}
    </Container>
  );
}

export default SetQuestion;
