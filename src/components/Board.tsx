import { Droppable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";

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
      <TitleWrapper>
        <Title>{boardId}</Title>
        <DeleteButton onClick={onClickDelete}>
          <Icon size={25} />
        </DeleteButton>
      </TitleWrapper>
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
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
`;
const Title = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.l};
`;
const DeleteButton = styled.div`
  cursor: pointer;
`;
const Icon = styled(DeleteIcon)`
  color: ${(props) => props.theme.colors.darkGray};
  &:hover {
    color: crimson;
  }
`;
const DroppableArea = styled.ul<{ isDraggingOver: boolean }>`
  padding-bottom: 15px;
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
  background-color: ${(props) => props.isDraggingOver && "#e3f8e4"};
  border-radius: ${(props) => props.theme.borderRadius};
`;

export default Board;
