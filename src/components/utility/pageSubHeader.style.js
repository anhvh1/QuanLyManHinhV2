import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from '../../settings/withDirection';

const WDComponentTitleWrapper = styled.div`
  color: ${palette('secondary', 2)};
  margin-bottom: 15px;
  margin-left: 30px;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  
  .ant-select-search, .ant-select, .ant-picker, label {
    margin: 0 5px;
    
    &:first-child {
      margin-left: 0;
    }
    
    &:last-child {
      margin-right: 0;
    }
  }
`;

const ComponentTitleWrapper = WithDirection(WDComponentTitleWrapper);
export { ComponentTitleWrapper };
