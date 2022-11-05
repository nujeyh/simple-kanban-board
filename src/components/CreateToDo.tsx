import React from "react";
import { useSetRecoilState } from "recoil";
import { boardState } from "../recoilAtom";

interface ICreateProps {
  boardId: string;
}

const CreateToDo = ({ boardId }: ICreateProps) => {
  const setBoard = useSetRecoilState(boardState);
  const onSubmitToDo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.toDoInput.value === "") return;

    setBoard((currBoardState) => {
      const newBoard = [
        {
          id: Date.now(),
          text: event.currentTarget.toDoInput.value,
        },
        ...currBoardState[boardId],
      ];
      // localStorage.setItem("toDo", JSON.stringify(newToDo));
      return {
        ...currBoardState,
        [boardId]: newBoard,
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
