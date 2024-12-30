import React from 'react';
import BoxTitleWrapper from './boxTitle';
import {BoxWrapper} from './box.style';
import {getConfigLocal} from '../../helpers/utility';

export default (props) => {
  const heightTitle =
    document.querySelectorAll('.isoComponentTitle')[0]?.clientHeight;
  return (
    <BoxWrapper
      {...props}
      className={`${props.className ? props.className : ''} isoBoxWrapper`}
      style={{
        ...props.style,
        // , height: 'inherit'
      }}
      heightTitle={heightTitle}
    >
      <div className="box-content">
        <BoxTitleWrapper title={props.title} subtitle={props.subtitle} />
        {props.children}
      </div>
    </BoxWrapper>
  );
};
