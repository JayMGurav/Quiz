import React from 'react';
import { Col } from 'react-bootstrap';
// const headerImg = require('../img/h.gif');

function HeaderImg({ headerImg }) {
  return window.innerWidth < 992 ? null : (
    <Col lg={7} className="height_Onescreen" style={{ padding: '0' }}>
      {window.innerWidth < 992 ? null : (
        <img src={headerImg} className="header_img" />
      )}
    </Col>
  );
}

export default HeaderImg;

// <Col lg={window.innerWidth < 992 ? 0 : 7} className="height_Onescreen">
//   {window.innerWidth < 992 ? null : (
//     <img src={headerImg} className="header_img" />
//   )}
// </Col>;
