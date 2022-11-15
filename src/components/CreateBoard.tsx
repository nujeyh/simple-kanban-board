// 보드를 생성하는 모달

import { FormEvent, useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { MdAddBox as PlusIcon } from "react-icons/md";

import { boardState, modalState } from "../recoilAtom";

import { Input } from "../styles/Input";

const CreateBoard = () => {
  const outsideRef = useRef<HTMLDivElement>(null);
  const [isModalOn, setIsModalOn] = useRecoilState(modalState);
  const setBoard = useSetRecoilState(boardState);

  // 보드 생성
  const handelSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = event.currentTarget.createBoard.value;

    if (inputValue === "") return;

    setBoard((currBoardState) => {
      return {
        ...currBoardState,
        [inputValue]: [],
      };
    });
    setIsModalOn(false);
    event.currentTarget.createBoard.value = "";
  };

  // 스크롤 방지
  useEffect(() => {
    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  // 창 외부 클릭하면 닫기
  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (
        isModalOn &&
        outsideRef.current &&
        !outsideRef.current.contains(event.target as Node)
      ) {
        setIsModalOn(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isModalOn, setIsModalOn]);

  return (
    <>
      <Dim>
        <Wrapper ref={outsideRef}>
          <form onSubmit={handelSubmit}>
            <Title>New Board</Title>
            <InputWrapper>
              <Input
                type="text"
                placeholder="Write a board name"
                name="createBoard"
                autoComplete="off"
              />
              <button>
                <Icon size={35} />
              </button>
            </InputWrapper>
          </form>
        </Wrapper>
      </Dim>
    </>
  );
};
const Dim = styled.div`
  box-sizing: border-box;
  display: "block";
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: ${(props) => props.theme.colors.backgroundColor};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: 40px;
`;
const Title = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.l};
  margin-bottom: 20px;
`;
const Icon = styled(PlusIcon)`
  color: ${(props) => props.theme.colors.darkGray};
  cursor: pointer;
  margin-left: 7px;
  &:hover {
    color: royalblue;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export default CreateBoard;
