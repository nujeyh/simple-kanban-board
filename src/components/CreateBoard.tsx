import React, { useEffect, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { boardState, modalState } from "../recoilAtom";
import styled from "styled-components";

import { setLocalStorage } from "../localStorageFn";

const CreateBoard = () => {
  const outsideRef = useRef<HTMLDivElement>(null);
  const [isModalOn, setIsModalOn] = useRecoilState(modalState);
  const setBoard = useSetRecoilState(boardState);

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = event.currentTarget.createBoard.value;

    if (inputValue === "") return;

    setBoard((currBoardState) => {
      const newBoardState = {
        ...currBoardState,
        [inputValue]: [],
      };

      setLocalStorage(newBoardState);
      return newBoardState;
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
            Add a board
            <input
              type="text"
              placeholder="Write a board name"
              name="createBoard"
              autoComplete="off"
            />
            <button>Add</button>
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
  padding: 50px;
`;
export default CreateBoard;
