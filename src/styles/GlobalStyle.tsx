import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: 'LeeSeoyun';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/LeeSeoyun.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    };
  body {
    background-color: ${(props) => props.theme.colors.backgroundColor};
    font-family: "LeeSeoyun";
  }
`;
