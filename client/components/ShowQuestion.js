import React, { useState, useEffect, useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import { getQzDoc, orderByScore } from '../../src/firebase.js';
import { ParentGameContext } from './GameContext.js';
// import { changeQStatus } from '../../src/firebase';

function ShowQuestions() {
  const context = useContext(ParentGameContext);
  const [questionIndex, setQuestionIndex] = useState(context.Qstatus);
  const [loading, setLoading] = useState(true);
  const [counterSeconds, setCounterSeconds] = useState();
  const [Timeperiod, setTimeperiod] = useState();
  const [Question, setQuestion] = useState();
  const [QuestionsLength, setQuestionsLength] = useState();

  useEffect(() => {
    (async () => {
      const data = await getQzDoc(context.uid, context.qid);
      setCounterSeconds(parseInt(data.timeperiod));
      setTimeperiod(parseInt(data.timeperiod));
      setQuestion(data.questions[questionIndex]);
      setQuestionsLength(data.questions.length);
      setLoading(false);
    })();
    if (loading == false) {
      startCountDown();
    }
  }, [loading]);

  const props = useSpring({
    from: {
      left: '0%',
      top: '0%',
      width: '100%',
      height: Math.floor(window.innerHeight),
      background: '#343a40',
    },
    to: async next => {
      await next({
        left: '0%',
        top: '0%',
        width: '100%',
        height: counterSeconds * (Math.floor(window.innerHeight) / Timeperiod),
        background: '#343a40',
      });
    },
  });

  const startCountDown = () => {
    let sec = counterSeconds;
    let interval = setInterval(function() {
      if (sec === 0) {
        clearInterval(interval);
        orderByScore(context.qid);
        if (questionIndex <= QuestionsLength) {
          context.changeQStatus(context.uid, context.qid, questionIndex + 1);
          context.changeGameStatus(context.uid, context.qid, 'LeaderBoard');
          // setQuestionIndex(questionIndex + 1);
        }
      }
      setCounterSeconds(sec);
      sec--;
    }, 1000);
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="fullWidth height_Onescreen">
      <animated.div className="script-box" style={props} />
      <div
        style={{
          padding: '1%',
          background: 'rgba(255,255,255,0.9)',
        }}
        className="DashDiv flexCenterAlign center_Align"
      >
        <div
          style={{
            marginTop: '-10% ',
            marginBottom: '4%',
            padding: '1% 2%',
            background: '#343a40',
            color: '#fff',
            borderRadius: '8px',
          }}
        >
          <h1>{counterSeconds}</h1>
        </div>
        <div style={{ padding: '0% 2%' }}>
          <h1 style={{ position: 'absolute', top: '2%', left: '2%' }}>
            {questionIndex + 1}
          </h1>
          <h1 style={{ fontSize: '3.0em' }}>{Question.question}</h1>
        </div>
      </div>
    </div>
  );
}

export default ShowQuestions;

// <div className="fullWidth height_Onescreen">
//       <animated.div className="script-box" style={props} />
//       <div
//         className="DashDiv center_Align"
//         style={{
//           textAlign: 'center',
//           padding: '0% 1%',
//           overflowY: 'auto',
//           background: 'rgba(255,255,255,0.9)',
//         }}
//       >
//         <div
//           className="flexCenterAlign"
//           style={{
//             width: '100%',
//             padding: '1%',
//             color: '#343a40',
//             position: 'relative',
//           }}
//         >
//           <h1 style={{ position: 'absolute', top: '2%', left: '2%' }}>
//             {questionIndex + 1}
//           </h1>
//           <h1>{Question.question}</h1>
//         </div>
//         <div className="counterOptAlign counterSty">
//           <h1
//             style={{
//               fontSize: '4em',
//               fontWeight: 'bolder',
//             }}
//           >
//             {counterSeconds}
//           </h1>
//         </div>
//       </div>
//     </div>
//   );

// <div
//   style={{
//     width: '100%',
//     height: '75%',
//     padding: '1% 2%',
//     position: 'relative',
//   }}
// >
//   <div
//     style={{
//       width: '100%',
//       height: '50%',
//     }}
//     className="optionsAwBox"
//   >
//     <div
//       className="options"
//       style={{ borderRadius: '8px 0 0 0', background: '#9be3de' }}
//     >
//       {Question.options[0]}
//     </div>
//     <div
//       className="options"
//       style={{ borderRadius: '0 8px 0 0', background: '#fa877f' }}
//     >
//       {Question.options[1]}
//     </div>
//   </div>
//   <div
//     style={{
//       width: '100%',
//       height: '50%',
//     }}
//     className="optionsAwBox"
//   >
//     <div
//       className="options"
//       style={{ borderRadius: '0 0 0 8px', background: '#e4e4e4' }}
//     >
//       {Question.options[2]}
//     </div>
//     <div
//       className="options"
//       style={{ borderRadius: '0 0 8px 0', background: '#d597ce' }}
//     >
//       {Question.options[3]}
//     </div>
//   </div>
// </div>;
