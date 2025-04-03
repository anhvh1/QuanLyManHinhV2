import React from 'react';
import { ComponentDivAction } from './pageAction.style';

export default props =>
  <ComponentDivAction className="isoComponentAction">
    {props.children}
  </ComponentDivAction>;
