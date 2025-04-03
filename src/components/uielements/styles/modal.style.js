import styled from "styled-components";
import { palette } from "styled-theme";
import { Modal } from "antd";

const ModalWrapper = styled(Modal)`
  top: ${(props) => (props.top ? `${props.top}` : "50")}px;

  .ant-modal-title {
    font-size: 18px !important;
    color: white !important;
  }

  .ant-modal-close {
    color: ${(props) => (props.noTitle ? "#999" : "#fff")} !important;
  }

  .ant-modal-header {
    background-color: ${palette("modal", 0)} !important;
  }

  .ant-modal-header {
    border-radius: 4px 4px 0 0;
  }

  .ant-modal-content {
    border-radius: 4px;
  }

  .center {
    text-align: center;
  }

  .ant-form-item {
    margin-bottom: 14px;
  }

  .ant-modal-body {
    padding: ${(props) => (props.padding ? `${props.padding}px` : "36px 18px")};
    max-height: calc(100vh - 160px);
    /* min-height: 500px; */
    overflow: auto;
  }
`;

export default ModalWrapper;
