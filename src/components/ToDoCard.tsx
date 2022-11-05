import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo } from "../recoilAtom";

interface IToDoCard {
  toDo: { id: number; text: string };
  index: number;
}

const ToDoCard = ({ toDo, index }: IToDoCard) => {
  return (
    <Draggable
      draggableId={toDo.id.toString()}
      index={index}
      key={toDo.id.toString()}
    >
      {(provide, snapshot) => (
        <Card
          ref={provide.innerRef}
          {...provide.draggableProps}
          {...provide.dragHandleProps}
          isDragging={snapshot.isDragging}
          cardColor={toDo.id % 4}
        >
          {toDo.text}
        </Card>
      )}
    </Draggable>
  );
};

interface ICardProps {
  isDragging: boolean;
  cardColor: number;
}

const Card = styled.li<ICardProps>`
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.card[props.cardColor]};
  opacity: ${(props) => props.isDragging && "0.5"};
  box-shadow: ${(props) =>
    props.isDragging
      ? "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
      : "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"};
  padding: 10px;
  margin-top: 15px;
  transition: background-color 0.3s ease-in-out;
`;

export default React.memo(ToDoCard);
