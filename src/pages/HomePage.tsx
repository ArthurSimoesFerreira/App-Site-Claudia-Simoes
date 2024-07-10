import { NavLink, Outlet } from "react-router-dom";
import Carousel from "../components/Carousel";

const HomePage = () => {
  return (
    <div className="col">
      <div className="row mb-3">
        <Carousel />
      </div>
      <div className="row-lg-2 mb-3 border px-2 rounded">
        <div className="nav nav-pills row">
          <NavLink aria-current="page" className="nav-link col-3 justify-content-center align-items-center d-flex fw-bold" to="/">
            Todos
          </NavLink>
          <NavLink aria-current="page" className="nav-link col-3 justify-content-center align-items-center d-flex fw-bold" to="/top">
            Tops
          </NavLink>
          <NavLink aria-current="page" className="nav-link col-3 justify-content-center align-items-center d-flex fw-bold" to="/legging">
            Leggings
          </NavLink>
          <NavLink aria-current="page" className="nav-link col-3 justify-content-center align-items-center d-flex fw-bold" to="/camisa">
            Camisas
          </NavLink>
        </div>
      </div>
      <div className="row-lg-10">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
