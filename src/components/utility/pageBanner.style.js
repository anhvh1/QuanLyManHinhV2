import styled from 'styled-components';
import {palette} from 'styled-theme';
import WithDirection from '../../settings/withDirection';

const WDComponentBannerWrapper = styled.div`
  font-size: 40px;
  font-weight: 500;
  color: #fff;
  width: 100%;
  align-items: center;
  white-space: nowrap;
  height: 150px;
  line-height: 150px;
  text-align: center;
  position: relative;
  z-index: 5;
  background-color: ${props => props.background ? {} : "#ccc"};
  background-image: ${props => props.background ? `url(${props.background})` : {}};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  position: relative;
  
  .ant-breadcrumb {
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-size: 18px;
  }
  
  .ant-breadcrumb-link, .ant-breadcrumb-separator {
    color: #fff;
  }
  
  .ant-breadcrumb a .ant-breadcrumb-link:hover {
    color: #007bff;
    text-decoration: underline;
  }
  
  .button-banner {
    position: absolute;
    bottom: 10px;
    right: 10px;
    border-radius: 6px !important;
  }
  
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.4);
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
  }
`;

const ComponentBannerWrapper = WithDirection(WDComponentBannerWrapper);
export {ComponentBannerWrapper};
