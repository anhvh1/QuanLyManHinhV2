import styled from 'styled-components';

import WithDirection from '../../settings/withDirection';

const WDComponentDivFilter = styled.div`
  padding-bottom: ${(props) => (props.isIframe ? '' : '10px')};
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  gap: 10px;
  display: ${(props) => (props?.isCenter === true ? 'flex' : '')};
  justify-content: ${(props) => (props?.isCenter === true ? 'center' : '')};
  gap: ${(props) => (props?.isCenter === true ? '5px' : '')};
  .ant-select-search,
  .ant-select,
  .ant-calendar-picker {
    margin-right: 10px;

    &.ant-calendar-picker {
      margin-left: 5px;
    }

    &:last-child {
      margin-right: 0;
    }
  }
    
`;

const ComponentDivFilter = WithDirection(WDComponentDivFilter);
export {ComponentDivFilter};
