import { IToDo } from "../recoilAtom";

const ToDo = ({ text }: IToDo) => {
  return (
    <>
      <li>{text}</li>
    </>
  );
};

export default ToDo;
