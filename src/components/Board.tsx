import { Droppable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { boardState } from "../recoilAtom";
import { setLocalStorage } from "../localStorageFn";

import CreateTask from "./CreateTask";
import TaskCard from "./TaskCard";

interface IBoardProps {
  boardArr: { id: number; text: string }[];
  boardId: string;
}

const Board = ({ boardArr, boardId }: IBoardProps) => {
  const setBoard = useSetRecoilState(boardState);
  const onClickDelete = () => {
    window.confirm(
      `Are you sure want to delete "${boardId}" from the board?`
    ) &&
      setBoard((currBoardState) => {
        const newBoard = { ...currBoardState };
        delete newBoard[boardId];
        setLocalStorage(newBoard);
        return newBoard;
      });
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <span onClick={onClickDelete}>❌</span>
      <CreateTask boardId={boardId} />
      <Droppable droppableId={boardId}>
        {(provide, snapshot) => (
          <DroppableArea
            ref={provide.innerRef}
            {...provide.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {boardArr.map((toDo, index) => {
              return (
                <TaskCard
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
