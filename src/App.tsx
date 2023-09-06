import {Route, Routes} from "react-router-dom";
import Home from "Pages/Home";
import GridLayout from "Pages/GridLayout";
import SelectField from "Pages/SelectField";
export enum RoutePaths {
  HOME = "/",
  GRIDLAYOUT = "grid-layout",
  SELECT = "select-field",
}

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={RoutePaths.GRIDLAYOUT} element={<GridLayout />} />
      <Route path={RoutePaths.SELECT} element={<SelectField />} />
    </Routes>
  );
}

export default App;
