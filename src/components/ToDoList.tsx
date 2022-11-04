import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Categories, categoryState, toDoState } from "../recoilAtom";
import CreateToDo from "./CreateToDo";
import { setLocalStorage } from "../localStorageFn";
import Board from "./Board";

const ToDoList = () => {
  const [toDoArr, setToDo] = useRecoilState(toDoState);
  const setCategory = useSetRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setToDo((prev) => {
      const currToDo = prev[source.index];
      const temp = [...prev];
      temp.splice(source.index, 1);
      temp.splice(destination?.index, 0, currToDo);
      setLocalStorage(temp);
      return temp;
    });
  };
  return (
    <div>
      <h1>Simple Kanban Board</h1>
      <hr />
      <select onInput={onInput}>
        <option value={Categories.TODO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <hr />
      <CreateToDo />
      <hr />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <BoardWrapper>
            <Board toDoArr={toDoArr} boardId={"TODO"} />
          </BoardWrapper>
        </Wrapper>
      </DragDropContext>
    </div>
  );
};
const Wrapper = styled.div`
  width: 500px;
`;
const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export default ToDoList;
