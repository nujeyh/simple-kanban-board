import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";

import { boardState, Categories, categoryState } from "../recoilAtom";
import { setLocalStorage } from "../localStorageFn";

import CreateToDo from "./CreateToDo";
import Board from "./Board";

const ToDoList = () => {
  const [boardArr, setBoard] = useRecoilState(boardState);
  const setCategory = useSetRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    setBoard((currBoardState) => {
      const sourceBoard = [...currBoardState[source.droppableId]];
      const draggedItem = sourceBoard[source.index];
      sourceBoard.splice(source.index, 1);

      if (destination.droppableId === source.droppableId) {
        sourceBoard.splice(destination.index, 0, draggedItem);
        return {
          ...currBoardState,
          [source.droppableId]: sourceBoard,
        };
      } else {
        const destinationBoard = [...currBoardState[destination.droppableId]];
        destinationBoard.splice(destination.index, 0, draggedItem);
        return {
          ...currBoardState,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      }
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
  max-width: 1000px;
  margin: 0 auto;
`;
const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
`;

export default ToDoList;
