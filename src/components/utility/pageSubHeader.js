import React from 'react';
import { ComponentTitleWrapper } from './pageSubHeader.style';

export default props =>
  <ComponentTitleWrapper className="isoComponentTitle">
    {props.children}
  </ComponentTitleWrapper>;
