// src/components/styled/index.js
import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: #000;
  color: #fff;

  text-align: center;
`;

export const HeaderButton = styled.button`
  background: #007bff;
  color: white;

  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #0056b3;
  }
`;

export const FeaturesContainer = styled.section`
  background: #f9f9f9;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }

  ul {
    list-style-type: none;
    li {
      margin: 10px 0;
      font-size: 18px;
    }
  }
`;

export const TestimonialsContainer = styled.section`
  background: #fff;
  text-align: center;

  blockquote {
    font-style: italic;
    margin: 20px 0;
    border-left: 4px solid #007bff;
  }
`;

export const FooterContainer = styled.footer`
  background: #000;
  color: #fff;
  text-align: center;
`;

export const MoreContainer = styled.footer`
  background: #000;
  color: #fff;
  text-align: center;
`;

export const ProductContainer = styled.footer`
  background: #000;
  color: #fff;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  .wrapper {
    min-height: 100vh;
    max-width: 1440px;
  }
  @media only screen and (max-width: 1024px) {
    .footer-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr); /* Hai cột, mỗi cột chiếm 50% */
      grid-template-rows: auto auto auto; /* Ba hàng với chiều cao tự động */

      /* grid-template-areas:
        "connected connected"
        "address1 address2"; */
      .footer-item:first-child {
        /* grid-area: connected; */
        grid-column: 1 / -1; /* Bắt đầu từ cột đầu tiên đến cột cuối cùng */
        grid-row: 1; /* Ở hàng đầu tiên */
      }
      .footer-item:nth-child(2) {
        grid-column: 1; /* Ở cột đầu tiên */
        grid-row: 2; /* Ở hàng thứ hai */
        /* grid-area: address1; */
      }
      .footer-item:nth-child(3) {
        grid-column: 2; /* Ở cột thứ hai */
        grid-row: 2; /* Ở hàng thứ hai */
        /* grid-area: address2; */
      }
    }
  }
`;
