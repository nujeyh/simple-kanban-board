import React from "react";
import { useSetRecoilState } from "recoil";
import { setLocalStorage } from "../localStorageFn";
import { boardState } from "../recoilAtom";

const CreateBoard = () => {
  const setBoard = useSetRecoilState(boardState);
  const onSubmitToDo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = event.currentTarget.toDoInput.value;

    if (inputValue === "") return;

    setBoard((currBoardState) => {
      const newBoardState = {
        ...currBoardState,
        [inputValue]: [],
      };

      setLocalStorage(newBoardState);

      return newBoardState;
    });
    event.currentTarget.toDoInput.value = "";
  };

  return (
    <form onSubmit={onSubmitToDo}>
      Add a board
      <input
        type="text"
        placeholder="Write a board name"
        name="toDoInput"
        autoComplete="off"
      />
      <button>Add</button>
    </form>
  );
};

export default CreateBoard;
