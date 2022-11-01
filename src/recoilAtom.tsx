import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  category: "TODO" | "DOING" | "DONE";
}

export const categoryState = atom({
  key: "category",
  default: "TODO",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDoArr = get(toDoState);
    const category = get(categoryState);
    return toDoArr.filter((toDo) => toDo.category === category);
  },
});
