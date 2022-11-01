import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, toDoSelector } from "../recoilAtom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoList = () => {
  const toDoArr = useRecoilValue(toDoSelector);
  const setCategory = useSetRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <div>
      <h1>To do list</h1>
      <hr />
      <select onInput={onInput}>
        <option value={Categories.TODO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <hr />
      <CreateToDo />
      <hr />
      {toDoArr.map((toDo) => {
        return <ToDo {...toDo} />;
      })}
    </div>
  );
};

export default ToDoList;
