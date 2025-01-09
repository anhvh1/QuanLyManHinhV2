import styled from 'styled-components';
import {palette} from 'styled-theme';

const BoxWrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.isFullHeight ? `100%` : 'calc(100% - 60px)')};
  // border: 1px solid #d5d5d5;
  // background: #fafafa;
  /* margin: 8px; */
  padding: 10px 0px 40px 0px;

  &:last-child {
    margin-bottom: 0;
  }

  & .box-content {
    height: auto;
    ${'' /*overflow: hidden;
    display: flex;
    flex-direction: column; */};
  }

  @media only screen and (max-width: 1280px) {
    height: calc(100% - 40px) !important;
  }

  @media only screen and (max-width: 767px) {
    padding: 20px;
    ${'' /* margin: 0 10px 30px; */};
  }

  &.half {
    width: calc(50% - 34px);
    @media (max-width: 767px) {
      width: 100%;
    }
  }
`;

export {BoxWrapper};
