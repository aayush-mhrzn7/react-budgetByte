import Search from "./pages/Search";
import Food from "./pages/Food";
import { Outlet } from "react-router-dom";
function App() {
  /*   console.log("state", state.reciepe.data); */

  return (
    <>
      <Search></Search>
      <Outlet />
      <Food></Food>
    </>
  );
}

export default App;
