import {useNavigate} from "react-router-dom";
import {RoutePaths} from "App";
import "./styles/home.scss";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <button onClick={() => navigate(RoutePaths.GRIDLAYOUT)}>Task1</button>
      <button onClick={() => navigate(RoutePaths.SELECT)}>Task2</button>
    </div>
  );
};

export default Home;
