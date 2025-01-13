import styled from "styled-components";
import { palette } from "styled-theme";
const LayoutContentWrapper = styled.div`
  // padding: ${(props) => (props?.isIframe ? "0" : "0 10px ")};
  display: ${(props) => (props?.display ? "flex" : "block ")}
  flex-flow: row wrap;
  /* background: ${palette("primary", 16)}; */

  /* overflow: hidden; */
  // commet to changed layout

  @media only screen and (max-width: 767px) {
    padding: 15px 20px;
  }

  @media (max-width: 580px) {
    padding: 15px;
  }
  
`;

export { LayoutContentWrapper };
