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
    <Droppable droppableId={boardId}>
      {(provide) => (
        <Wrapper ref={provide.innerRef} {...provide.droppableProps}>
          <div>{boardId}</div>
          {boardArr.map((toDo, index) => {
            return <ToDoCard key={toDo.id} index={index} toDo={toDo} />;
          })}
          {provide.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
};
const Wrapper = styled.ul`
  background-color: ${(props) => props.theme.colors.board};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 20px;
`;

export default Board;
