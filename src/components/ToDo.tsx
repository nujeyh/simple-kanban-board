import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../recoilAtom";

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDo = useSetRecoilState(toDoState);

  const onClickCategory = (newCategory: IToDo["category"]) => {
    setToDo((prevToDoArr) => {
      const targetIndex = prevToDoArr.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      const newToDoList = [
        ...prevToDoArr.slice(0, targetIndex),
        newToDo,
        ...prevToDoArr.slice(targetIndex + 1),
      ];
      localStorage.setItem("toDo", JSON.stringify(newToDoList));
      return newToDoList;
    });
  };

  const onClickDelete = () => {
    setToDo((prevToDoArr) => {
      const targetIndex = prevToDoArr.findIndex((toDo) => toDo.id === id);
      const newToDoList = [
        ...prevToDoArr.slice(0, targetIndex),
        ...prevToDoArr.slice(targetIndex + 1),
      ];
      localStorage.setItem("toDo", JSON.stringify(newToDoList));
      return newToDoList;
    });
  };

  return (
    <>
      <li>
        <span>{text}</span>
        {category !== Categories.TODO && (
          <button onClick={() => onClickCategory(Categories.TODO)}>
            To Do
          </button>
        )}
        {category !== Categories.DOING && (
          <button onClick={() => onClickCategory(Categories.DOING)}>
            Doing
          </button>
        )}
        {category !== Categories.DONE && (
          <button onClick={() => onClickCategory(Categories.DONE)}>Done</button>
        )}
        <button onClick={onClickDelete}>X</button>
      </li>
    </>
  );
};

export default ToDo;
