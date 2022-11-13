import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    boxShadow: {
      [key: string]: string;
    };
    borderRadius: string;

    colors: {
      backgroundColor: string;
      board: string;
      card: string;
    };
  }
}
