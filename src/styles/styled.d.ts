import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      backgroundColor: string;
      board: string;
      card: string;
    };
  }
}
