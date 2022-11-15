// 할일 항목을 생성하는 컴포넌트

import { FormEvent } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { MdAddBox as PlusIcon } from "react-icons/md";

import { boardState } from "../recoilAtom";

import { Input } from "../styles/Input";

interface ICreateProps {
  boardId: string;
}

const CreateTask = ({ boardId }: ICreateProps) => {
  const setBoard = useSetRecoilState(boardState);

  // 할일 생성
  const onSubmitToDo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.toDoInput.value === "") return;

    setBoard((currBoardState) => {
      const newBoard = [
        {
          id: Date.now(),
          text: event.currentTarget.toDoInput.value,
        },
        ...currBoardState[boardId],
      ];
      return {
        ...currBoardState,
        [boardId]: newBoard,
      };
    });
    event.currentTarget.toDoInput.value = "";
  };

  return (
    <form onSubmit={onSubmitToDo}>
      <Wrapper>
        <TaskInput
          type="text"
          placeholder="Write a task"
          name="toDoInput"
          autoComplete="off"
        />
        <button>
          <Icon size={35} />
        </button>
      </Wrapper>
    </form>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;
const TaskInput = styled(Input)`
  width: 100%;
`;
const Icon = styled(PlusIcon)`
  color: ${(props) => props.theme.colors.darkGray};
  cursor: pointer;
  margin-left: 7px;
  &:hover {
    color: royalblue;
  }
`;

export default CreateTask;
