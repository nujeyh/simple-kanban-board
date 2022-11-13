import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { boardState, modalState } from "../recoilAtom";
import { setLocalStorage } from "../localStorageFn";

import Board from "./Board";
import DeleteArea from "./DeleteArea";
import CreateBoard from "./CreateBoard";

const Main = () => {
  const [boardArr, setBoard] = useRecoilState(boardState);
  const [isModalOn, setIsModalOn] = useRecoilState(modalState);

  // 드래그 종료 시 (드랍 시) 실행되는 함수
  const onDragEnd = ({ destination, source }: DropResult) => {
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
        <NewButton onClick={() => setIsModalOn(true)}>📋 New Board</NewButton>
        {isModalOn && <CreateBoard />}
        <DragDropContext onDragEnd={onDragEnd}>
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
            <DeleteArea />
          </BoardWrapper>
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
  box-shadow: ${(props) => props.theme.boxShadow.normal};
`;
const Title = styled.h1`
  font-size: 35px;
  padding: 60px 0 15px 10px;
  max-width: 1000px;
  margin: auto;
`;
const NewButton = styled.button`
  background-color: ${(props) => props.theme.colors.card};
  border-radius: 7px;
  border: none;
  box-shadow: ${(props) => props.theme.boxShadow.normal};
  padding: 5px 10px;
`;
const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

export default Main;
