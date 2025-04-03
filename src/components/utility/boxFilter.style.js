import styled from 'styled-components';

import WithDirection from '../../settings/withDirection';

const WDComponentDivFilter = styled.div`
  padding-bottom: 20px;
  .ant-select-search, .ant-select, .ant-picker, label, button {
    margin: 0 5px 5px 0;
    
    @media only screen and (max-width: 400px) {
      margin-right: 0;
    }
    
    &:first-child {
      margin-left: 0;
    }
  }
  
  .ant-btn {
    height: 32px;
  }
`;

const ComponentDivFilter = WithDirection(WDComponentDivFilter);
export { ComponentDivFilter };