import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface ICard {
  id: number;
  text: string;
}

export interface IBoard {
  [key: string]: ICard[];
}

export const boardState = atom<IBoard>({
  key: "board",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const modalState = atom({
  key: "createBoardModal",
  default: false,
});
