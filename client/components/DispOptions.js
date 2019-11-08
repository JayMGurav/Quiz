import React, { useState, useEffect, useContext } from 'react';
import { Toast } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import { ParentGameContext } from './GameContext.js';
import { getQzDoc, updateScore } from '../../src/firebase.js';

export function DispOptions({ pid }) {
  const context = useContext(ParentGameContext);
  const [loading, setLoading] = useState(true);
  const [counterSeconds, setCounterSeconds] = useState();
  const [Timeperiod, setTimeperiod] = useState();
  const [Question, setQuestion] = useState();
  const [questionIndex, setQuestionIndex] = useState(context.Qstatus);
  const [enterTime, setEnterTime] = useState();
  const [selectTime, setSelectTime] = useState(0);
  const [selectedAns, setSelectedAns] = useState('');
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(1);

  useEffect(() => {
    (async () => {
      const data = await getQzDoc(context.uid, context.qid);
      // console.log(data)
      setCounterSeconds(parseInt(data.timeperiod));
      setTimeperiod(parseInt(data.timeperiod));
      setQuestion(data.questions[questionIndex]);
      setEnterTime(Math.round(new Date() / 1000));
      setLoading(false);
    })();
    if (loading == false) {
      startCountDown();
    }
  }, [loading]);

  const handleClick = (e, value) => {
    e.preventDefault();
    setSelectTime(Math.round(new Date() / 1000));
    setSelectedAns(value);

    console.log(enterTime + ' ' + selectTime + ' ' + ' ' + selectedAns);
    console.log(Question);
    if (selectedAns === Question.answer) {
      console.log('yes');
      setScore((Timeperiod - Math.floor(selectTime - enterTime)) * Timeperiod);
      context.changeAnsStatus('Correct');
    } else {
      context.changeAnsStatus('Wrong');
    }
    setShow(true);
    // ..need to set userAns ans update score accordingly
  };

  // const props = useSpring({
  //   from: {
  //     left: '0%',
  //     top: '0%',
  //     width: '100%',
  //     height: Math.floor(window.innerHeight),
  //     background: '#343a40',
  //   },
  //   to: async next => {
  //     await next({
  //       left: '0%',
  //       top: '0%',
  //       width: '100%',
  //       height: counterSeconds * (Math.floor(window.innerHeight) / Timeperiod),
  //       background: '#343a40',
  //     });
  //   },
  // });

  const startCountDown = () => {
    let sec = counterSeconds;
    let interval = setInterval(function() {
      if (sec === 0) {
        clearInterval(interval);
      }
      if (sec === 2) {
        updateScore(context.qid, pid, score);
        console.log('in Disp Optio' + score);
      }
      setCounterSeconds(sec);
      sec--;
    }, 1000);
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="fullWidth height_Onescreen">
      <div
        className="DashDiv center_Align"
        style={{
          textAlign: 'center',
          padding: '0% 1%',
          background: 'rgba(255,255,255,0.9)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: '1% 2%',
            position: 'relative',
          }}
        >
          <div className="counterOptAlign counterSty">
            <h1
              style={{
                fontSize: '4em',
                fontWeight: 'bolder',
              }}
            >
              {counterSeconds}
            </h1>
          </div>
          <div
            style={{
              width: '100%',
              height: '50%',
            }}
            className="optionsAwBox"
          >
            <div
              className="options"
              style={{ borderRadius: '8px 0 0 0', background: '#9be3de' }}
              onClick={event => handleClick(event, Question.options[0])}
            >
              {Question.options[0]}
            </div>
            <div
              className="options"
              style={{ borderRadius: '0 8px 0 0', background: '#fa877f' }}
              onClick={event => handleClick(event, Question.options[1])}
            >
              {Question.options[1]}
            </div>
          </div>
          <div
            style={{
              width: '100%',
              height: '50%',
            }}
            className="optionsAwBox"
          >
            <div
              className="options"
              style={{ borderRadius: '0 0 0 8px', background: '#e4e4e4' }}
              onClick={event => handleClick(event, Question.options[2])}
              onBlur={event => handleClick(event, Question.options[2])}
            >
              {Question.options[2]}
            </div>
            <div
              className="options"
              style={{ borderRadius: '0 0 8px 0', background: '#d597ce' }}
              onClick={event => handleClick(event, Question.options[3])}
            >
              {Question.options[3]}
            </div>
          </div>
        </div>
      </div>
      <Toast
        style={{
          zIndex: '9999',
          position: 'absolute',
          top: 5,
          right: 5,
          background: '#343a40',
          color: '#fff',
        }}
        onClose={() => setShow(false)}
        show={show}
        delay={2000}
        autohide
      >
        <Toast.Body>
          <h3>
            Your Answer : {selectedAns} {score}
          </h3>
        </Toast.Body>
      </Toast>
    </div>
  );
}
