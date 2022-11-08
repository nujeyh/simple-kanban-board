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
  default: JSON.parse(
    localStorage.getItem("board") ??
      JSON.stringify({
        "To Do": [],
        Doing: [],
        Done: [],
      })
  ),
});

// export const toDoSelector = selector({
//   key: "toDoSelector",
//   get: ({ get }) => {
//     const toDoArr = get(toDoState);
//     const category = get(categoryState);
//     return toDoArr.filter((toDo) => toDo.category === category);
//   },
// });
