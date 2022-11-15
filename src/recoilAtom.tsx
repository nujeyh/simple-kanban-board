import { atom } from "recoil";

export interface ICard {
  id: number;
  text: string;
}

export interface IBoard {
  [key: string]: ICard[];
}

export const boardState = atom<IBoard>({
  key: "board",
  default: JSON.parse(localStorage.getItem("board") ?? "{}"),
});

export const modalState = atom({
  key: "createBoardModal",
  default: false,
});
