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
    <Wrapper>
      <Title>Simple Kanban Board</Title>
      <hr />
      <DragDropContext onDragEnd={onDragEnd}>
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
      </DragDropContext>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  max-width: 1000px;
  margin: 30px auto;
  padding: 0 10px;
`;
const Title = styled.h1`
  font-size: 30px;
  text-align: center;
`;
const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  /* gap: 10px; */
`;

export default ToDoList;
