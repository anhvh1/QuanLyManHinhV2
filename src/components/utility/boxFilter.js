import React from 'react';
import {ComponentDivFilter} from './boxFilter.style';
import {getConfigLocal} from '../../helpers/utility';

export default (props) => {
  const {isDashBoard, isCenter} = props;
  return (
    <ComponentDivFilter
      isCenter={isCenter}
      {...props}
    >
      {props.children}
    </ComponentDivFilter>
  );
};
