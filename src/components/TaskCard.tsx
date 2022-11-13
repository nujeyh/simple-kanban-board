import React, { useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { setLocalStorage } from "../localStorageFn";
import { boardState } from "../recoilAtom";

interface IToDoCard {
  toDo: { id: number; text: string };
  index: number;
  boardId: string;
}

const TaskCard = ({ toDo, index, boardId }: IToDoCard) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editToggle, setEditToggle] = useState(false);
  const setBoard = useSetRecoilState(boardState);

  const onClickEdit = () => {
    setEditToggle(false);

    if (inputRef.current?.value === "" || !inputRef.current?.value) return;

    setBoard((currBoardState) => {
      const sourceBoard = [...currBoardState[boardId]];
      let selectedItem = sourceBoard[index];
      selectedItem = {
        ...selectedItem,
        text: inputRef.current?.value ?? toDo.text,
      };
      sourceBoard.splice(index, 1);
      sourceBoard.splice(index, 0, selectedItem);

      const newBoardState = {
        ...currBoardState,
        [boardId]: sourceBoard,
      };

      setLocalStorage(newBoardState);

      return newBoardState;
    });
  };

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
          {editToggle ? (
            <>
              <input ref={inputRef} />
              <button onClick={onClickEdit}>done</button>
            </>
          ) : (
            <>
              <div>{toDo.text}</div>
              <button onClick={() => setEditToggle((curr) => !curr)}>
                edit
              </button>
            </>
          )}
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
  background-color: ${(props) => props.theme.colors.card};
  opacity: ${(props) => props.isDragging && "0.6"};
  box-shadow: ${(props) =>
    props.isDragging
      ? props.theme.boxShadow.extend
      : props.theme.boxShadow.normal};
  padding: 15px 25px;
  margin: 15px 15px 0px 15px;
  transition: background-color 0.3s ease-in-out;
  min-height: 45px;
  line-height: 1.4;
`;

export default React.memo(TaskCard);
