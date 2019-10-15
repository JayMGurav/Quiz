import React from 'react';
import { Container } from 'react-bootstrap';

function dispQusetion() {
  return (
    <Container fluid>
      <div>
        <div>
          <h1>{count}</h1>
        </div>
        <div>
          {Question}
          <div>
            {option1}
            {option2}
            {option3}
            {option4}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default dispQusetion;
