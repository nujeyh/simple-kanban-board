import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo } from "../recoilAtom";
import ToDoCard from "./ToDoCard";

interface IBoardProps {
  toDoArr: IToDo[];
  boardId: string;
}

const Board = ({ toDoArr, boardId }: IBoardProps) => {
  return (
    <Droppable droppableId="one">
      {(provide) => (
        <Wrapper ref={provide.innerRef} {...provide.droppableProps}>
          {toDoArr.map((toDo, index) => {
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
  padding: 20px;
`;

export default Board;
