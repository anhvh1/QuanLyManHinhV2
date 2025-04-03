import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../settings';

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      <div>
        <Link to={`${siteConfig.mainRouter}`}>TRANG TỔNG QUAN</Link>
      </div>
    </div>
  );
};
