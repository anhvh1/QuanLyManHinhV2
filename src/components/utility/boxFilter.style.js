import styled from 'styled-components';
import WithDirection from '../../settings/withDirection';

const WDComponentDivFilter = styled.div`
  padding-bottom: ${(props) => (props.isIframe ? '' : '10px')};
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 10px;
  
  display: ${(props) => (props?.isCenter ? 'flex' : '')};
  justify-content: ${(props) => (props?.isCenter ? 'center' : '')};
  gap: ${(props) => (props?.isCenter ? '5px' : '')};

  ${(props) =>
    props.hienthi &&
    `
    .ant-select:not(.ant-select-customize-input) .ant-select-selector {
      position: relative;
      background-color: rgba(58, 89, 229, 0.2);
      border: 1px solid rgba(58, 89, 229, 0.2);
      border-radius: 2px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
      width: 100%;
      height: 40px;
      padding: 0 11px;
    }
    
    .ant-select .ant-select-arrow {
      color: rgb(197, 194, 194);
      height: 19px;
    }
    
    .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
      padding-right: 18px;
      color: rgb(197, 194, 194);
    }

    .ant-select .ant-select-clear {
      color: rgb(197, 194, 194);
      cursor: pointer;
      background: transparent;
      margin-top: 0px;
    }

    .ant-select .ant-select-clear:hover {
      color: rgb(197, 194, 194);
      cursor: pointer;
      background: transparent;
    }
  `}
`;

const ComponentDivFilter = WithDirection(WDComponentDivFilter);
export { ComponentDivFilter };
