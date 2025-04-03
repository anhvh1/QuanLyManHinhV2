import styled from "styled-components";

const LayoutContentWrapper = styled.div`
  /* padding: 15px 20px 70px 20px; */
  /* padding: 15px 20px 5px 20px; */
  display: flex;
  flex-flow: row wrap;
  overflow-y: hidden;
  height: 100%;
  flex-direction: column;
  /* height: 100%; */
  ${(props) => (props.scrollWidth ? `min-width: ${props.scrollWidth}px;` : "")}
  ${(props) => (props.fullHeight ? `height: 100%;` : "")}
  ${(props) => (props.background ? `background: ${props.background};` : "")}
  
  @media only screen and (max-width: 767px) {
    padding: 15px 20px;
  }

  @media only screen and (max-width: 500px) {
    padding: 0;
    .isoComponentTitle {
      display: none;
    }
    .isoComponentAction
    /* , .isoComponentTitle  */ {
      margin-top: 10px;
      /* display: none; */
      zoom: 0.8;
    }
  }

  &.layout-desktop {
    @media only screen and (max-width: 500px) {
      display: none;
    }
  }

  &.layout-zoomable {
    @media only screen and (max-width: 500px) {
      zoom: 0.5;
    }
  }

  .action-btn {
    display: flex;
    gap: 10px;
    justify-content: center;
    .anticon {
      font-size: 25px;

      &:last-child {
        margin-right: 0;
      }
    }

    a {
      color: inherit !important;
      margin-right: 10px;
    }
  }
`;

export { LayoutContentWrapper };
