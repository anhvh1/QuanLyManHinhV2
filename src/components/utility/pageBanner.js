import React from 'react';
import {ComponentBannerWrapper} from './pageBanner.style';
import PropTypes from 'prop-types';

const Wrapper = props => {
  return <ComponentBannerWrapper {...props}>
    {props.children}
  </ComponentBannerWrapper>;
};

Wrapper.propTypes = {
  background: PropTypes.string.isRequired
};

export default Wrapper;



