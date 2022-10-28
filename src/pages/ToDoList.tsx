import React, { useState } from "react";

const ToDoList = () => {
  const [toDo, setToDo] = useState("");

  const onChangeToDo = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmitToDo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };

  return (
    <div>
      <form onSubmit={onSubmitToDo}>
        <input
          type="text"
          placeholder="오늘 할 일"
          onChange={onChangeToDo}
          value={toDo}
        />
        <button>추가</button>
      </form>
    </div>
  );
};

export default ToDoList;
