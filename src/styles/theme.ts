import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  boxShadow: {
    normal: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.20) 0px 1px 2px",
    extend:
      "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
  },
  borderRadius: "7px",

  colors: {
    backgroundColor: "#f0f2f8",
    board: "white",
    card: "white",
  },
};
