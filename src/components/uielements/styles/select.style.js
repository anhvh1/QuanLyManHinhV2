import styled from "styled-components";
import { palette } from "styled-theme";
import { transition } from "../../../settings/style-util";

const AntSelect = (ComponentName) => styled(ComponentName)`
  &.ant-select {
    .ant-select-selector {
      position: relative;
      background-color: #3a59e533;
      border: 1px solid #3a59e533;
      border-radius: 2px;
      height: 40px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      color: #c5c2c2;
    }
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    color: #c5c2c2;
    font-size: 13px;

    .ant-select-selection {
      background-color: red;
      border-radius: 4px;
      border: 1px solid ${palette("border", 0)};
      ${transition()};

      &.ant-select-selection--single {
        height: 35px;
        position: relative;
        cursor: pointer;
      }

      .ant-select-selection__rendered {
        margin-left: 10px;
        margin-right: 10px;
        line-height: 33px;

        .ant-select-selection-selected-value {
          float: ${(props) => (props["data-rtl"] === "rtl" ? "right" : "left")};
          padding: ${(props) =>
            props["data-rtl"] === "rtl" ? "0 0 0 14px" : "0 14px 0 0"};
        }
      }

      .ant-select-arrow {
        right: ${(props) => (props["data-rtl"] === "rtl" ? "inherit" : "5px")};
        left: ${(props) => (props["data-rtl"] === "rtl" ? "5px" : "inherit")};
      }

      &:hover {
        border-color: ${palette("primary", 0)};
      }
    }

    &.ant-select-focused {
      .ant-select-selection {
        &:focus,
        &:active {
          border-color: ${palette("primary", 0)};
          outline: 0;
          box-shadow: 0 0 0 2px ${palette("primary", 3)};
        }
      }
    }

    &.ant-select-open {
      .ant-select-selection {
        border-color: ${palette("primary", 0)};
        outline: 0;
        box-shadow: 0 0 0 2px ${palette("primary", 3)};
      }
    }

    .ant-select-selection--multiple > ul > li,
    .ant-select-selection--multiple .ant-select-selection__rendered > ul > li {
      margin-top: 4px;
      height: 26px;
      line-height: 26px;
    }

    .ant-select-selection--multiple .ant-select-selection__choice {
      background-color: ${palette("grayscale", 4)};
      color: #c5c2c2;
    }

    .ant-select-tree li a {
      font-size: 13px;
      color: #c5c2c2;
    }
  }
  :where(.css-dev-only-do-not-override-cg4vza).ant-select-single {
    font-size: 14px;
    height: 40px;
  }
  .ant-select-selection-placeholder {
    padding-right: 18px;
    color: #c5c2c2;
  }
  :where(.css-dev-only-do-not-override-cg4vza).ant-select-outlined:not(
      .ant-select-disabled
    ):not(.ant-select-customize-input):not(.ant-pagination-size-changer):hover
    .ant-select-selector {
    border-color: transparent;
  }
  :where(.css-dev-only-do-not-override-cg4vza).ant-select .ant-select-arrow {
    display: flex;
    align-items: center;
    color: #c5c2c2;
    font-style: normal;
    line-height: 1;
    text-align: center;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    top: 50%;
    inset-inline-start: auto;
    inset-inline-end: 11px;
    height: 12px;
    margin-top: -6px;
    font-size: 12px;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
`;

const AntSelectOption = (ComponentName) => styled(ComponentName)`
  color: #c5c2c2;
  .ant-select-dropdown-menu-item {
    color: #c5c2c2;
  }
`;

export { AntSelect, AntSelectOption };
