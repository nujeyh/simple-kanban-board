import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo } from "../recoilAtom";
import ToDoCard from "./ToDoCard";
interface IBoardProps {
  boardArr: { id: number; text: string }[];
  boardId: string;
}

const Board = ({ boardArr, boardId }: IBoardProps) => {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provide, snapshot) => (
          <DroppableArea
            ref={provide.innerRef}
            {...provide.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {boardArr.map((toDo, index) => {
              return <ToDoCard key={toDo.id} index={index} toDo={toDo} />;
            })}
            {provide.placeholder}
          </DroppableArea>
        )}
      </Droppable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.board};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 10px 10px 15px 10px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  min-height: 50px;
`;
const Title = styled.h2`
  font-size: 23px;
  font-weight: 700;
  text-align: center;
`;
const DroppableArea = styled.ul<{ isDraggingOver: boolean }>`
  padding-bottom: 15px;
  border-radius: 5px;
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
  background-color: ${(props) => props.isDraggingOver && "#ebfdec"};
`;

export default Board;
