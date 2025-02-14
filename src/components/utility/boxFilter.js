import React from 'react';
import { ComponentDivFilter } from './boxFilter.style';

export default (props) => {
  const { isDashBoard, isCenter, hienthi } = props;

  return (
    <ComponentDivFilter isCenter={isCenter} hienthi={hienthi} {...props}>
      {props.children}
    </ComponentDivFilter>
  );
};
