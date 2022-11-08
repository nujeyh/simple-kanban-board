import { IToDo } from "./recoilAtom";

export const setLocalStorage = (newBoardState: IToDo) => {
  localStorage.setItem("board", JSON.stringify(newBoardState));
};
