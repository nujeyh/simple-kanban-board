import React from "react";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../recoilAtom";

const CreateToDo = () => {
  const setToDo = useSetRecoilState(toDoState);

  const onSubmitToDo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setToDo((prev) => [
      {
        id: Date.now(),
        text: event.currentTarget.toDoInput.value,
        category: "TODO",
      },
      ...prev,
    ]);

    event.currentTarget.toDoInput.value = "";
  };

  return (
    <form onSubmit={onSubmitToDo}>
      <input type="text" placeholder="Write a task" name="toDoInput" />
      <button>Add</button>
    </form>
  );
};

export default CreateToDo;
