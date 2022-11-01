import { useRecoilValue } from "recoil";
import { toDoSelector } from "../recoilAtom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoList = () => {
  const [toDo, doing, done] = useRecoilValue(toDoSelector);

  return (
    <div>
      <CreateToDo />
      <h2>To do</h2>
      <ul>
        {toDo.map((toDo) => {
          return <ToDo key={toDo.id} {...toDo} />;
        })}
      </ul>
      <hr />
      <h2>Doing</h2>
      <ul>
        {doing.map((toDo) => {
          return <ToDo key={toDo.id} {...toDo} />;
        })}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((toDo) => {
          return <ToDo key={toDo.id} {...toDo} />;
        })}
      </ul>
    </div>
  );
};

export default ToDoList;
