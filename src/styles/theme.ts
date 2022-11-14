import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  boxShadow: {
    light: "rgba(0, 0, 0, 0.053) 0px 1px 1px, #0000001c 0px 1px 1px",
    normal: "rgba(0, 0, 0, 0.1) 0px 1px 2px, rgba(0, 0, 0, 0.14) 0px 1px 2px",
    extend:
      "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
  },
  borderRadius: "7px",

  colors: {
    backgroundColor: "#f0f2f8",
    board: "white",
    card: "white",

    lightGray: "#e7e7e7",
    darkGray: "#bbb",
  },

  fontSizes: {
    xl: "35px",
    l: "23px",
    m: "15px",
  },
};
