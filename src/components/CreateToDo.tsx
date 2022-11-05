import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { boardState, categoryState } from "../recoilAtom";

const CreateToDo = () => {
  const setBoard = useSetRecoilState(boardState);

  const onSubmitToDo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setBoard((currBoardState) => {
      const newBoard = [
        {
          id: Date.now(),
          text: event.currentTarget.toDoInput.value,
        },
        ...currBoardState["To Do"],
      ];
      // localStorage.setItem("toDo", JSON.stringify(newToDo));
      return {
        ...currBoardState,
        "To Do": newBoard,
      };
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
