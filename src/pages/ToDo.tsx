import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../recoilAtom";

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
      </li>
    </>
  );
};

export default ToDo;
