import React from "react";
import { useRecoilValue } from "recoil";
import { IToDo, toDoState } from "../recoilAtom";

const ToDoList = () => {
  const toDoArr = useRecoilValue<IToDo[]>(toDoState);

  return (
    <div>
      <ul>
        {toDoArr.map((toDo) => {
          return (
            <li key={toDo.id}>
              {toDo.text} {toDo.category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ToDoList;
