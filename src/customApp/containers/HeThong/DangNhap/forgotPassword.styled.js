import styled from 'styled-components';
import {palette} from 'styled-theme';

const ForgotWrap = styled.div`
  display: flex;
  justify-content: center;
  background: url(${(props) => props.background}) no-repeat center;
  .forgot-password {
    margin: 100px 0;
    border-radius: 20px;
    background: ${palette('primary', 17)};
    max-width: max(500px, 48vw);
    width: 100%;
    padding: 61px 237px;
    .main-forgot {
      .main-forgot__title .title {
        font-size: var(--title);
        text-transform: uppercase;
        font-weight: 400;
        text-align: center;
      }
    }
    .main-forgot__form {
      margin-top: 61px;
      .field-item {
        .wrapper-capcha {
          .contentCapcha {
            font-size: var(--content);
            font-weight: 700;
          }
          .anticon-redo {
            font-size: var(--content);
          }
        }
        .ant-input-group-addon {
          background: #e9e9e9;
        }
        .ant-input {
          height: 43px;
          background: #e9e9e9;
        }
        p {
          font-size: var(--content);
          color: ${palette('text', 8)};
          margin-bottom: 6px;
        }
        .wrapper-capcha {
          display: flex;
          gap: 10px;
          align-items: center;
          .anticon-rollback {
            cursor: pointer;
          }
        }
      }
      .field-item + .field-item {
        margin-top: 14px;
      }
    }
  }
  .wrapper-field {
    display: flex;
    align-items: center;
    .capcha-img {
      height: 100% !important;
    }
  }
  .button-group {
    display: flex;
    gap: 10px;
    justify-content: right;
    margin-top: 24px;
  }
`;

export {ForgotWrap};
