// 카드를 삭제하는 보드

import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const DeleteArea = () => {
  return (
    <Wrapper>
      <Title>Drop here to Delete</Title>
      <Droppable droppableId="delete">
        {(provide, snapshot) => {
          return (
            <DroppableArea
              ref={provide.innerRef}
              {...provide.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            ></DroppableArea>
          );
        }}
      </Droppable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: ${(props) => props.theme.borderRadius};
  display: flex;
  flex-direction: column;
  height: fit-content;
`;
const Title = styled.h2`
  font-size: 23px;
  font-weight: 700;
  padding: 10px;
`;
const DroppableArea = styled.ul<{ isDraggingOver: boolean }>`
  padding-bottom: 15px;
  transition: background-color 0.2s ease-in-out;
  background-color: ${(props) => props.isDraggingOver && "#ffa5a5"};
  border-radius: ${(props) => props.theme.borderRadius};
  min-height: 80px;
`;

export default DeleteArea;
