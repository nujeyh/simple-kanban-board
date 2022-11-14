import styled from "styled-components";

export const Input = styled.input`
  border: solid 1px ${(props) => props.theme.colors.lightGray};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 12px 15px;
  font-size: ${(props) => props.theme.fontSizes.m};

  min-width: 200px;
`;
