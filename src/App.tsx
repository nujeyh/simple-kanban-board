import ToDoList from "./components/ToDoList";
import { GlobalStyle } from "./styles/GlobalStyle";
import { Reset } from "./styles/Reset";

function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <ToDoList />
    </>
  );
}

export default App;
