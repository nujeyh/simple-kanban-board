import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { boardState } from "../recoilAtom";
import { setLocalStorage } from "../localStorageFn";

import Board from "./Board";
import DeleteArea from "./DeleteArea";
import CreateBoard from "./CreateBoard";

const ToDoList = () => {
  const [boardArr, setBoard] = useRecoilState(boardState);

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
      <Title>Simple Kanban Board</Title>
      <Wrapper>
        <CreateBoard />
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
`;
const Title = styled.h1`
  font-size: 30px;
  background-color: ${(props) => props.theme.colors.card[0]};
  padding: 30px 20px 10px 20px;
`;
const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 0 10px;
`;

export default ToDoList;
