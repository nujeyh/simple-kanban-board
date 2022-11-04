import { IToDo } from "./recoilAtom";

export const setLocalStorage = (newToDo: IToDo[]) => {
  localStorage.setItem("toDo", JSON.stringify(newToDo));
};
