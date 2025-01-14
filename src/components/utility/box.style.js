import styled from "styled-components";
import { palette } from "styled-theme";

const BoxWrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.isFullHeight ? `100%` : "calc(100% - 60px)")};
  // border: 1px solid #d5d5d5;
  // background: #fafafa;
  /* margin: 8px; */
  padding: 0px 0px 40px 0px;

  &:last-child {
    margin-bottom: 0;
  }

  & .box-content {
    height: auto;
    ${
      "" /*overflow: hidden;
    display: flex;
    flex-direction: column; */
    };
  }

  @media only screen and (max-width: 1280px) {
    height: calc(100% - 40px) !important;
  }

  @media only screen and (max-width: 767px) {
    padding: 20px;
    ${"" /* margin: 0 10px 30px; */};
  }

  &.half {
    width: calc(50% - 34px);
    @media (max-width: 767px) {
      width: 100%;
    }
  }
  .ant-tree {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #FFFFFF;
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    background: transparent;
    border-radius: 6px;
    transition: background-color 0.3s;
  }
    .ant-tree .ant-tree-node-content-wrapper.ant-tree-node-selected {
     background-color: transparent; 
}
`;

export { BoxWrapper };
