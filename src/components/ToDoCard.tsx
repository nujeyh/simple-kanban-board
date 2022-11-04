import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo } from "../recoilAtom";

interface IToDoCard {
  toDo: IToDo;
  index: number;
}

const ToDoCard = ({ toDo, index }: IToDoCard) => {
  return (
    <Draggable
      draggableId={toDo.id.toString()}
      index={index}
      key={toDo.id.toString()}
    >
      {(provide) => (
        <Card
          ref={provide.innerRef}
          {...provide.draggableProps}
          {...provide.dragHandleProps}
        >
          {toDo.text}
        </Card>
      )}
    </Draggable>
  );
};

const Card = styled.li`
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.card};
  padding: 10px;
  margin-top: 5px;
`;

export default React.memo(ToDoCard);
