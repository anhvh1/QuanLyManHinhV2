import styled from "styled-components";

export const StyledButton = styled.div`
  background-color: ${(props) =>
    props.isSelected ? "#013CC6CC" : "#66718CCC"};
  border: 1px solid ${(props) => (props.isSelected ? "#013CC6CC" : "#66718CCC")};
  color: #fff;
  padding: 8px 16px;
  margin-right: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  transition: all 0.3s ease;
  width: 200px;
  border-radius: 5px;
  text-align: center;
  &:hover {
    background-color: #013cc6cc;
    border-color: #013cc6cc;
    color: #fff;
  }
`;
export const Layout = styled.div`
  padding: 50px 50px 50px 50px;
`;
export const MenuContent = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
