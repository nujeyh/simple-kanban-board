import { atom } from "recoil";

export interface IBoard {
  [key: string]: {
    id: number;
    text: string;
  }[];
}

export const boardState = atom<IBoard>({
  key: "board",
  default: JSON.parse(localStorage.getItem("board") ?? "{}"),
});

export const modalState = atom({
  key: "createBoardModal",
  default: false,
});
