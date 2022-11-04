import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";

import { boardState, Categories, categoryState } from "../recoilAtom";
import { setLocalStorage } from "../localStorageFn";

import CreateToDo from "./CreateToDo";
import Board from "./Board";

const ToDoList = () => {
  const [boardArr, setToDo] = useRecoilState(boardState);
  const setCategory = useSetRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (destination?.droppableId === source.droppableId) {
      setToDo((currBoardState) => {
        const newBoardArr = [...currBoardState[source.droppableId]];
        const draggedItem = newBoardArr[source.index];

        newBoardArr.splice(source.index, 1);
        newBoardArr.splice(destination?.index, 0, draggedItem);

        return {
          ...currBoardState,
          [source.droppableId]: newBoardArr,
        };
      });
    }
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
            {Object.keys(boardArr).map((boardId) => {
              return (
                <Board
                  boardArr={boardArr[boardId]}
                  boardId={boardId}
                  key={boardId}
                />
              );
            })}
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
  gap: 10px;
`;

export default ToDoList;
