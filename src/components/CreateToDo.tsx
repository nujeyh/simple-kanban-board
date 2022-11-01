import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../recoilAtom";

const CreateToDo = () => {
  const setToDo = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const onSubmitToDo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setToDo((prev) => {
      const newToDo = [
        {
          id: Date.now(),
          text: event.currentTarget.toDoInput.value,
          category,
        },
        ...prev,
      ];
      localStorage.setItem("toDo", JSON.stringify(newToDo));
      return newToDo;
    });
    event.currentTarget.toDoInput.value = "";
  };

  return (
    <form onSubmit={onSubmitToDo}>
      <input
        type="text"
        placeholder="Write a task"
        name="toDoInput"
        autoComplete="off"
      />
      <button>Add</button>
    </form>
  );
};

export default CreateToDo;
