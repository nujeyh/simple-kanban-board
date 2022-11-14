import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 7px;
  border: solid 2px ${(props) => props.theme.colors.lightGray};
  padding: 5px 10px;
  font-size: ${(props) => props.theme.fontSizes.m};

  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;
