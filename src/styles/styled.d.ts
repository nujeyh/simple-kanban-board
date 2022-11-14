import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    boxShadow: {
      light: string;
      normal: string;
      extend: string;
    };
    borderRadius: string;

    colors: {
      backgroundColor: string;
      board: string;
      card: string;

      lightGray: string;
      darkGray: string;
    };
    fontSizes: {
      xl: string;
      l: string;
      m: string;
    };
  }
}
