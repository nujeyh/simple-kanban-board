import { atom, selector } from "recoil";

export enum Categories {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  [key: string]: {
    id: number;
    text: string;
  }[];
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});

export const boardState = atom<IToDo>({
  key: "board",
  default: {
    "To Do": [
      { id: 1, text: "a" },
      { id: 2, text: "b" },
    ],
    Doing: [
      { id: 3, text: "c" },
      { id: 4, text: "d" },
    ],
    Done: [
      { id: 5, text: "e" },
      { id: 6, text: "f" },
    ],
  },
  // JSON.parse(localStorage.getItem("toDo") ?? "[]"),
});

// export const toDoSelector = selector({
//   key: "toDoSelector",
//   get: ({ get }) => {
//     const toDoArr = get(toDoState);
//     const category = get(categoryState);
//     return toDoArr.filter((toDo) => toDo.category === category);
//   },
// });
