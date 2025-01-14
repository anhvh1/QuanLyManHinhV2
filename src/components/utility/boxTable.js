import Table from "../../components/uielements/table";
import styled from "styled-components";
import { palette } from "styled-theme";
import { transition, boxShadow, borderRadius } from "../../settings/style-util";
import WithDirection from "../../settings/withDirection";

const DataTable = styled(Table)`
  overflow: hidden;
  overflow-x: auto;
  // background: ${palette("primary", 22)};
  :where(.css-dev-only-do-not-override-cg4vza).ant-table-wrapper .ant-table {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #C5C2C2;
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    background: transparent;
    border-radius: 8px 8px 0 0;
  }
    :where(.css-dev-only-do-not-override-cg4vza).ant-table-wrapper .ant-table-thead >tr>th, :where(.css-dev-only-do-not-override-cg4vza).ant-table-wrapper .ant-table-thead >tr>td {
    position: relative;
    color: #C5C2C2;
    font-weight: 600;
    text-align: start;
    background: transparent;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.2s ease;
}
  :where(.css-dev-only-do-not-override-cg4vza).ant-table-wrapper table {
    width: 100%;
    text-align: start;
    border-radius: 8px 8px 0 0;
    border-collapse: collapse;
    border-spacing: none;
  }
  .ant-table-tbody .ant-table-row > .ant-table-cell-row-hover {
    background: ${palette("primary", 22)};
  }

  .ant-table-tbody > tr > td {
    border-top: 1px solid ${palette("color", 21)};
    border-bottom: none;
    border-left: none !important;
    border-right: none !important;
  }

  .ant-table-tbody > tr:last-child > td {
    border-bottom: 1px solid ${palette("color", 21)};
  }

  .ant-table-thead > tr > th {
    border: none !important;
  }

  .ant-table-container {
    // background: ${palette("primary", 22)};
    border-inline-start: none !important;
    border-top: none !important;
  }
  .ant-table-pagination.ant-pagination {
    margin: 15px 0 !important;
  }

  .ant-table-body {
    /* min-height: 520px; */
    overflow-x: auto;
    background-color: transparent;
    .ant-table-selection-column .ant-checkbox-wrapper {
      line-height: initial;
    }
  }

  .ant-table-thead > tr > th {
    color: ${palette("color", 20)};
    font-size: 14px;
    background-color: ${palette("primary", 22)};
    border-bottom: 0;
    text-align: center;

    &.ant-table-column-sort {
      background: ${palette("secondary", 1)};
      margin: 0 0 0 4px;
    }
  }

  .ant-table-thead > tr > th.ant-table-selection-column,
  .ant-table-tbody > tr > td.ant-table-selection-column {
    text-align: center;
  }

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    padding: 15px 8px;

    p {
      margin-bottom: 0;
    }
  }

  .ant-table-tbody > tr > td {
    font-size: 14px;
    color: ${palette("color", 20)};
    /* border-bottom: 1px solid ${palette("border", 0)}; */

    a {
      color: ${palette("primary", 0)};
      ${transition()};

      &:hover {
        color: ${palette("primary", 4)};
      }
    }
  }

  .ant-table-bordered .ant-table-thead > tr > th {
    /* border-bottom: 1px solid ${palette("border", 0)}; */
  }

  .ant-table-bordered .ant-table-thead > tr > th,
  .ant-table-bordered .ant-table-tbody > tr > td {
    /* border-right: 1px solid ${palette("border", 0)}; */
  }

  .ant-table-pagination {
    float: right;
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    /* border: 1px solid ${palette("border", 0)}; */
  }

  .ant-pagination-disabled,
  .ant-pagination-prev.ant-pagination-disabled,
  .ant-pagination-next.ant-pagination-disabled {
    /* border: 1px solid ${palette("border", 0)}; */

    a {
      border: 0;
    }
  }

  .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next {
    transform: rotate(0);
  }

  .ant-pagination-prev,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next {
    margin: 0 8px 0 0;
  }

  .ant-pagination-item {
    margin: 0 8px 0 0;

    &:hover {
      /* border-color: ${palette("primary", 14)};
      ${transition()}; */
    }

    &:hover a {
      color: ${palette("primary", 14)};
    }
  }

  .ant-pagination-item-active {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
    }
    a {
      color: #ffffff;
    }

    &:hover a {
      color: #ffffff;
    }
  }

  .ant-table-expanded-row {
    background: ${palette("grayscale", 6)};

    p {
      color: ${palette("text", 3)};
    }
  }

  .ant-spin-nested-loading > div > .ant-spin {
    max-height: none;

    .ant-spin-dot i {
      color: ${palette("primary", 0)};
    }
  }

  .ant-table-header {
    background-color: transparent;
  }

  .ant-table-title {
    background: ${palette("secondary", 1)};
    color: ${palette("secondary", 2)};
    font-size: 14px;
    font-weight: 500;
    padding: 16px 30px;
    ${borderRadius()};
  }

  .ant-table-footer {
    background: ${palette("secondary", 1)};
    color: ${palette("secondary", 2)};
    font-size: 12px;
    font-weight: 400;

    ${borderRadius()};
  }

  .ant-table-content {
    overflow-x: auto;
  }

  .ant-table-column-sorter-up.on .anticon-caret-up,
  .ant-table-column-sorter-down.on .anticon-caret-up,
  .ant-table-column-sorter-up.on .anticon-caret-down,
  .ant-table-column-sorter-down.on .anticon-caret-down {
    color: ${palette("primary", 0)};
  }
  .ant-table-column-sorter {
    vertical-align: text-bottom;
    top: -1.5px;
    display: inline-block;
  }

  &.isoSearchableTable {
    .isoTableSearchBox {
      padding: 20px;
      display: flex;

      /* border: 1px solid ${palette("border", 0)}; */
      ${boxShadow("0 1px 6px rgba(0,0,0,0.2)")};

      input {
        font-size: 14px;
        font-weight: 400;
        color: ${palette("text", 3)};
        line-height: inherit;
        height: 36px;
        width: 100%;
        padding: 0 15px;
        margin: 0;
        border: 1px solid ${palette("secondary", 7)};
        outline: 0 !important;
        overflow: hidden;

        ${borderRadius("3px 0 0 3px")};
        ${transition()};
        ${boxShadow("none")};

        &:focus,
        &:hover {
          border-color: ${palette("secondary", 7)};
          ${boxShadow("none")};
        }

        &::-webkit-input-placeholder {
          color: ${palette("grayscale", 0)};
        }

        &:-moz-placeholder {
          color: ${palette("grayscale", 0)};
        }

        &::-moz-placeholder {
          color: ${palette("grayscale", 0)};
        }
        &:-ms-input-placeholder {
          color: ${palette("grayscale", 0)};
        }
      }

      button {
        font-size: 12px;
        font-weight: 400;
        padding: 0;
        text-transform: uppercase;
        color: #ffffff;
        background-color: ${palette("primary", 0)};
        border: 0;
        outline: 0;
        height: 36px;
        padding: 0 15px;
        margin-left: -1px;
        cursor: pointer;
        border-radius: 0 3px 3px 0;
        ${transition()};

        &:hover {
          background-color: ${palette("primary", 1)};
        }
      }
    }

    .ant-table-thead > tr > th {
      word-break: keep-all;

      span {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        i {
          margin: 0 10px 0 0;
          order: -1;
        }
      }
    }
  }

  &.isoGroupTable {
    .ant-table-thead > tr {
      th {
        /* border: 1px solid ${palette("border", 0)};
        border-left: 0; */

        &[rowspan] {
          text-align: center;
        }

        &.isoImageCell {
          padding: 3px;
        }
      }

      &:first-child {
        th {
          &:first-child {
            /* border-left: 1px solid ${palette("border", 0)}; */
          }
        }
      }

      &:last-child {
        th {
          /* border-top: 0; */
        }
      }
    }

    .ant-table-tbody {
      .ant-table-row {
        td {
          /* border-right: 1px solid ${palette("border", 0)}; */

          &:first-child {
            /* border-left: 1px solid ${palette("border", 0)}; */
          }

          &:last-child {
            /* border-left: 0 solid ${palette("border", 0)}; */
          }

          &.isoImageCell {
            padding: 3px;
          }
        }
      }
    }
  }
  .ant-pagination {
    color: ${palette("secondary", 12)};
  }
  .anticon svg {
    color: ${palette("secondary", 12)};
  }
  .ant-pagination .ant-pagination-item a {
    display: block;
    padding: 0 6px;
    color: ${palette("secondary", 12)};
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    position: relative;
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(119, 100, 228, 1);
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    color: ${palette("secondary", 12)};
  }
  :where(.css-dev-only-do-not-override-p7e5j5).ant-table-wrapper .ant-table {
    // border-bottom: 1px solid rgb(66, 55, 126);
    // background: rgb(13, 5, 59);
  }
`;
const WDCustomizedTableWrapper = styled.div`
  .isoCustomizedTableControlBar {
    margin-bottom: 40px;

    .ant-form-item {
      margin: 0 16px 0 0;
    }

    .ant-form-item-label {
      label {
        color: ${palette("secondary", 2)};

        &:after {
          margin: 0 8px 0 2px;
        }
      }
    }

    .ant-switch-checked {
      /* border-color: ${palette("primary", 0)}; */
      background-color: ${palette("primary", 0)};
    }
  }
`;

const EmptyTable = styled(Table)`
  .ant-table-placeholder {
    border: none !important;
    background: transparent;
  }
`;

const CustomizedTableWrapper = WithDirection(WDCustomizedTableWrapper);
export { CustomizedTableWrapper, EmptyTable };
export default WithDirection(DataTable);
