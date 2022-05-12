import { MainContainer } from "./layout/MainContainer";
import { NavBar } from "./layout/NavBar";

function App() {
  // Set initial state from data folder
  return (
    <div className="App">
      <NavBar />
      <MainContainer />
    </div>
  );
}

export default App;
