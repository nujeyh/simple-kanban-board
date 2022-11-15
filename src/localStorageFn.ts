// Local Storage에 저장하는 함수

import { IBoard } from "./recoilAtom";

export const setLocalStorage = (newBoardState: IBoard) => {
  localStorage.setItem("board", JSON.stringify(newBoardState));
};
