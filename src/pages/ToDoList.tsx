import React from "react";
import { useRecoilValue } from "recoil";
import { IToDo, toDoState } from "../recoilAtom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoList = () => {
  const toDoArr = useRecoilValue<IToDo[]>(toDoState);

  return (
    <div>
      <CreateToDo />
      <ul>
        {toDoArr.map((toDo) => {
          return <ToDo {...toDo} />;
        })}
      </ul>
    </div>
  );
};

export default ToDoList;
