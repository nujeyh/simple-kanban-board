import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
  body {
    background-color: ${(props) => props.theme.colors.backgroundColor};
    font-family: "Pretendard-Regular";
    font-size: ${(props) => props.theme.fontSizes.m};
  }
  hr {
    border: solid 1px ${(props) => props.theme.colors.lightGray};
    margin-top: 20px;
    margin-bottom: 10px;
  }
  button {
    background-color: transparent;
    border: none;
    padding: 0;
  }
`;
