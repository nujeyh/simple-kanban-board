// 카드를 삭제하는 보드

import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";

interface IProps {
  isDragging: boolean;
}

const DeleteArea = ({ isDragging }: IProps) => {
  return (
    <Wrapper>
      <Droppable droppableId="delete">
        {(provide, snapshot) => {
          return isDragging ? (
            <DroppableArea
              ref={provide.innerRef}
              {...provide.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <MdDeleteForever size={70} />
            </DroppableArea>
          ) : (
            <div ref={provide.innerRef} {...provide.droppableProps} />
          );
        }}
      </Droppable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;
const DroppableArea = styled.div<{ isDraggingOver: boolean }>`
  padding: 20px;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) => props.isDraggingOver && "#ffa5a5"};
  border-radius: ${(props) => props.theme.borderRadius};
  color: crimson;
`;

export default DeleteArea;
