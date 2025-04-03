import React from 'react';
import BoxTitleWrapper from './boxTitle';
import {BoxWrapper} from './box.style';
import {Row, Col} from 'antd';

export default props => (
  <BoxWrapper
    className={`${props.className} isoBoxWrapper`}
    style={props.style}
  >
    <BoxTitleWrapper title={props.title} subtitle={props.subtitle}/>
    <Row justify={'center'}>
      <Col lg={20} md={20} sm={24}>
        {props.children}
      </Col>
    </Row>
  </BoxWrapper>
);
