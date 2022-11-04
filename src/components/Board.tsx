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
      <div>{boardId}</div>
      <Droppable droppableId={boardId}>
        {(provide, snapshot) => (
          <DroppableArea
            ref={provide.innerRef}
            {...provide.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
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

interface IAreaProps {
  draggingFromThisWith: boolean;
  isDraggingOver: boolean;
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.board};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  min-height: 50px;
`;
const DroppableArea = styled.ul<IAreaProps>`
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
  background-color: ${(props) =>
    props.isDraggingOver ? "pink" : props.draggingFromThisWith && "green"};
`;

export default Board;
