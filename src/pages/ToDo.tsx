import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../recoilAtom";

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDo = useSetRecoilState(toDoState);
  const onClickCategory = (newCategory: IToDo["category"]) => {
    setToDo((prevToDoArr) => {
      const targetIndex = prevToDoArr.findIndex((toDo) => toDo.id === id);
      const currToDo = { text, id, category: newCategory };
      return [
        ...prevToDoArr.slice(0, targetIndex),
        currToDo,
        ...prevToDoArr.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <>
      <li>
        <span>{text}</span>
        {category !== "TODO" && (
          <button onClick={() => onClickCategory("TODO")}>To Do</button>
        )}
        {category !== "DOING" && (
          <button onClick={() => onClickCategory("DOING")}>Doing</button>
        )}
        {category !== "DONE" && (
          <button onClick={() => onClickCategory("DONE")}>Done</button>
        )}
      </li>
    </>
  );
};

export default ToDo;
