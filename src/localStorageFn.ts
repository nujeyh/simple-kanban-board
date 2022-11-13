import { IBoard } from "./recoilAtom";

export const setLocalStorage = (newBoardState: IBoard) => {
  localStorage.setItem("board", JSON.stringify(newBoardState));
};
