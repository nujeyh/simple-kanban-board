import Main from "./components/Main";
import { GlobalStyle } from "./styles/GlobalStyle";
import { Reset } from "./styles/Reset";

function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <Main />
    </>
  );
}

export default App;
