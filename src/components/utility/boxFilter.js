import React from 'react';
import { ComponentDivFilter } from './boxFilter.style';

export default props =>
  <ComponentDivFilter style={{...props.style}}>
    {props.children}
  </ComponentDivFilter>;