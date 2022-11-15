import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { MdOutlineAddBox as PlusIcon } from "react-icons/md";

import { boardState, modalState } from "../recoilAtom";
import { setLocalStorage } from "../localStorageFn";

import Board from "./Board";
import DeleteArea from "./DeleteArea";
import CreateBoard from "./CreateBoard";
import { Button } from "../styles/Button";
import { useState } from "react";

const Main = () => {
  const [boardArr, setBoard] = useRecoilState(boardState);
  const [isModalOn, setIsModalOn] = useRecoilState(modalState);
  const [isDragging, setIsDragging] = useState(false);

  // 드래그 종료 시 (드랍 시) 실행되는 함수
  const onDragEnd = ({ destination, source }: DropResult) => {
    setIsDragging(false);
    if (!destination) return;

    setBoard((currBoardState) => {
      const sourceBoard = [...currBoardState[source.droppableId]];
      const draggedItem = sourceBoard[source.index];
      let newBoardState = {};
      sourceBoard.splice(source.index, 1);

      // 목적지가 같은 보드인 경우
      if (destination.droppableId === source.droppableId) {
        sourceBoard.splice(destination.index, 0, draggedItem);
        newBoardState = {
          ...currBoardState,
          [source.droppableId]: sourceBoard,
        };
      }
      if (destination.droppableId !== source.droppableId) {
        // 삭제에 드랍한 경우
        if (destination.droppableId === "delete") {
          newBoardState = {
            ...currBoardState,
            [source.droppableId]: sourceBoard,
          };
        } else {
          // 목적지가 다른 보드인 경우
          const destinationBoard = [...currBoardState[destination.droppableId]];
          destinationBoard.splice(destination.index, 0, draggedItem);
          newBoardState = {
            ...currBoardState,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        }
      }

      setLocalStorage(newBoardState);
      return newBoardState;
    });
  };
  return (
    <>
      <TitleWrapper>
        <Title>Simple Kanban Board</Title>
      </TitleWrapper>
      <Wrapper>
        <NewButton onClick={() => setIsModalOn(true)}>
          <Icon size={23} /> New Board
        </NewButton>
        <hr />
        {isModalOn && <CreateBoard />}
        <DragDropContext
          onDragStart={() => setIsDragging(true)}
          onDragEnd={onDragEnd}
        >
          <BoardWrapper>
            {Object.keys(boardArr).map((boardId) => {
              return (
                <Board
                  boardArr={boardArr[boardId]}
                  boardId={boardId}
                  key={boardId}
                />
              );
            })}
            <DeleteArea isDragging={isDragging} />
          </BoardWrapper>
          {Object.keys(boardArr).length === 0 && (
            <HelpText>Please add a board!</HelpText>
          )}
        </DragDropContext>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  max-width: 1000px;
  margin: 30px auto;
  padding: 0 10px;
`;
const TitleWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.card};
  box-shadow: ${(props) => props.theme.boxShadow.light};
`;
const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.xl};
  padding: 60px 0 15px 10px;
  max-width: 1000px;
  margin: 0 auto;
`;
const NewButton = styled(Button)`
  &:hover {
    border: solid 2px royalblue;
  }
`;
const Icon = styled(PlusIcon)`
  color: ${(props) => props.theme.colors.darkGray};
  ${NewButton}:hover & {
    color: royalblue;
  }
`;
const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;
const HelpText = styled.div`
  margin-top: 50px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.l};
  color: ${(props) => props.theme.colors.darkGray};
`;

export default Main;
