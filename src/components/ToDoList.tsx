import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, toDoSelector } from "../recoilAtom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const ToDoList = () => {
  const toDoArr = useRecoilValue(toDoSelector);
  const setCategory = useSetRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const onDragEnd = () => {};
  return (
    <div>
      <h1>Simple Kanban Board</h1>
      <hr />
      <select onInput={onInput}>
        <option value={Categories.TODO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <hr />
      <CreateToDo />
      <hr />
      {toDoArr.map((toDo) => {
        return <ToDo {...toDo} />;
      })}
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <BoardWrapper>
            <Droppable droppableId="one">
              {(provide) => (
                <Board ref={provide.innerRef} {...provide.droppableProps}>
                  {toDoArr.map((toDo, index) => {
                    return (
                      <Draggable draggableId={toDo.id.toString()} index={index}>
                        {(provide) => (
                          <Card
                            ref={provide.innerRef}
                            {...provide.draggableProps}
                            {...provide.dragHandleProps}
                          >
                            {toDo.text}
                          </Card>
                        )}
                      </Draggable>
                    );
                  })}
                  {provide.placeholder}
                </Board>
              )}
            </Droppable>
          </BoardWrapper>
        </Wrapper>
      </DragDropContext>
    </div>
  );
};
const Wrapper = styled.div`
  width: 500px;
`;
const BoardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const Board = styled.ul`
  background-color: ${(props) => props.theme.colors.board};
  padding: 20px;
`;
const Card = styled.li`
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.card};
  padding: 10px;
  margin: 5px;
`;

export default ToDoList;
