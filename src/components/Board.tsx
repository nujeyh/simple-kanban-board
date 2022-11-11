import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import ToDoCard from "./ToDoCard";

interface IBoardProps {
  boardArr: { id: number; text: string }[];
  boardId: string;
}

const Board = ({ boardArr, boardId }: IBoardProps) => {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <CreateToDo boardId={boardId} />
      <Droppable droppableId={boardId}>
        {(provide, snapshot) => (
          <DroppableArea
            ref={provide.innerRef}
            {...provide.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {boardArr.map((toDo, index) => {
              return (
                <ToDoCard
                  key={toDo.id}
                  index={index}
                  toDo={toDo}
                  boardId={boardId}
                />
              );
            })}
            {provide.placeholder}
          </DroppableArea>
        )}
      </Droppable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: ${(props) => props.theme.borderRadius};
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Title = styled.h2`
  font-size: 23px;
  font-weight: 700;
  padding: 10px;
`;
const DroppableArea = styled.ul<{ isDraggingOver: boolean }>`
  padding-bottom: 15px;
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
  background-color: ${(props) => props.isDraggingOver && "#e3f8e4"};
  border-radius: ${(props) => props.theme.borderRadius};
`;

export default Board;
