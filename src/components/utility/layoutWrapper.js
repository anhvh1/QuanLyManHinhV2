import React from 'react';
import {LayoutContentWrapper} from './layoutWrapper.style';

export default (props) => {
  const heightFooter =
    document.querySelectorAll('.ant-layout-footer')[0]?.clientHeight;
    console.log("props",props.display);
  return (
    <LayoutContentWrapper
      style={{height: heightFooter ? `100%` : 'auto'}}
      className={
        props.className != null
          ? `${props.className} isoLayoutContentWrapper`
          : 'isoLayoutContentWrapper'
      }
      {...props}
    >
      {props.children}
    </LayoutContentWrapper>
  );
};
