import { atom, selector } from "recoil";

export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  id: number;
  text: string;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(localStorage.getItem("toDo") ?? "[]"),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDoArr = get(toDoState);
    const category = get(categoryState);
    return toDoArr.filter((toDo) => toDo.category === category);
  },
});
