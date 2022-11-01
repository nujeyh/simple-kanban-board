import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  category: "TODO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDoArr = get(toDoState);
    return [
      toDoArr.filter((toDo) => toDo.category === "TODO"),
      toDoArr.filter((toDo) => toDo.category === "DOING"),
      toDoArr.filter((toDo) => toDo.category === "DONE"),
    ];
  },
});
